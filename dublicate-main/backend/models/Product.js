const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sellerId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Base64 or image URL
});

module.exports = mongoose.model("Product", ProductSchema);
