const express = require("express");
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const multer = require("multer");

const router = express.Router();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/products - Create a new product
router.post("/", upload.array("images"), async (req, res) => {
  try {
    // Log received data for debugging
    // console.log("Form Data Fields:", req.body);
    // console.log("Uploaded Images:", req.files);

    // Parse JSON strings back to objects
    const categories = JSON.parse(req.body.categories || "[]");
    const keywords = JSON.parse(req.body.keywords || "[]");
    const customAttributes = JSON.parse(req.body.customAttributes || "[]");

    // Upload images to Cloudinary and collect their URLs
    const imageUrls = [];

    // Check if there are files to upload
    if (req.files && req.files.length > 0) {
      // Process each image file
      for (const file of req.files) {
        // Convert buffer to base64 string for Cloudinary
        const base64Data = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data, {
          upload_preset: "xirion-africa",
          use_filename: true,
          unique_filename: true,
        });

        // Store the secure URL
        imageUrls.push(result.secure_url);
      }
    }

    // Create a new product using our mongoose model
    const productData = {
      title: req.body.title,
      price: Number(req.body.price),
      description: req.body.description,
      category: categories,
      keywords: keywords,
      quantity: Number(req.body.quantityInStock),
      images: imageUrls,
      customAttributes,
    };

    const newProduct = new Product(productData);

    // Save the new product to MongoDB
    const savedProduct = await newProduct.save();

    // Send success response
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// GET /api/products - Retrieve all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/random - Retrieve 15 random products
router.get("/random", async (req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 15 } }]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/category/:category - Fetch products by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({
      category: { $regex: category, $options: "i" }, // Case-insensitive match
    });

    // Handle case where no products match
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/keywords - Fetch products by multiple keywords
router.get("/keywords", async (req, res) => {
  try {
    let { keywords } = req.query;

    if (!keywords) {
      return res
        .status(400)
        .json({ error: "Keywords query parameter is required" });
    }

    // Convert single string into an array (comma-separated values)
    const keywordsArray = keywords.split(",").map((keyword) => keyword.trim());

    // Use $or and $regex to find products with similar keywords
    const products = await Product.find({
      keywords: {
        $in: keywordsArray.map((keyword) => new RegExp(keyword, "i")), // Case-insensitive match
      },
    });

    // Handle case where no products match
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the given keywords" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id – Retrieve a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id - Edit a product
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id – Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
