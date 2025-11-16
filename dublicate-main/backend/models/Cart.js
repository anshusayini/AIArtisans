const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    buyerId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        title: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
