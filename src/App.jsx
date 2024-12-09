import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
