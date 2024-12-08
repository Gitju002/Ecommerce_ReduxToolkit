import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    className="bg-gray-300 text-black px-2 rounded hover:bg-gray-400"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    -
                  </button>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="bg-gray-300 text-black px-2 rounded hover:bg-gray-400"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold text-xl">Total:</span>
            <span className="text-xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
