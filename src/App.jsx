import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Cart from "./pages/cartpage";
import Footer from "./components/Footer";
import Checkout from "./pages/checkout";
import Details from "./pages/details";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <div className="flex-1 ">
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
