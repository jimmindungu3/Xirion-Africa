import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
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
  // Basic product info states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [images, setImages] = useState(null);
  const [chosenCategories, setChosenCategories] = useState([]);

  // Custom attributes states
  const [customAttribute, setCustomAttribute] = useState("");
  const [customAttributeValue, setCustomAttributeValue] = useState("");
  const [customAttributes, setCustomAttributes] = useState([]);

  // Keywords states
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  // Add a new category to chosen categories
  const handleCategories = (newCategory) => {
    // Check if category is already selected
    if (!chosenCategories.includes(newCategory)) {
      setChosenCategories([...chosenCategories, newCategory]);
    }
  };

  // Add a new keyword
  const addKeyWord = () => {
    // Only add if keyword is not empty and not already in the list
    if (keyword.trim() !== "" && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword("");
    }
  };

  // Remove a keyword
  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter((kw) => kw !== keywordToRemove));
  };

  // Add a custom attribute
  const addCustomAttribute = () => {
    // Only add if both fields are filled
    if (customAttribute.trim() !== "" && customAttributeValue.trim() !== "") {
      setCustomAttributes([
        ...customAttributes,
        {
          name: customAttribute.trim(),
          value: customAttributeValue.trim(),
        },
      ]);
      // Clear input fields after adding
      setCustomAttribute("");
      setCustomAttributeValue("");
    }
  };

  // Remove a custom attribute
  const removeCustomAttribute = (indexToRemove) => {
    setCustomAttributes(
      customAttributes.filter((_, index) => index !== indexToRemove)
    );
  };

  // Handle file upload for images
  const handleImageUpload = (e) => {
    setImages(e.target.files);
  };

  // Clear all form data
  const handleClear = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantityInStock("");
    setImages(null);
    setChosenCategories([]);
    setCustomAttribute("");
    setCustomAttributeValue("");
    setCustomAttributes([]);
    setKeyword("");
    setKeywords([]);

    // Reset file input by using a ref or DOM manipulation
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // Upload the product
  const handleUpload = () => {
    // Create product data object
    const productData = {
      title,
      description,
      price: Number(price),
      quantityInStock: Number(quantityInStock),
      categories: chosenCategories,
      customAttributes,
      keywords,
    };

    // In a real app, you would:
    // 1. Validate the data
    // 2. Create a FormData object for the images
    // 3. Send to backend API

    console.log("Product data to upload:", productData);
    console.log("Images to upload:", images);

    // Here you would add your API call
    alert("Product submitted successfully!");
  };

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
                value={title}
                placeholder="E.g Samsung Galaxy S24 Ultra"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="The Samsung Galaxy S24 Ultra is the ultimate flagship smartphone, featuring a 6.8-inch Dynamic AMOLED 2X display with a 120Hz refresh rate and QHD+ resolution, protected by Corning Gorilla Glass Victus 3. Powered by the Snapdragon 8 Gen 3 (or Exynos 2400 in some regions), it delivers blazing-fast performance for gaming and multitasking..."
                onChange={(e) => setDescription(e.target.value)}
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
                value={price}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g 120000"
                onChange={(e) => setPrice(e.target.value)}
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
                value={quantityInStock}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g 50"
                onChange={(e) => setQuantityInStock(e.target.value)}
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
                multiple
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                onChange={handleImageUpload}
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
                      checked={chosenCategories.includes(cat.title)}
                      onChange={(e) => handleCategories(e.target.value)}
                    />
                    <label htmlFor={cat.title}>{cat.title}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* CUSTOM ATTRIBUTES */}
            <div>
              <h4 className="my-4 font-semibold">Custom Attributes</h4>

              {/* Display existing custom attributes with the same style as keywords */}
              <div className="flex flex-wrap gap-2 mb-4">
                {customAttributes.map((attr, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 py-2 px-3 mb-2 rounded-md bg-green-100"
                  >
                    <span className="font-medium">{attr.name}:</span>
                    <span>{attr.value}</span>
                    <RiCloseFill
                      className="text-lg cursor-pointer ml-2"
                      onClick={() => removeCustomAttribute(index)}
                    />
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Attribute
                  </label>
                  <input
                    type="text"
                    name="attribute"
                    value={customAttribute}
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="E.g. Material, Color, Weight, Size, etc"
                    onChange={(e) => setCustomAttribute(e.target.value)}
                  />
                </div>
                <div className="col-span-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Value
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={customAttributeValue}
                    className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="E.g. Leather, Black, 5kg, 400mm, etc"
                    onChange={(e) => setCustomAttributeValue(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <button
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    onClick={addCustomAttribute}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* KEYWORDS */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="flex items-center gap-1 py-2 px-3 rounded-md bg-green-100"
                  >
                    {kw}
                    <RiCloseFill
                      className="text-lg cursor-pointer"
                      onClick={() => removeKeyword(kw)}
                    />
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  name="keywords"
                  className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="E.g. Samsung, Galaxy"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  onClick={addKeyWord}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-8 text-white font-semibold">
          <button
            className="py-2 bg-gray-400 w-full rounded-md hover:bg-gray-500"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="bg-orange-500 w-full rounded-md py-2 hover:bg-orange-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductUploader;
