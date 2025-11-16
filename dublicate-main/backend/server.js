require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();

// ------------------ Middleware ------------------
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ------------------ Static Folders ------------------
app.use("/mockups", express.static(path.join(__dirname, "mockups")));
app.use("/outputs", express.static(path.join(__dirname, "outputs")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------ MongoDB Connection ------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ------------------ Import API Routes ------------------
const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// ------------------ Use Routes ------------------
app.use("/buyer", buyerRoutes);
app.use("/seller", sellerRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

// ------------------ Multer ------------------
const upload = multer({ dest: "uploads/" });

// ------------------ Python Interpreter ------------------
const PYTHON = "python";

// ====================================================
// 1️⃣ BACKGROUND REMOVAL API
// ====================================================
app.post("/remove-bg", upload.single("image"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `outputs/${req.file.filename}.png`;

  if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

  exec(`${PYTHON} remove_bg.py ${inputPath} ${outputPath}`, (error) => {
    if (error) {
      console.error("❌ Background Removal Error:", error);
      return res.status(500).json({ error: "Background removal failed" });
    }

    res.json({
      success: true,
      filePath: outputPath,
    });
  });
});

// ====================================================
// 2️⃣ FABRIC MOCKUP API
// ====================================================
app.post("/fabric-mockup", upload.single("image"), (req, res) => {
  const inputPath = req.file.path;
  const outputDir = `mockups/${req.file.filename}`;

  if (!fs.existsSync("mockups")) fs.mkdirSync("mockups");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  exec(
    `${PYTHON} mockup.py ${inputPath} ${outputDir}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Mockup Error:", error);
        return res.status(500).json({
          error: "Mockup generation failed",
          details: stderr,
        });
      }

      try {
        const result = JSON.parse(stdout);
        const baseUrl = "http://localhost:5001";

        Object.keys(result).forEach((key) => {
          if (key !== "caption") {
            result[key] = baseUrl + "/" + result[key].replace(/\\/g, "/");
          }
        });

        return res.json(result);
      } catch (err) {
        console.error("JSON Parse Error:", err);
        res.status(500).json({ error: "Output parsing failed" });
      }
    }
  );
});

// ====================================================
// 3️⃣ CAPTION + PRICE + HASHTAGS MODEL
// ====================================================
app.post("/caption_price", async (req, res) => {
  const { imagePath, material } = req.body;

  if (!imagePath || !material) {
    return res.status(400).json({ error: "Image path & material required" });
  }

  // Convert URL → local path
  const localImagePath = imagePath.replace("http://localhost:5001/", "");
  const fullPath = path.join(__dirname, localImagePath);

  const command = `${PYTHON} caption_model/caption_price.py "${fullPath}" "${material}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Python Model Error:", stderr);
      return res.status(500).json({ error: "Python model failed" });
    }

    try {
      const result = JSON.parse(stdout);
      return res.json(result);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
      return res.status(500).json({ error: "Invalid Python output" });
    }
  });
});

// ====================================================
// 🚀 START SERVER
// ====================================================
app.listen(5001, () => {
  console.log("🚀 API running on port 5001");
});
