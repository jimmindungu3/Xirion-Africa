import React, { useContext } from "react";
import { FaTrash, FaAngleLeft } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import Footer from "../components/Footer";
import About from "../components/About";
import WishList from "../components/WishList";
import { CartContext } from "../App";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, incrementProductCount, decrementProductCount, removeFromCart } =
    useContext(CartContext);

  // Calculate total cart price
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mx-2 p-4 my-8 border shadow-sm rounded-lg grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Main Column: Cart Items */}
          <div className="md:col-span-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 border-b">
              Cart
            </h2>

            {cart.length === 0 ? (
              <>
                <p className="text-gray-600">Your cart is empty.</p>
                <Link to={"/"}>
                  <button className="mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                    Back To shop
                  </button>
                </Link>
              </>
            ) : (
              <div>
                <div>
                  {cart.map((item) => (
                    <div
                      key={item.product._id}
                      className="grid grid-cols-12 gap-0 items-center py-3 border-b"
                    >
                      {/* Image */}
                      <div className="col-span-2 flex items-center">
                        <img
                          src={item.product?.images?.[0] || item.product.image}
                          alt={item.product.title}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                        />
                      </div>

                      {/* Description */}
                      <div className="col-span-6 pr-4">
                        <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                          {item.product.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          KSh {item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-0.5 md:gap-1">
                          <button
                            onClick={() =>
                              decrementProductCount(item.product._id)
                            }
                            disabled={item.quantity <= 1}
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded w-6 h-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                            aria-label="Decrease quantity"
                          >
                            <AiOutlineMinus size={14} />
                          </button>
                          <span className="w-6 text-center font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              incrementProductCount(item.product._id)
                            }
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded w-6 h-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
                            aria-label="Increase quantity"
                          >
                            <AiOutlinePlus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="col-span-2 flex justify-center">
                        <button
                          onClick={() => removeFromCart(item.product)}
                          className="text-red-500 hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to={"/"}>
                  <button className="mt-4 p-2 rounded-md font-semibold bg-brandOrange text-white text-sm md:text-base hover:bg-orange-600 transition-all">
                    <span className="flex items-center">
                      <FaAngleLeft /> Shop Some More
                    </span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2 border p-4 rounded-lg h-fit sticky top-16">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="text-base flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800">
                Products In Cart:
              </span>
              <span className="font-bold text-orange-600">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="text-base flex justify-between items-center">
              <span className="font-semibold text-gray-800">Subtotal:</span>
              <span className="font-bold text-orange-600">
                KSh {getTotalPrice().toLocaleString()}
              </span>
            </div>

            {cart.length != 0 && (
              <Link to={"/checkout"}>
                <button className="mt-4 w-full bg-orange-500 text-white text-sm md:text-base py-2 font-semibold rounded-lg hover:bg-orange-600 transition">
                  <span className="flex gap-2 items-center justify-center">
                    <MdOutlineShoppingCartCheckout />
                    Checkout
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <WishList />
      <About />
      <Footer />
    </>
  );
};

export default Cart;
