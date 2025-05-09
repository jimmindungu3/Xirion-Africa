import React, { useState } from "react";
import { GiCircuitry } from "react-icons/gi";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; 
import { 
  MdDashboard, 
  MdShoppingCart, 
  MdUpload, 
  MdInventory, 
  MdAttachMoney, 
  MdPeople, 
  MdReviews, 
  MdDiscount, 
  MdSettings, 
  MdLogout,
  MdCategory,
  MdAnalytics
} from "react-icons/md"; // Importing more icons for our menu items

const Nav = () => {
  // State to track whether mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Admin menu items array - makes it easier to manage and update menu items
  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { name: "Pending Orders", icon: <MdShoppingCart />, path: "/pending-orders" },
    { name: "Upload Product", icon: <MdUpload />, path: "/upload-product" },
    { name: "Categories", icon: <MdCategory />, path: "/categories" },
    { name: "Inventory", icon: <MdInventory />, path: "/inventory" },
    { name: "Sales Reports", icon: <MdAttachMoney />, path: "/sales" },
    { name: "Analytics", icon: <MdAnalytics />, path: "/analytics" },
    { name: "Customers", icon: <MdPeople />, path: "/customers" },
    { name: "Reviews", icon: <MdReviews />, path: "/reviews" },
    { name: "Promotions", icon: <MdDiscount />, path: "/promotions" },
    { name: "Settings", icon: <MdSettings />, path: "/settings" },
  ];

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

            {/* Desktop Navigation Links - Now showing first 5 items to avoid crowding */}
            <div className="hidden md:flex items-center space-x-4 rounded-md font-semibold">
              {menuItems.slice(0, 5).map((item, index) => (
                <Link to={item.path} key={index}>
                  <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition flex items-center">
                    <span className="mr-1">{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              ))}
              
              {/* More dropdown menu for desktop */}
              <div className="relative group">
                <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition flex items-center">
                  More
                </span>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                  {menuItems.slice(5).map((item, index) => (
                    <Link to={item.path} key={index}>
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition flex items-center">
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logout Button */}
              <button className="ml-4 px-4 py-2 rounded-md text-sm bg-brandOrange text-white hover:bg-brandOrangeDark transition flex items-center">
                <MdLogout className="mr-1" />
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
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}

            {/* Mobile Logout Button */}
            <button className="mt-2 mx-3 px-4 py-2 rounded-md text-sm bg-brandOrange text-white hover:bg-brandOrangeDark transition flex items-center">
              <MdLogout className="mr-2" />
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