import React from "react";

const SuccessModal = ({ setShowSTKsentModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h2 className="text-lg font-semibold mt-4">STK Push Sent</h2>
        <p className="text-gray-600 mt-2">
          Enter Mpesa PIN on phone to complete payment
        </p>
        <button
          className="mt-4 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={() => setShowSTKsentModal(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
