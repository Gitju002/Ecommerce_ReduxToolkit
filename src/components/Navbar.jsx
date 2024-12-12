import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../routes";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { GoArrowUpRight } from "react-icons/go";
import { FaShopify } from "react-icons/fa";
import MiniCart from "./MiniCart";
import { toggleCart } from "../features/cart/cartToggle";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const cartIsOpen = useSelector((state) => state.toggleCart.isOpen);

  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (cartIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [cartIsOpen]);

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
          <Button className="text-white">
            Contact Us
            <GoArrowUpRight />
          </Button>
          {location.pathname !== "/cart" &&
            location.pathname !== "/checkout" && (
              <Button
                variant="outline"
                className="!rounded-full relative"
                size="icon"
                onClick={() => dispatch(toggleCart())}
              >
                <HiOutlineShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <div className="flex items-center justify-center bg-red-500 rounded-full w-5 h-5 text-white text-xs absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    {cart.length}
                  </div>
                )}
              </Button>
            )}
          {cartIsOpen && <MiniCart />}
        </div>
      </header>
    </>
  );
};

export default Navbar;
