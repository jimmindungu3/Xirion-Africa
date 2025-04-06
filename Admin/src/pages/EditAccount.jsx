import React, { useState } from "react";

const EditAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated account details:", formData);
    // Add API call logic here
  };

  const inputStyles =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-none focus:outline-none focus:ring-1 focus:ring-orange-500";

  return (
    <div className="flex items-center justify-center pt-2 md:pt-20 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Edit Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={inputStyles}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={inputStyles}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={inputStyles}
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className={inputStyles}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-brandOrange font-semibold text-white py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-400 font-semibold text-white py-2 px-4 rounded hover:bg-gray-500"
              onClick={() => console.log("Cancel edits")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
