const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("Buyer", BuyerSchema);
