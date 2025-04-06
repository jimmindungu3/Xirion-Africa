import React, { useState } from "react";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to send reset email.");

      setMessage(
        "A password reset code has been sent to your email. The code will be valid for 30 minutes"
      );
      setCodeSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode, newPassword }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to reset password.");

      setMessage(
        "Your password has been successfully reset. You can now log in."
      );
      setCodeSent(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 md:mt-32 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          {codeSent ? "Reset Password" : "Recover Password"}
        </h2>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {!codeSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter your email, and we'll send you a reset code.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandOrange"
              required
            />
            <button
              type="submit"
              className={`w-full bg-brandOrange text-white font-semibold py-2 px-4 rounded transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-brandOrangeDark"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter the code sent to your email and your new password.
            </p>
            <input
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              placeholder="Enter reset code"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandOrange"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandOrange"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brandOrange"
              required
            />
            <button
              type="submit"
              className={`w-full bg-brandOrange text-white font-semibold py-2 px-4 rounded transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-brandOrangeDark"
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
