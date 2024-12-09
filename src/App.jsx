import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";

function App() {
  const cart = useSelector((state) => state.cart);
  console.log("Cart:", cart);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white p-4 flex justify-between shadow items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          My Store
        </Link>

        <div className="relative inline-block">
          <Link
            to="/cart"
            className="text-indigo-600 hover:text-indigo-500 inline-flex items-center"
          >
            View Cart
          </Link>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
