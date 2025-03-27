import React from "react";

const ErrorModal = ({ setShowError }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <svg
          className="w-16 h-16 text-gray-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M4.93 19h14.14a2 2 0 001.74-3L13.74 4a2 2 0 00-3.48 0L3.19 16a2 2 0 001.74 3z"
          />
        </svg>

        <h2 className="text-lg font-semibold mt-4">Oops!</h2>
        <p className="text-gray-600 mt-2">Please enter a valid Mpesa number</p>
        <button
          className="mt-4 bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => setShowError(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
