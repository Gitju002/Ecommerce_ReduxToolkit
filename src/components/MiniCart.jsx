import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { FaAngleRight } from "react-icons/fa";
import { toggleCart } from "../features/cart/cartToggle";
import {
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { MinusIcon, PlusIcon } from "lucide-react";

const MiniCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="absolute right-0 top-14 max-h-96  w-96 bg-slate-50 rounded-md overflow-y-auto no-scrollbar shadow-md shadow-slate-700/10">
      <div className="p-6 flex flex-row justify-between items-center">
        <h2 className=" text-lg font-medium">Your Cart</h2>
        <Link to="/cart" className="flex items-center justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => dispatch(toggleCart())}
          >
            Go to Cart
            <FaAngleRight />
          </Button>
        </Link>
      </div>
      <div className="mx-6 border-t-2 border-gray-200"></div>

      {cart.map((item) => (
        <div key={item.id} className="p-6 flex justify-between flex-col ">
          <div className="flex items-center gap-x-4 justify-between">
            <img
              src={item.image}
              alt={item.title}
              className="bg-white h-28 w-20 object-contain rounded-md "
            />
            <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h3>
              <h3 className="text-xs font-light text-gray-800">
                Category:{" "}
                <span className="text-sm font-semibold tracking-tight">
                  {item.category}
                </span>
              </h3>
              <div className="flex  items-baseline gap-x-2">
                <span className="text-lg font-semibold text-gray-800">
                  ${item.price} x
                </span>
                <div className=" text-black text-xs flex items-center justify-center">
                  {item.quantity > 9 ? item.quantity : `0${item.quantity}`}
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col-reverse gap-2">
                <Button
                  className="bg-slate-700 text-white rounded hover:bg-slate-900 focus:outline-none h-5 w-5"
                  size="icon"
                  onClick={() => dispatch(decrementQuantity(item.id))}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
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
      {cart.length === 0 && (
        <p className="p-6 text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default MiniCart;
