const express = require("express");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;

const router = express.Router();

// POST /api/admin/register => CREATE new admin route
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

    // Check if email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use" });
    }

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
      return res.status(400).json({ error: "Error saving new admin" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

// POST /api/admin/signin => Admin SIGNIN route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and passowrd exist in request body
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if admin with incoming email exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      const passwordsMatch = await bcrypt.compare(
        password,
        existingAdmin.password
      );
      if (passwordsMatch) {
        console.log(existingAdmin._id);
        // Create jwt cookie here and send it with response to client
        const token = jwt.sign(
          { id: existingAdmin._id, role: existingAdmin.role },
          JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        return res
          .cookie("adminToken", token, {
            httpOnly: true,
            secure: NODE_ENV === "PRODUCTION",
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000, // 1 Day in milliseconds
          })
          .status(200)
          .json({ message: "Signin successful" });
      }
      if (!passwordsMatch)
        return res.status(400).json({ message: "Incorrect password" });
    } else {
      return res.status(400).json({ message: "Email not registered" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
