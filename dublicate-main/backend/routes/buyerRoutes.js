const express = require("express");
const router = express.Router();
const Buyer = require("../models/Buyer");

// ------------------ SIGNUP ------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Signup Request:", req.body);

    const exists = await Buyer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const buyer = await Buyer.create({ name, email, password });

    res.status(201).json({
      message: "Signup successful",
      buyer: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request:", email, password);

    const buyer = await Buyer.findOne({ email });

    if (!buyer) {
      return res.status(400).json({ message: "User not found" });
    }

    if (buyer.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    return res.status(200).json({
      message: "Login successful",
      buyer: {
        id: buyer._id,
        name: buyer.name,
        email: buyer.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// ------------------ GET BUYER BY ID ------------------
router.get("/:id", async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.json(buyer);
  } catch (error) {
    console.error("Get buyer error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
