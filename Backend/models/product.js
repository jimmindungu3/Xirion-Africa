const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: [String], required: true },
  keywords: { type: [String], required: true },
  quantity: { type: Number, required: true, min: 0 },
  images: { type: [String], required: true },
  sales: { type: Number, default: 0, required: true },
  customAttributes: {
    type: [
      {
        attribute: String,
        value: String,
      },
    ],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
