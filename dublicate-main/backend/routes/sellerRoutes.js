const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const mongoose = require("mongoose");

/* -----------------------------------
   🟢 SELLER SIGNUP
----------------------------------- */
router.post("/signup", async (req, res) => {
  try {
    const { name, brandName, address, craftTypes, description, email, password, profilePic } = req.body;

    const exists = await Seller.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const seller = await Seller.create({
      name,
      brandName,
      address,
      craftTypes,
      description,
      email,
      password,
      profilePic: profilePic || null,
    });

    return res.status(201).json({
      message: "Seller registered successfully",
      seller: {
        id: seller._id,
        name: seller.name,
        brandName: seller.brandName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------
   🟡 SELLER LOGIN
----------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(400).json({ message: "User not found" });

    if (seller.password !== password)
      return res.status(400).json({ message: "Wrong password" });

    return res.json({
      message: "Login successful",
      seller: {
        id: seller._id,
        name: seller.name,
        brandName: seller.brandName,
        email: seller.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------
   🔵 GET ALL SELLERS (ARTISANS PAGE)
----------------------------------- */
router.get("/all", async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.json(sellers);
  } catch (error) {
    console.error("Fetch sellers error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------
   🟣 GET SINGLE SELLER BY ID
----------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).select("-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    res.json(seller);
  } catch (error) {
    console.error("Fetch seller error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* -----------------------------------
   ⭐ GET ALL PRODUCTS OF A SELLER
----------------------------------- */
router.get("/:id/products", async (req, res) => {
  try {
    const sellerId = req.params.id;

    // Convert to ObjectId if needed
    const products = await Product.find({
      sellerId: new mongoose.Types.ObjectId(sellerId)
    });

    return res.json(products);
  } catch (error) {
    console.error("Fetch seller products error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
