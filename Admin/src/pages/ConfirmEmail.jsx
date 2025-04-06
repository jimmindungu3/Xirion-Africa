import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setverificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const email = location.state?.email || localStorage.getItem("email"); // Get email from state/localstorage sent from signup page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verificationCode, email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("email");
        toast.success("Your email has been confirmed")
        navigate("/sign-in");
      } else {
        setError(data.error || "Invalid code. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center mt-12 md:mt-24">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md p-6 border">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center">
          Confirm Your Email
        </h1>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter the code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              value={verificationCode}
              onChange={(e) => setverificationCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-none focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Enter code"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full text-white bg-brandOrange hover:bg-orange-600 focus:ring-1 
            focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Didn't receive a code?{" "}
          <button
            className="text-brandOrange font-semibold hover:underline"
            onClick={() => alert("Resend code logic here")}
          >
            Resend Code
          </button>
        </p>
      </div>
    </section>
  );
};

export default ConfirmEmail;
