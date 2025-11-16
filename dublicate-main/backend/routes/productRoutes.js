const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// =========================
// 1️⃣ Upload Product
// =========================
router.post("/upload", async (req, res) => {
  try {
    const { sellerId, title, price, category, description, image } = req.body;

    if (!sellerId || !title || !price || !category || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      sellerId,
      title,
      price,
      category,
      description,
      image,
    });

    return res.json({
      message: "Product uploaded successfully",
      product,
    });

  } catch (error) {
    console.error("Product Upload Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================
// 2️⃣ Get All Products
// =========================
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

// =========================
// 3️⃣ Get Products by Category
// =========================
router.get("/category/:categoryName", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    return res.json(products);
  } catch (error) {
    console.error("Fetch Category Products Error:", error);
    res.status(500).json({ message: "Server error while fetching category products" });
  }
});

// =========================
// 4️⃣ Get Single Product by ID
// =========================
router.get("/single/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    console.error("Fetch Single Product Error:", error);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

module.exports = router;
