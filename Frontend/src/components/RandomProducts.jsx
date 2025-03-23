import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { CartContext } from "../App";

// set the base url for different environments
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addToCart } = useContext(CartContext);
  const Navigate = useNavigate();

  const handleProductPreview = (selectedProduct) => {
    Navigate("/product-preview", { state: { product: selectedProduct } });
  };

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/random`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setRandomProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setTimeout(() => setError(true), 10000); // Delay error state by 3 seconds
      } finally {
        setTimeout(() => setLoading(false), 500); // Keep skeleton for 3 seconds
      }
    };

    fetchRandomProducts();
  }, []);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="product-card group bg-white shadow-sm rounded-lg p-2">
      <div className="relative mb-2 max-w-[150px] sm:max-w-[180px] mx-auto">
        <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg" />
      </div>
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto mt-1 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-full w-2/4 mx-auto mt-2 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-2 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900">Latest Stock</h2>
      </div>

      {error ? (
        <p className="text-red-500 text-center">
          Failed to load products. Please try again.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
          {loading
            ? [...Array(10)].map((_, index) => (
                <ProductSkeleton key={`skeleton-${index}`} />
              ))
            : randomProducts.map((product) => (
                <div
                  key={product._id}
                  className="product-card group border shadow-sm rounded-lg p-2 hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="relative mb-2 max-w-[160px] sm:max-w-[200px] mx-auto">
                    <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden text-xs bg-gray-100">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-sm">No Image</span>
                      )}
                    </div>
                    {/* Bestseller Tag */}
                    {product.sales > 0 && (
                      <span className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        Bestseller
                      </span>
                    )}
                  </div>
                  {/* Product Details */}
                  <div className="px-2">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {product.description.slice(0, 100)}...
                    </p>
                    {/* Price */}
                    <p className="text-brandOrange font-bold mt-1 text-sm">
                      Ksh. {product.price.toLocaleString()}
                    </p>
                    {/* Stock Availability */}
                    <p
                      className={`mt-1 text-xs font-medium ${
                        product.quantity > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                    {/* Shop Now Button */}
                    <div className="flex flex-col gap-y-2 mt-3">
                      <button
                        className="bg-brandOrange border border-brandOrange w-full text-white text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => addToCart(product, 1)}
                      >
                        Add To Cart
                      </button>
                      <button
                        className="border border-brandOrange w-full text-brandOrange text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleProductPreview(product)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default RandomProducts;
