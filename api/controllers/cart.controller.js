const Cart = require("../models/cart.module");
let carts = {};
const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found." });
        }
        res.json(cart.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
      }
  }

  const postCart = async (req, res) => {
    try {
        const { userId, book } = req.body;
    
        if (!userId || !book) {
          return res.status(400).json({ error: "User ID and book details are required." });
        }
    
        let cart = await Cart.findOne({ userId });
    
        if (!cart) {
          // Create a new cart if the user doesn't have one
          cart = new Cart({ userId, items: [] });
        }
    
        // Check if the book is already in the cart
        const existingItem = cart.items.find((item) => item.bookId === book.id);
    
        if (existingItem) {
          existingItem.quantity += 1; // Increment quantity
        } else {
          // Add new book to the cart
          cart.items.push({
            bookId: book.id,
            title: book.title,
            price: book.price,
            desc:book.desc,
            author:book.desc,
          });
        }
    
        await cart.save();
        res.json(cart.items);
      } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add to cart" });
      }
  };
  module.exports={fetchCart,postCart}