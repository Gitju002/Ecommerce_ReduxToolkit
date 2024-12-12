import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { Calendar, Minus, MinusIcon, Plus, PlusIcon } from "lucide-react";
import { Button } from "../components/Button";
import { showSuccessToast } from "@/utils/toast";

export default function CheckoutPage() {
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleToast = () => {
    showSuccessToast("Order Placed Successfully!");
  };

  return (
    <div className="min-h-screen pt-20  py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Delivery Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-black">
              Delivery Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 p-2 rounded-md block w-full   border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 p-2 rounded-md block w-full  border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-2 py-6 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-b py-4">
              <span className="text-sm font-medium text-gray-900">
                Schedule Delivery
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={scheduleDelivery}
                onClick={() => setScheduleDelivery(!scheduleDelivery)}
                className={`${
                  scheduleDelivery ? "bg-gray-900" : "bg-gray-200"
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out`}
              >
                <span
                  className={`${
                    scheduleDelivery ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                />
              </button>
            </div>

            {scheduleDelivery && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery Date
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm pr-10"
                    placeholder="Select date"
                  />
                  <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note
              </label>
              <textarea
                rows="3"
                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                placeholder="Type your note"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Payment Method
              </h3>
              <div className="space-y-2">
                {["online", "cash", "pos"].map((method) => (
                  <label key={method} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {method} Payment
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className=" bg-white rounded-lg shadow-sm p-6 ">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain bg-gray-50 rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <div className="flex items-center gap-x-6 mt-1">
                        <span className="text-md font-medium text-gray-900">
                          ${item.price}
                        </span>
                        <div className="flex items-center ">
                          <Button
                            className="bg-slate-700 text-white rounded hover:bg-slate-900 focus:outline-none h-5 w-5"
                            size="icon"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="text-sm w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            className="bg-slate-700 text-white rounded hover:bg-slate-900 focus:outline-none h-5 w-5"
                            size="icon"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-base font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-medium text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="mt-6 w-full" onClick={handleToast}>
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
