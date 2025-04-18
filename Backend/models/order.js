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
    enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
    default: "Placed",
  },
  mpesaConfirmationCode: { type: String, required: true },
  CheckoutRequestID: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
