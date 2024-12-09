import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productsSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="p-4">Loading products...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>

      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-semibold">
          FIlter By Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="border border-gray-300 rounded p-2"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-600 my-2">{product.description}</p>
            <p className="font- text-blue-500">
              <span className="font-semibold text-md text-black">
                Category:
              </span>{" "}
              {product.category}
            </p>
            <div className="flex items-center justify-between my-2">
              <span className="text-xl font-bold">${product.price}</span>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-500"
              >
                Add to Cart
              </button>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <span className="text-sm text-gray-600 flex items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const roundedRating = Math.round(product.rating.rate);
                  return <span key={i}>{i < roundedRating ? "⭐" : "☆"}</span>;
                })}
              </span>
              <span className="text-sm text-gray-600">
                {product.rating.count} reviews
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
