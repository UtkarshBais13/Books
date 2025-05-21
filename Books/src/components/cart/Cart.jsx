import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchCart = async () => {
    try {
      const userId = user?.userId;
      if (!userId) return;

      const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCart(res.data);
      calculateTotal(res.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleRemoveItem = async (bookId) => {
    setIsRemoving(true);
    setError(null);
    // console.log(bookId);
    
    
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/${user.userId}`, {
        data: {  // Note: For DELETE requests with axios, use 'data' for the payload
          userId: user.userId,
          bookId: bookId
        }
      });

      if (response.data.message === "Item removed from cart") {
        // Update local state
        const updatedCart = cart.filter(cartItem => cartItem.bookId !== bookId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
      setError(error.response?.data?.message || "Failed to remove item from cart");
    } finally {
      setIsRemoving(false);
    }
  };


  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 text-orange-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          Your Book Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">Your cart is empty</p>
                <button 
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => window.location.href = '/'} // Redirect to books page
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item._id} 
                    className="flex gap-6 p-4 bg-orange-50 rounded-xl hover:shadow-md transition-shadow border border-orange-100 relative"
                  >
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-32 h-40 object-cover rounded-xl border-2 border-white shadow-sm"
                    />
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">by {item.author}</p>
                        <div className="mt-2 flex items-center gap-4">
                          <span className="text-lg font-medium text-orange-600">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-gray-500">×</span>
                          <span className="px-3 py-1 bg-white rounded-md border shadow-sm">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-gray-800">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                       onClick={() => handleRemoveItem(item.bookId)} 
                      disabled={isRemoving}
              
                      className="absolute top-4 right-4 p-2 text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Summary */}
          {cart.length > 0 && (
            <div className="lg:w-96 bg-white rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-orange-600">
                    ${(totalPrice * 1.05).toFixed(2)}
                  </span>
                </div>
              </div>

              <button 
                className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg
                          hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 text-orange-600" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  Free shipping on all book orders
                </p>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center">
                Secured checkout
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 text-green-500" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;