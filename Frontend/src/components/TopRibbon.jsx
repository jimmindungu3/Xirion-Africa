import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

import { SignedInStatusContext, CartContext } from "../App";

const categories = [
  { title: "Computing" },
  { title: "Gaming" },
  { title: "Gadgets & Accessories" },
  { title: "Beauty & Health" },
  { title: "Electronics" },
  { title: "Fashion & Style" },
  { title: "Home & Kitchen" },
  { title: "Toys & Games" },
  { title: "Office Supplies" },
];

const getInitials = (fullName) => {
  if (!fullName) return "";
  return fullName.split(" ")[0];
};

const TopRibbon = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const [initials, setInitials] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { signedInStatus, handleSignOut } = useContext(SignedInStatusContext);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?keywords=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Calculate total number of items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const userFullName = localStorage.getItem("userFullName");
    if (userFullName) setInitials(getInitials(userFullName));
  }, [signedInStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-200 sticky top-0 z-50 shadow-md text-sm md:text-base">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 md:py-3">
        {/* Left: Categories */}
        <div ref={categoriesRef} className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 px-3 py-2 rounded-md"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            <FaBars className="text-sm md:text-lg" />
            <span className="hidden sm:inline font-medium">Categories</span>
          </div>
          {isCategoriesOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-gray-100 rounded-lg shadow-md overflow-hidden z-50">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${encodeURIComponent(
                    category.title
                  )}`}
                  className="block px-4 py-2 border-b border-white hover:bg-gray-100"
                  onClick={() => setIsCategoriesOpen(false)}
                >
                  <span className="font-medium">{category.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden h-6 md:h-10 w-full mx-4 lg:max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="flex items-center rounded-lg overflow-hidden h-10 w-full lg:max-w-2xl"
          >
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="px-3 w-full outline-none h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="text-gray-600 bg-white px-4 h-full flex items-center justify-center"
            >
              <IoSearch />
            </button>
          </form>
        </div>

        {/* Right: Cart & Account */}
        <div className="flex items-center space-x-4 relative">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-300"
          >
            <FaShoppingCart className="text-base md:text-lg lg:text-xl" />
            <span className="hidden sm:inline font-medium">Cart</span>

            <span className="absolute -top-0.5 md:-top-1 -right-1 md:-right-2 bg-brandOrange text-white text-xs font-semibold 
            px-1 md:px-2 md:py-0.5 rounded-full">
              {cartItemCount || 0}
            </span>
          </Link>

          {/* Account Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser className="text-base md:text-lg" />
              <span className="hidden sm:inline font-medium">
                {signedInStatus ? initials : "Account"}
              </span>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-md overflow-hidden z-50">
                {!signedInStatus ? (
                  <>
                    <Link
                      to="/sign-in"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSignOut()}
                    >
                      Sign Out
                    </Link>
                    <Link
                      to="/edit-account"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Edit Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRibbon;
