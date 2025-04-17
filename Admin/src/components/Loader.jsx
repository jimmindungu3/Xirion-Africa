import React from "react";

const LoadingSpinner = ({ text }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="w-4 h-4 animate-spin text-brandOrange"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-55"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span>{text}</span>
    </div>
  );
};

export default LoadingSpinner;
