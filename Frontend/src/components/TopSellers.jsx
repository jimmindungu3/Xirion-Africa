import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { CartContext } from "../App";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// set the base url for different environments
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const TopSellers = () => {
  const Navigate = useNavigate();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useContext(CartContext);

  const handleProductPreview = (product) => {
    Navigate("/product-preview", { state: { product: product } });
  };

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products/random`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBestSellers(data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
        setTimeout(() => setError(true), 10000);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchBestSellers();
  }, []);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="product-card h-full bg-white shadow-sm rounded-lg p-2">
      <div className="relative mb-2 h-40 max-w-[160px] mx-auto">
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
      </div>
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-full mx-auto mt-1 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mt-2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-full w-2/4 mx-auto mt-2 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-full mx-auto mt-2 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-2">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            width: 32px !important;
            height: 32px !important;
            background-color: #f3f4f6;
            border-radius: 50%;
            color: #6b7280 !important;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: #e5e7eb;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 14px !important;
            font-weight: bold;
          }
          .swiper-button-disabled {
            opacity: 0 !important;
          }
        `}
      </style>

      <div className="flex items-center justify-between mt-4 mb-4">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900">
          Top Sellers
        </h2>
      </div>

      {error ? (
        <p className="text-red-500 text-center">
          Failed to load products. Please try again.
        </p>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          autoplay={!loading ? { delay: 3000 } : false}
          loop={!loading}
          className="pb-6"
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {loading
            ? [...Array(5)].map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`} className="h-auto">
                  <ProductSkeleton />
                </SwiperSlide>
              ))
            : bestSellers.map((product) => (
                <SwiperSlide key={product._id} className="h-auto">
                  <div className="product-card group flex flex-col h-full rounded-lg p-2 border hover:shadow-md transition">
                    {/* Product Image - Fixed height */}
                    <div className="mb-2 h-28 md:h-40 w-full max-w-[160px] sm:max-w-[200px] mx-auto">
                      <div className="w-full h-full rounded-lg flex items-center justify-center overflow-hidden text-xs bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-contain bg-white rounded-md"
                          />
                        ) : (
                          <div className="text-gray-500 text-sm">No Image</div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="px-2 flex flex-col flex-grow">
                      {/* Title - Fixed height */}
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {product.title}
                      </h3>

                      {/* Description  */}
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price & Stock - Fixed section */}
                      <div className="mt-2 mb-2">
                        <p className="text-brandOrange font-bold text-sm">
                          Ksh. {product.price.toLocaleString()}
                        </p>
                        <p
                          className={`text-xs font-medium ${
                            product.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>

                      {/* Buttons - Fixed height section */}
                      <div className="mt-auto">
                        <div className="flex flex-col gap-y-2">
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
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;
