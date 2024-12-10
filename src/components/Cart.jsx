import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { MinusIcon, PlusIcon, XIcon as XMarkIcon } from "lucide-react";
import { Button } from "./Button";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-primary py-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-black text-white">
          <h2 className="text-3xl text-center font-bold">Your Cart</h2>
        </div>
        {cart.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-black text-xl">Your cart is empty.</p>
          </div>
        ) : (
          <div className="p-6 divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="py-6 flex items-center">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center space-x-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span className="text-gray-600 font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="mt-2 text-red-600 hover:text-red-800 focus:outline-none"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="px-6 py-4 bg-gray-50">
            <div className="flex justify-between items-center text-gray-600">
              <span>Items in cart:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 mt-2">
              <span>Total items:</span>
              <span>{totalCartItems}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-gray-800 mt-4">
              <span>Total amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="!bg-black text-white w-full mt-6" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
