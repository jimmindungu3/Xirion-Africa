const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInRateLimiter = require("../middleware/signInRateLimiter");
const {
  sendVerificationCode,
  generateVerificationCode,
} = require("../services/sendCode");

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// POST /api/register - Create new user route
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, error: "Passwords don't match." });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already registered" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();

    try {
      // Try to send verification email first before creating user
      const transporterResponse = await sendVerificationCode(
        email,
        verificationCode
      );

      // Check if email was successfully sent
      if (
        transporterResponse.accepted &&
        transporterResponse.accepted.includes(email)
      ) {
        // Only if email was successfully sent, create and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          firstName,
          lastName,
          email,
          phoneNumber,
          verificationCode,
          password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
          success: true,
          message: "User registered successfully. Verification code sent.",
        });
      } else {
        // Email sending failed
        return res.status(400).json({
          success: false,
          message: "Could not send verification code. Invalid email address.",
        });
      }
    } catch (emailError) {
      // Error occurred while sending email
      console.error("Email sending error:", emailError);
      return res.status(400).json({
        success: false,
        message:
          "Could not send verification code. Please check the email address.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/verify-email - Verify user email
router.post("/verify-email", async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        error: "Email and verification code are required.",
      });
    }

    // Find user with matching email and verification code
    const user = await User.findOne({ email, verificationCode });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid verification code or email." });
    }

    // Check if the verification code is expired (30 minutes limit)
    const codeCreatedAt = new Date(user.updatedAt);
    const now = new Date();
    const timeDiff = (now - codeCreatedAt) / (1000 * 60);

    if (timeDiff > 30) {
      return res.status(400).json({
        success: false,
        error: "Verification code has expired. Please request a new one.",
      });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    // Create token after email verification
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const fullName = `${user.firstName} ${user.lastName}`;

    // Set token as HTTP-only
    res.cookie("xirionAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      fullName,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

// POST /api/signin - User sign-in route
router.post("/signin", signInRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, error: "Email and password required." });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, error: "Email not registered" });

    if (user.isVerified === false) {
      return res
        .status(403)
        .json({ success: false, error: "Email registered but not verified" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      // Increment login attempts
      await User.findByIdAndUpdate(user._id, {
        $inc: { loginAttempts: 1 },
      });
      return res
        .status(400)
        .json({ success: false, error: "Incorrect password" });
    }

    // Reset login attempts on successful login
    await User.findByIdAndUpdate(user._id, { loginAttempts: 0 });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const fullName = `${user.firstName} ${user.lastName}`;

    // Set token as HTTP-only
    res.cookie("xirionAuthToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successfully.",
      fullName,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error." });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Server error.", details: error.message });
  }
});

// DELETE /api/user/:email - Delete user by email
router.delete("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error.", details: error.message });
  }
});

module.exports = router;
