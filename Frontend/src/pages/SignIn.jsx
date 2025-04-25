import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignedInStatusContext } from "../App";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const SignIn = () => {
  // State for form handling
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const { handleSignedInStatus } = useContext(SignedInStatusContext);
  const navigate = useNavigate();

  // Form data and error states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    let formErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email format is invalid";
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    return formErrors;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const formErrors = validateForm();

    // Check if there are any validation errors
    if (formErrors.email || formErrors.password) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      // Check for network errors
      if (!response) {
        setLoading(false);
        toast.error("Network error. Please check your connection.");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);

        // Handle specific error responses
        if (data.error === "Email not registered") {
          setErrors((prev) => ({
            ...prev,
            email: "Email not registered",
          }));
        } else if (data.error === "Incorrect password") {
          setErrors((prev) => ({
            ...prev,
            password: "Incorrect password",
          }));
        } else if (data.error === "Email registered but not verified") {
          toast.error("Please verify your email before signing in");
          setErrors((prev) => ({
            ...prev,
            email: "Email not verified",
          }));
        } else if (
          data.error &&
          data.error.includes("Too many login attempts")
        ) {
          // Handle rate limit exceeded
          toast.error(data.error);
          setErrors((prev) => ({
            ...prev,
            general:
              "Account temporarily locked due to too many failed attempts",
          }));
        } else {
          // Generic error handling
          setErrors((prev) => ({
            ...prev,
            general: data.error || "An error occurred during sign in",
          }));
        }
        return;
      }

      // Successful sign-in
      localStorage.setItem("userFullName", data.fullName);
      localStorage.setItem("signedInStatus", "true");
      handleSignedInStatus();
      toast.success("Sign in successful");
      navigate("/");
    } catch (err) {
      setLoading(false);
      // Handle network and other unexpected errors
      toast.error("Unable to connect to the server");
      setErrors((prev) => ({
        ...prev,
        general: "Network error. Please try again later.",
      }));
    }
  };

  return (
    <section className="dark:bg-gray-900 pt-2 md:pt-20 flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700 p-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>

        {errors.general && (
          <p className="text-red-500 text-sm mt-2">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="name@company.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setHidePassword(!hidePassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {hidePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
            disabled={loading}
            className="w-full text-white bg-brandOrange hover:bg-brandOrangeDark focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5"
          >
            {loading ? <Loader text={"Signing In"} /> : "Sign in"}
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link
              to="/sign-up"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
