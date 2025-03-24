import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WishList from "./WishList";
import About from "./About";
import Footer from "./Footer";
import { CartContext, WishlistContext } from "../App";

const ProductPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  if (!product) {
    return (
      <div className="flex flex-col">
        <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Product not found</p>
            <button
              className="mt-4 bg-brandOrange text-white font-semibold px-4 py-2 rounded-full"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
        <About />
        <Footer />
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow max-w-7xl mx-auto px-4 pt-8 pb-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="flex gap-1 md:gap-2">
                {product.images?.length > 0 && (
                  <div className="flex flex-col gap-2 w-16">
                    {product.images.map((img, index) => (
                      <div
                        key={index}
                        className={`aspect-square cursor-pointer rounded-md w-12 md:w-full overflow-hidden border bg-white ${
                          selectedImage === img
                            ? "border-brandOrange"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex-1 h-[240px] md:h-[480px]">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-">
                <h1 className="text-base md:text-lg font-bold text-gray-900">
                  {product.title}
                </h1>
                <p className="text-base md:text-lg font-bold text-brandOrange">
                  Ksh. {product.price.toLocaleString()}
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="mt-6 flex items-center">
                  <span className="mr-3 text-sm font-medium text-gray-900">
                    Quantity:
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-12 text-center border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex space-x-4 md:space-x-8 font-semibold text-sm md:text-base">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-brandOrange text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="flex-1 border border-brandOrange text-brandOrange rounded-lg py-2 md:py-3 px-1 md:px-4 hover:bg-orange-100 transition"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WishList />
      <About />
      <Footer />
    </>
  );
};

export default ProductPreview;
