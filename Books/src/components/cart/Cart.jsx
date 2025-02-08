import React from "react";

const Cart = ({ cart }) => {
  return (
    <div className="w-1/3 p-4 bg-white border-l">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow bg-gray-50 flex justify-between"
            >
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
