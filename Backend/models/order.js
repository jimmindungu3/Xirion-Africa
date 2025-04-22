const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
  },
  items: [
    {
      productId: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      itemTotal: { type: Number, required: true },
    },
  ],
  pricing: {
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: [
      "Pending", // Order placed
      "Confirmed", // Payment verified
      "Processing", // Order being packed/prepared
      "Shipped", // Left the warehouse
      "Waiting Pick Up", // En route to customer
      "Delivered", // Successfully delivered
      "Cancelled", // Cancelled before delivery
      "Returned", // Returned by customer
      "Refunded", // Refund issued
      "Failed", // Payment/order error
    ],
    default: "Pending",
  },
  mpesaConfirmationCode: { type: String, required: true },
  CheckoutRequestID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
