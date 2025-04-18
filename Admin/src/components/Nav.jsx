import React from "react";
import { GiCircuitry } from "react-icons/gi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to={"/"}>
            <div className="text-lg md:text-2xl lg:text-3xl flex items-center space-x-2 text-brandOrange">
              <GiCircuitry />
              <span>
                <span className="font-bold">XIR</span>ION
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 rounded-md font-semibold">
            <Link to="/orders">
              <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
                Pending Orders
              </span>
            </Link>
            <Link to={"/upload-product"}>
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
    </nav>
  );
};

export default Nav;
