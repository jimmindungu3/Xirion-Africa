import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key !== "default") {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // If no previous page, go to home
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-brandOrange">404</h1>
      <p className="text-gray-600 text-lg mt-2">
        Oops! The page you are looking for does not exist.
      </p>
      <img
        src="/images/404.svg"
        alt="Page Not Found"
        className="w-64 h-auto mt-6"
      />
      <button
        onClick={goBack}
        className="mt-6 bg-brandOrange text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
