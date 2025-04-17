// upload product component

import React, { useState, useRef } from "react";
import { RiCloseFill } from "react-icons/ri";
import Loader from "../components/Loader";
import Nav from "./Nav";
import { toast } from "react-toastify";

// Set dynamic base URL
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const categories = [
  {
    title: "Computing",
    items: "Laptops, Keyboards, Monitors, External Drives, Software",
  },
  {
    title: "Phones",
    items: "Smartphones, Feature Phones, Chargers, Phone Cases",
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
  const [chosenCategories, setChosenCategories] = useState([]);

  // Image preview states
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  // Custom attributes states
  const [customAttribute, setCustomAttribute] = useState("");
  const [customAttributeValue, setCustomAttributeValue] = useState("");
  const [customAttributes, setCustomAttributes] = useState([]);

  // Keywords states
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState([]);

  // Loading state
  const [uploading, setUploading] = useState(false);

  // Handle category toggle (check/uncheck)
  const handleCategories = (category) => {
    // If the category is already selected, remove it
    if (chosenCategories.includes(category)) {
      setChosenCategories(chosenCategories.filter((cat) => cat !== category));
    }
    // Otherwise, add it
    else {
      setChosenCategories([...chosenCategories, category]);
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
          attribute: customAttribute.trim(),
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

  // Handle file upload for images with preview
  const handleImageUpload = (e) => {
    // Store files for upload
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Create preview URLs for display
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevImages) => [...prevImages, ...newImageUrls]);

    // Reset file input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove a specific image preview
  const removeImage = (indexToRemove) => {
    setImagePreviews((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );

    // Also update the files array if needed
    if (imageFiles) {
      const updatedFiles = Array.from(imageFiles).filter(
        (_, index) => index !== indexToRemove
      );
      setImageFiles(updatedFiles);
    }
  };

  // Clear all images
  const clearImages = () => {
    setImagePreviews([]);
    setImageFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Clear all form data
  const handleClear = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantityInStock("");
    clearImages();
    setChosenCategories([]);
    setCustomAttribute("");
    setCustomAttributeValue("");
    setCustomAttributes([]);
    setKeyword("");
    setKeywords([]);
  };

  // Upload the product
  const handleUpload = () => {
    setUploading(true);

    // FormData to hold attributes and image files
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("quantityInStock", Number(quantityInStock));
    formData.append("categories", JSON.stringify(chosenCategories));
    formData.append("customAttributes", JSON.stringify(customAttributes));
    formData.append("keywords", JSON.stringify(keywords));
    imageFiles.forEach((imageFile) => {
      formData.append("images", imageFile);
    });

    fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploading(false);
        toast.success(`${title} uploaded successfully`);
        // handleClear()
      })
      .catch((err) => {
        console.error(err);
        setUploading(false);
      });
  };

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto mt-4 px-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">
          Upload A New Product
        </h2>
        <div className="mt-4 flex flex-col md:grid grid-cols-2 gap-x-6">
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
                rows={7}
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="E.g. The Samsung Galaxy S24 Ultra is the ultimate flagship smartphone, featuring a 6.8-inch Dynamic AMOLED 2X display with a 120Hz refresh rate and QHD+ resolution, protected by Corning Gorilla Glass Victus 3. Powered by the Snapdragon 8 Gen 3 (or Exynos 2400 in some regions), it delivers blazing-fast performance for gaming and multitasking..."
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
                placeholder="E.g. 120000"
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
                placeholder="E.g. 50"
                onChange={(e) => setQuantityInStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            {/* PRODUCT IMAGES with PREVIEW */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-900">
                Images
              </label>

              {/* Image previews */}
              <div className="flex gap-4 flex-wrap mb-4">
                {imagePreviews.length === 0 ? (
                  <p className="text-gray-500">No images selected</p>
                ) : (
                  imagePreviews.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-16 w-16 border border-gray-400"
                    >
                      <img
                        src={img}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full"
                        onClick={() => removeImage(index)}
                        type="button"
                      >
                        <RiCloseFill />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* File input and clear button */}
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  name="image"
                  multiple
                  className="border rounded-r-md border-gray-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  required
                />
                {imageFiles.length > 0 && (
                  <button
                    className="px-3 py-0.5 bg-gray-200 border border-gray-500 rounded hover:bg-gray-300"
                    onClick={clearImages}
                    type="button"
                  >
                    Clear Images
                  </button>
                )}
              </div>
            </div>

            {/* PRODUCT CATEGORIES */}
            <div className="mt-4">
              <legend className="font-semibold">Categories</legend>
              <div className="grid grid-cols-2 mx-4">
                {categories.map((cat) => (
                  <span className="space-x-2 text-gray-800" key={cat.title}>
                    <input
                      type="checkbox"
                      id={`cat-${cat.title}`}
                      name="category"
                      value={cat.title}
                      checked={chosenCategories.includes(cat.title)}
                      onChange={() => handleCategories(cat.title)}
                    />
                    <label htmlFor={`cat-${cat.title}`}>{cat.title}</label>
                  </span>
                ))}
              </div>
            </div>

            {/* CUSTOM ATTRIBUTES */}
            <div>
              <h4 className="mt-4 mb-2 font-semibold">Custom Attributes</h4>

              <div className="flex flex-wrap">
                {customAttributes.map((attr, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 py-2 px-3 mb-2 mr-2 rounded-md bg-green-100"
                  >
                    <span className="font-medium">{attr.attribute}:</span>
                    <span>{attr.value}</span>
                    <RiCloseFill
                      className="text-lg cursor-pointer ml-2 text-white bg-red-500 rounded-full"
                      onClick={() => removeCustomAttribute(index)}
                    />
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-4">
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
                <div className="col-span-6">
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
                    className="w-ful px-4 py-2 bg-gray-200 border border-gray-500 rounded-md hover:bg-gray-300"
                    onClick={addCustomAttribute}
                    type="button"
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
                    className="flex items-center gap-1 py-2 px-3 mb-2 rounded-md bg-green-100"
                  >
                    {kw}
                    <RiCloseFill
                      className="text-lg cursor-pointer ml-2 text-white bg-red-500 rounded-full"
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
                  className="px-4 py-2 bg-gray-200 border border-gray-500 rounded hover:bg-gray-300"
                  onClick={addKeyWord}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-8 text-white font-semibold">
          <button
            className="py-2 bg-gray-400 w-full rounded-md hover:bg-gray-500"
            onClick={handleClear}
            type="button"
          >
            Clear
          </button>
          <button
            className="bg-orange-500 w-full rounded-md py-2 hover:bg-orange-600 flex items-center justify-center"
            onClick={handleUpload}
            type="button"
          >
            {uploading ? <Loader text={"Uploading"} /> : "Upload"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductUploader;
