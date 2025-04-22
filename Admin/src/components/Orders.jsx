import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdCall, MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Configure Base URL
  const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
  const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
  const BASE_URL =
    ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

  // Fetch product details by ID
  const fetchProductById = async (id) => {
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
      setProductMap((prev) => ({ ...prev, [id]: data }));
      return data;
    } catch (err) {
      console.error("Error fetching product", id, err);
      return null;
    }
  };

  // Fetch all orders and their products
  useEffect(() => {
    const fetchOrdersWithProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // This was the problematic line - adding proper headers
        const res = await fetch(`${BASE_URL}/api/admin/get-pending-orders`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          // Check what's going wrong
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${res.status}`
          );
        }

        const data = await res.json();

        // Process unique product IDs
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

    fetchOrdersWithProducts();
  }, []);

  // Order action handlers
  const handleCancel = async (id) => {
    // Implement cancellation logic here
    try {
      const res = await fetch(`${BASE_URL}/api/admin/cancel-order/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Update local state to reflect changes
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, status: "Cancelled" } : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  const handleMarkShipped = async (id) => {
    // Implement shipping logic here
    try {
      const res = await fetch(`${BASE_URL}/api/admin/ship-order/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // Update local state to reflect changes
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, status: "Shipped" } : order
          )
        );
      }
    } catch (err) {
      console.error("Failed to mark order as shipped:", err);
    }
  };

  if (loading) {
    return (
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="max-w-md mt-4 p-6 bg-white shadow-md rounded-2xl flex space-x-4 items-center border border-gray-200">
          <FaSpinner className="text-brandOrange text-xl animate-spin" />
          <p className="font-medium text-gray-800">Loading orders...</p>
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
              Error loading orders: {error}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-3 py-1 bg-brandOrange text-white font-medium rounded hover:bg-orange-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="px-4 max-w-7xl mx-auto mb-12">
        <div className="max-w-md mt-4 p-6 bg-white shadow-md rounded-2xl flex space-x-4 border border-red-200">
          <FaExclamationTriangle className="text-red-500 text-2xl" />
          <div>
            <p className="font-medium text-gray-800">No Pending Orders</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 max-w-7xl mx-auto mb-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Pending Orders
      </h2>
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className={`text-gray-800 border border-gray-300 rounded-md p-3 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-orange-50"
            }`}
          >
            {/* Header with customer name taking full row */}
            <div className="flex justify-between items-center mb-2 border-b pb-1">
              <h3 className="text-lg font-semibold text-gray-600">
                {order.customer.firstName} {order.customer.lastName}
              </h3>
              <div className="font-medium">
                KES {order.pricing.totalAmount.toLocaleString()}
              </div>
            </div>

            {/* Main content in a compact grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-2">
              {/* Customer info */}
              <div className="text-gray-700">
                <p className="flex items-center gap-1">
                  <span>
                    <MdEmail />
                  </span>{" "}
                  {order.customer.email}
                </p>
                <p className="flex items-center gap-1">
                  <span>
                    <MdCall />
                  </span>{" "}
                  {order.customer.phone}
                </p>
                <p className="flex items-center gap-1">
                  <span>
                    <IoLocationSharp />
                  </span>{" "}
                  {order.customer.city}
                </p>
              </div>

              {/* Order details */}
              <div className="text-gray-700">
                <p>
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p>
                  <span className="font-medium">Mpesa:</span>{" "}
                  {order.mpesaConfirmationCode}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action buttons aligned to the right */}
              <div className="flex justify-end gap-2 items-start">
                <button
                  onClick={() => handleCancel(order._id)}
                  className="px-2 py-1 text-sm rounded text-white bg-gray-500 hover:bg-gray-400"
                  disabled={
                    order.status === "Cancelled" || order.status === "Shipped"
                  }
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleMarkShipped(order._id)}
                  className="px-2 py-1 text-sm rounded bg-brandOrange text-white font-semibold hover:bg-orange-600"
                  disabled={
                    order.status === "Cancelled" || order.status === "Shipped"
                  }
                >
                  Mark Shipped
                </button>
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
                      key={item._id}
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
                          {product ? product.title : item.productId}
                        </p>
                        <p>
                          Qty: {item.quantity} · KES{" "}
                          {item.itemTotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
