const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // Destructure fields from the request object
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;

    // Check if all fields are present
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if email is already used by another admin
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Encrypt the password and create new Admin object
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create new object with encrypted password
    const adminObj = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: encryptedPassword,
    };

    // Save new admin object to DB
    const newAdmin = new Admin(adminObj);
    const savedAdmin = await newAdmin.save();

    if (savedAdmin) {
      return res.status(200).json(savedAdmin);
    } else {
      return res
        .status(400)
        .json({ error: "Error saving new admin to database" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = router;
