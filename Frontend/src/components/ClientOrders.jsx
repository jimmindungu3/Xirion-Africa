import React, { useEffect, useState } from "react";
import { MdCall, MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Client-facing Orders component
const ClientOrders = () => {
  // State variables for managing orders, products, loading, and errors
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // For demonstration, use a hardcoded email
  // In a real app, this would come from auth context or localStorage
  const userEmail = "jimmindungu3@gmail.com";

  // Configure Base URL based on environment
  const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
  const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
  const BASE_URL =
    ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

  // Generate background and text color styling based on order status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Processing":
        return "bg-indigo-100 text-indigo-800 border border-indigo-300";
      case "Shipped":
        return "bg-blue-400 text-white border border-blue-500";
      case "Waiting Pick Up":
        return "bg-purple-100 text-purple-800 border border-purple-300";
      case "Delivered":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-800 border border-red-300";
      case "Returned":
        return "bg-orange-100 text-orange-800 border border-orange-300";
      case "Refunded":
        return "bg-gray-100 text-gray-800 border border-gray-300";
      case "Failed":
        return "bg-red-400 text-white border border-red-500";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // Function to fetch product details by ID
  const fetchProductById = async (id) => {
    // Return cached product if available
    if (productMap[id]) return productMap[id];

    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.status}`);
      }

      const data = await res.json();
      // Add product to our cache
      setProductMap((prev) => ({ ...prev, [id]: data }));
      return data;
    } catch (err) {
      console.error("Error fetching product", id, err);
      return null;
    }
  };

  // Fetch the customer's orders when the component loads
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        // Using the by-email endpoint to get all customer orders
        const res = await fetch(
          `${BASE_URL}/api/orders/by-email/${userEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }

        const data = await res.json();

        // Process unique product IDs from all orders
        const uniqueProductIds = new Set();
        data.forEach((order) => {
          order.items.forEach((item) => uniqueProductIds.add(item.productId));
        });

        // Fetch all product details in parallel
        await Promise.all(
          Array.from(uniqueProductIds).map((id) => fetchProductById(id))
        );

        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerOrders();
  }, []); // Only fetch once when component mounts

  // Loading state
  if (loading) {
    return (
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="max-w-md mt-4 p-6 bg-white shadow-md rounded-2xl flex space-x-4 items-center border border-gray-200">
          <FaSpinner className="text-brandOrange text-xl animate-spin" />
          <p className="font-medium text-gray-800">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="max-w-md mt-4 p-6 bg-white shadow-md rounded-2xl flex space-x-4 border border-red-200">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <div>
            <p className="font-medium text-gray-800 mb-2">
              Error loading your orders: {error}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-3 py-1 bg-brandOrange text-white font-medium rounded hover:bg-orange-600"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state - no orders
  if (orders.length === 0) {
    return (
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="max-w-md mt-4 p-6 bg-white shadow-md rounded-2xl flex space-x-4 items-center border border-gray-200">
          <FaExclamationTriangle className="text-gray-500 text-2xl" />
          <div>
            <p className="font-medium text-gray-800">You have no orders yet</p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 px-3 py-1 bg-brandOrange text-white font-medium rounded hover:bg-orange-600"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 max-w-7xl mx-auto mt-4 mb-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">My Orders</h2>
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className={`text-gray-800 border border-gray-300 rounded-md p-3 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-orange-50"
            }`}
          >
            {/* Header with order ID and total amount */}
            <div className="flex justify-between items-center mb-2 border-b pb-1">
              <h3 className="text-lg font-semibold text-gray-600">
                Order #{order._id}
              </h3>
              <div className="font-medium">
                KES {order.pricing.totalAmount.toLocaleString()}
              </div>
            </div>

            {/* Main content in a compact grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-2">
              {/* Order details */}
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">Mpesa Code:</span>{" "}
                  {order.mpesaConfirmationCode || "Pending"}
                </p>
                <p>
                  <span className="font-medium">Date Placed:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Time Placed:</span>{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>

              {/* Payment summary */}
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">Items Total:</span> Ksh{" "}
                  {order.pricing.subtotal.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Shipping Fee:</span> Ksh{" "}
                  {(order.pricing.shippingFee || 0).toLocaleString()}
                </p>
                {order.pricing.discount > 0 && (
                  <p className="text-green-600">
                    <span className="font-medium">Discount:</span> -Ksh{" "}
                    {order.pricing.discount.toLocaleString()}
                  </p>
                )}
                <p className="font-bold">
                  <span className="font-medium">Total Paid:</span> Ksh{" "}
                  {order.pricing.totalAmount.toLocaleString()}
                </p>
              </div>

              {/* Order Status */}
              <div className="font-semibold mt-2">
                <span>Order Status: </span>
                <span
                  className={`px-2 py-1 text-sm rounded ${getStatusStyles(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items in a grid layout instead of horizontal scroll */}
            <div className="border-t pt-2">
              <p className="font-medium text-sm mb-1">Items:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {order.items.map((item) => {
                  const product = productMap[item.productId];
                  return (
                    <div
                      key={item._id || item.productId}
                      className="flex items-center gap-2 p-1 rounded bg-white"
                    >
                      {product && (
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      )}
                      <div className="text-xs">
                        <p className="font-medium">
                          {product ? product.title : "Product unavailable"}
                        </p>
                        <p>
                          Qty: {item.quantity} · Ksh{" "}
                          {item.itemTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Help section */}
            <div className="mt-4 pt-2 border-t text-sm">
              <p className="text-gray-600">
                Need help with this order?{" "}
                <a href="/contact" className="text-brandOrange hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientOrders;
