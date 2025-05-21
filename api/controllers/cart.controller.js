const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.module");

const addToCart = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    // Check if the book already exists in the user's cart
    const existingCartItem = await Cart.findOne({ userId, bookId });

    if (existingCartItem) {
      // If exists, increment quantity by 1
      const updatedItem = await Cart.findOneAndUpdate(
        { userId, bookId },
        { $inc: { quantity: 1 } },
        { new: true } // Return the updated document
      );
      res.status(200).json(updatedItem);
    } else {
      // If not exists, create new item with quantity 1
      const newItem = new Cart({
        ...req.body,
        quantity: 1 // Ensure quantity starts at 1 for new items
      });
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};
 
 const getCartItemsByUser = async (req, res) => {
  

    try {
      const cartItems = await Cart.find({ userId: req.params.id });
      res.json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
};
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find(); // fetches everything in Cart collection
    res.status(200).json(cartItems);
  } catch (err) {
    console.error("Error fetching all cart items:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const removeFromCart = async (req, res) => {
  const {userId,bookId} = req.body;
  


  try {
    const deletedItem = await Cart.findOneAndDelete({ userId, bookId });
    
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    res.status(200).json({ 
      message: "Item removed from cart",
      removedItem: deletedItem
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error removing item from cart", 
      error: error.message 
    });
  }
};

module.exports = {addToCart,getCartItemsByUser,getAllCartItems,removeFromCart};