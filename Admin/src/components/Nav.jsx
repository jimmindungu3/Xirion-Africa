import React, { useState } from "react";
import { GiCircuitry } from "react-icons/gi";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Added icons for menu toggle

const Nav = () => {
  // State to track whether mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white sticky top-0 z-10 opacity-100">
      <div className="shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="text-lg md:text-2xl lg:text-3xl flex items-center space-x-2 text-brandOrange">
              <GiCircuitry />
              <span>
                <span className="font-bold">XIR</span>ION
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:bg-orange-100"
              >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 rounded-md font-semibold">
              <Link to="/pending-orders">
                <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
                  Pending Orders
                </span>
              </Link>
              <Link to="/upload-product">
                <span className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
                  Upload Product
                </span>
              </Link>
              <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
                Stock
              </span>
              <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
                Sales
              </span>

              {/* Logout Button */}
              <button className="ml-4 px-4 py-2 rounded-md text-sm bg-brandOrange text-white hover:bg-brandOrangeDark transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - show when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden shadow-lg border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
            <Link
              to="/pending-orders"
              className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Pending Orders
            </Link>
            <Link
              to="/upload-product"
              className="px-3 py-2 text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload Product
            </Link>
            <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
              Stock
            </span>
            <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
              Sales
            </span>

            {/* Mobile Logout Button */}
            <button className="mt-2 mx-3 px-4 py-2 rounded-md text-sm bg-brandOrange text-white hover:bg-brandOrangeDark transition">
              Logout
            </button>
          </div>
        </div>
      )}

      <div className="h-4"></div>
    </nav>
  );
};

export default Nav;
