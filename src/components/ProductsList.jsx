import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/products/productsSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
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
          <div className="flex items-center justify-between my-2">
            <span className="text-xl font-bold">${product.price}</span>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
