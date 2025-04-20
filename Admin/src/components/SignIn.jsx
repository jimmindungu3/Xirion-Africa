import React, { useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Configure Base URL
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // State to handle error messages
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Reset error message before attempting sign in
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      // Set loading state while request is in progress
      setIsLoading(true);

      // Make API request to backend signin endpoint
      const response = await fetch(`${BASE_URL}/api/admin/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include credentials to allow cookies to be sent/received
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      // Get the response data
      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages from backend
        throw new Error(data.message || "Failed to sign in");
      }

      // If successful, navigate to the upload product page
      toast.success("Signed In Successfully");
      navigate("/upload-product");
    } catch (error) {
      // Set the error message from the caught error
      setError(error.message);
    } finally {
      // Reset loading state regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    // Modified this section to properly center the content vertically and horizontally
    <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Admin Sign In
        </h1>

        {/* Show error message if there is one */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSignIn}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link
              to="/recover-password"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-brandOrangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5"
            disabled={isLoading}
          >
            <div className="flex justify-center items-center">
              {isLoading ? <Loader text={"Signing in"} /> : "Sign in"}
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
