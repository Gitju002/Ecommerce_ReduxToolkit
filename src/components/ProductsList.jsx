import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productsSlice";
import { Button } from "./Button";
import { IoFilterOutline } from "react-icons/io5";
import SelectBox from "./SelectBox";
import { showSuccessToast } from "@/utils/toast";

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showSuccessToast("Product added to cart!");
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>

      <div className="mb-4 flex">
        <label
          htmlFor="category"
          className="flex items-center gap-2 mr-2 font-semibold"
        >
          Filters <IoFilterOutline />
        </label>
        <SelectBox
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          size="small"
          variant="outline"
          width="w-auto"
          id="category"
          placeholder="Hello"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="border border-gray-300 rounded p-2 capitalize"
        ></SelectBox>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 container mx-auto ">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className=" p-4 flex flex-col justify-between bg-white rounded-lg border-2 border-transparent hover:border-red-100 hover:shadow-xl hover:shadow-red-300/10 transition-all duration-200"
          >
            <img
              src={product.image}
              alt={product.title}
              className="bg-white h-64 object-contain p-4 mb-2 rounded-2xl border border-red-100"
            />
            <h2 className="text-sm font-semibold">
              {product.title.length > 40
                ? product.title.slice(0, 40) + "..."
                : product.title}
            </h2>
            <p className="text-xs text-gray-600 my-2">
              {product.description.length > 80
                ? product.description.slice(0, 80) + "..."
                : product.description}
            </p>
            <div className="flex items-center justify-start space-x-2">
              <span className="text-xs text-gray-600 flex items-center">
                {Array.from({ length: 5 }, (_, i) => {
                  const roundedRating = Math.round(product.rating.rate);
                  return <span key={i}>{i < roundedRating ? "⭐" : "☆"}</span>;
                })}
              </span>
              <span className="text-sm text-gray-600">
                ({product.rating.count})
              </span>
            </div>
            <div className="flex items-center justify-between my-2">
              <span className="text-xl font-bold">${product.price}</span>
              <Button
                onClick={() => handleAddToCart(product)}
                variant="outline"
                className="hover:bg-black hover:text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
