import React, { useEffect, useState } from "react";

import Cart from "../../cart/Cart";
import BookSlider from "../../Book/Book";
import axios from "axios";


const CartPage = () => {
  const [cart, setCart] = useState([]); // Cart state
  const userId = "123"

  // Function to add a book to the cart
  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Function to add a book to the cart
  const addToCart = async (book) => {
    try {
      const response = await axios.post("http://localhost:8080/api/cart", { userId, book });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Book Store</h1>
      <div className="flex">
        <BookSlider addToCart={addToCart} />
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default CartPage;
