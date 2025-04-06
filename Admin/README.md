import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import ProductUploader from "./components/ProductUploader";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/upload-product" element={<ProductUploader />} />
      </Routes>
    </Router>
  );
};

export default App;


import React from "react";
import Nav from "./Nav";

const categories = [
  {
    title: "Computing",
    items: "Laptops, Keyboards, Monitors, External Drives, Software",
  },
  {
    title: "Phones",
    items: "Smartphones, Feature Phones, Chargers, Phone Cases,",
  },
  {
    title: "Gaming",
    items: "Consoles, Gaming Laptops, Controllers, VR Headsets, Accessories",
  },
  {
    title: "Gadgets & Accessories",
    items: "Smartwatches, Wireless Earbuds, Power Banks, Cameras",
  },
  {
    title: "Beauty & Health",
    items: "Makeup, Skincare, Perfumes, Supplements",
  },
  {
    title: "Electronics",
    items: "Fridges, Electric Kettle, Blender, TV, Speakers",
  },
  {
    title: "Fashion & Style",
    items: "Shoes, T-Shirts, Watches, Sunglasses, Bags",
  },
  {
    title: "Home & Kitchen",
    items: "Cookware, Dishes, Blenders, Curtains, Lamps",
  },
  {
    title: "Toys & Games",
    items: "Board Games, Dolls, Action Figures, Puzzles",
  },
  {
    title: "Office Supplies",
    items: "Desks, Chairs, Printers, Notebooks, Whiteboards",
  },
];

const ProductUploader = () => {
  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto mt-4 px-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
          Upload A New Product
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-6">
          <div className="flex flex-col space-y-4">
            {/* Left column */}

            {/* TITLE */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g Samsung Galaxy S24 Ultra"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="The Samsung Galaxy S24 Ultra is the ultimate flagship smartphone, featuring a 6.8-inch Dynamic AMOLED 2X display with a 120Hz refresh rate and QHD+ resolution, protected by Corning Gorilla Glass Victus 3. Powered by the Snapdragon 8 Gen 3 (or Exynos 2400 in some regions), it delivers blazing-fast performance for gaming and multitasking..."
                required
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g 120000"
                required
              />
            </div>

            {/* QUANTITY IN STOCK */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Quantity In stock
              </label>
              <input
                type="number"
                name="quantity"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g 50"
                required
              />
            </div>

            {/* CURRENT SALES */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Current Sales
              </label>
              <input
                type="text"
                name="number"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g 10"
                required
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            {/* PRODUCT IMAGES */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Images
              </label>
              <input
                type="file"
                name="image"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            {/* PRODUCT CATEGORIES */}
            <div className="mt-4">
              <legend className="font-semibold">Categories</legend>
              <div className="grid grid-cols-2 mx-4">
                {categories.map((cat) => (
                  <span className="space-x-2 text-gray-800" key={cat.title}>
                    <input
                      type="checkbox"
                      name="category"
                      value={cat.title}
                      id={cat.title.toLowerCase().replace(/ & | /g, "-")}
                    />
                    <label
                      htmlFor={cat.title.toLowerCase().replace(/ & | /g, "-")}
                    >
                      {cat.title}
                    </label>
                  </span>
                ))}
              </div>
            </div>

            {/* CUSTOM ATTRIBUTES */}
            <div>
              <h4 className="my-4 font-semibold">Custom Attributes</h4>
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Attribute
                  </label>
                  <input
                    type="text"
                    name="attribute"
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="E.g. Material, Color, Weight, Size, etc"
                    required
                  />
                </div>
                <div className="col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Value
                  </label>
                  <input
                    type="text"
                    name="value"
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="E.g. Leather, Black, 5kg, 400mm, etc"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* KEYWORDS */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Keywords</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="keywords"
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="E.g. Samsung, Galaxy"
                  required
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-8 text-white font-semibold">
          <button className="py-2 bg-gray-400 w-full rounded-md">Clear</button>
          <button className="bg-brandOrange w-full rounded-md">Upload</button>
        </div>
      </div>
    </>
  );
};

export default ProductUploader;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    // Modified this section to properly center the content vertically and horizontally
    <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
          Sign In As Admin
        </h1>

        <form className="mt-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="name@company.com"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              to="/recover-password"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-brandOrangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5"
            onClick={() => navigate("/upload-product")}
          >
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;



import React from "react";
import { GiCircuitry } from "react-icons/gi";

const Nav = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-lg md:text-2xl lg:text-3xl flex items-center space-x-2 text-brandOrange">
            <GiCircuitry />
            <span>
              <span className="font-bold">XIR</span>ION
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4 rounded-md font-semibold">
            <span className="px-3 py-2  text-gray-700 hover:bg-orange-100 cursor-pointer transition">
              Upload Product
            </span>
            <span className="px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-100 cursor-pointer transition">
              Orders
            </span>
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

