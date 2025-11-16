const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// ADD or UPDATE CART ITEM
router.post("/add", async (req, res) => {
  try {
    const { buyerId, product } = req.body;

    let cart = await Cart.findOne({ buyerId });

    if (!cart) {
      cart = new Cart({
        buyerId,
        items: [{ ...product, quantity: 1 }]
      });
    } else {
      const exist = cart.items.find(item => item.productId === product.productId);

      if (exist) {
        exist.quantity += 1;
      } else {
        cart.items.push({ ...product, quantity: 1 });
      }
    }

    await cart.save();
    res.json({ message: "Item Added", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// FETCH CART OF A USER
router.get("/:buyerId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyerId: req.params.buyerId });
    res.json(cart || { items: [] });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE ITEM
router.delete("/:buyerId/:productId", async (req, res) => {
  try {
    const { buyerId, productId } = req.params;
    const cart = await Cart.findOne({ buyerId });

    if (!cart) return res.json({ message: "Cart empty" });

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
