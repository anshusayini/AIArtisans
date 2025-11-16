const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandName: { type: String, required: true },
  address: { type: String, required: true },
  craftTypes: { type: [String], default: [] },
  description: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Seller", SellerSchema);
