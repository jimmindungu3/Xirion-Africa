import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import { CartContext, WishlistContext } from "../App";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (wishlist.length === 0) {
    return null;
  }

  const handleProductPreview = (product) => {
    navigate("/product-preview", { state: { product } });
  };

  return (
    <div className="max-w-7xl mx-auto px-2 mt-6">
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

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900">
          Wishlist
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 8000 }}
        loop={wishlist.length > 2}
        className="pb-6"
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {wishlist.map((product) => (
          <SwiperSlide key={product._id || product.id} className="h-auto">
            <div
              className="product-card group flex flex-col h-full rounded-lg p-2 border hover:shadow-md hover:cursor-pointer transition"
              onClick={() => handleProductPreview(product)}
            >
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

              <div className="px-2 flex flex-col flex-grow">
                <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2 mb-2">
                  <p className="text-brandOrange font-bold text-sm">
                    Ksh. {product.price.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      product.quantity > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-col gap-y-2">
                    <button
                      className="bg-brandOrange border border-brandOrange w-full text-white text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                    >
                      Add To Cart
                    </button>
                    {/* <button
                      className="border border-gray-500 w-full text-gray-500 text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(product)}
                    >
                      Remove From List
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Wishlist;
