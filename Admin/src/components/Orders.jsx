import React, { useEffect, useState } from "react";
import { MdCall, MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [productMap, setProductMap] = useState({});

  // Configure Base URL
  const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
  const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
  const BASE_URL =
    ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

  // Fetch product details by ID
  const fetchProductById = async (id) => {
    if (productMap[id]) return productMap[id];

    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`);
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
      try {
        const res = await fetch(`${BASE_URL}/api/orders/get-all-orders`);
        const data = await res.json();

        const uniqueProductIds = new Set();
        data.forEach((order) => {
          order.items.forEach((item) => uniqueProductIds.add(item.productId));
        });

        await Promise.all(
          Array.from(uniqueProductIds).map((id) => fetchProductById(id))
        );

        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrdersWithProducts();
  }, []);

  // Order action handlers
  const handleCancel = (id) => {
    console.log("Cancel Order:", id);
    // Implement cancellation logic here
  };

  const handleMarkShipped = (id) => {
    console.log("Mark as Shipped:", id);
    // Implement shipping logic here
  };

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
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => handleMarkShipped(order._id)}
                  className="px-2 py-1 text-sm rounded bg-brandOrange text-white font-semibold hover:bg-orange-600"
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
