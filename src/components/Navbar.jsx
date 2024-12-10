import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";
import { FaAngleRight, FaShopify } from "react-icons/fa";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);

  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <>
      <header className="max-w-[calc(100vw-4rem)] mx-auto flex justify-between items-center px-4 rounded-full mt-4 py-2 fixed top-0 left-0 right-0 z-50 bg-slate-50/50 shadow-lg shadow-slate-700/10  backdrop-blur-sm">
        <div className="flex items-center gap-x-0">
          <FaShopify className="w-10 h-10" />
          <span className="font-semibold text-lg">Shopie</span>
        </div>
        <nav>
          <ul className="flex gap-x-8 px-4 ">
            {routes.map((value, index) => {
              return (
                <li
                  className="group relative text-sm font-medium tracking-tight transition-all duration-200"
                  key={index}
                >
                  <Link to={value.path}>{value.name}</Link>
                  <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-black transition-all duration-200 ease-in-out" />
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="relative flex items-center gap-x-4">
          <Button>
            Contact Us
            <GoArrowUpRight />
          </Button>
          <Button
            variant="outline"
            className="!rounded-full relative"
            size="icon"
            onClick={toggleCart}
          >
            <HiOutlineShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <div className="flex items-center justify-center bg-red-500 rounded-full w-5 h-5 text-white text-xs absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                {cart.length}
              </div>
            )}
          </Button>
          {cartVisible && (
            <div className="absolute right-0 top-14 h-96  w-96 bg-slate-50 rounded-md overflow-y-auto no-scrollbar shadow-md shadow-slate-700/10">
              <h2 className="p-6 text-lg font-medium">Your Cart</h2>
              <div className="mx-6 border-t-2 border-gray-200"></div>
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col items-start">
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
                          {item.quantity > 9
                            ? item.quantity
                            : `0${item.quantity}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="p-6 text-center text-gray-500">
                  Your cart is empty.
                </p>
              )}
              <Link
                to="/cart"
                className="flex items-center justify-center mb-6"
              >
                <Button
                  className="!bg-black text-white"
                  size="lg"
                  onClick={() => setCartVisible(false)}
                >
                  Go to Cart
                  <FaAngleRight />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
