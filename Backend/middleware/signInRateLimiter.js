const rateLimit = require("express-rate-limit");

// 15 Min lock-out after 5 failed attempts
const signInRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 5, // 5 attempts per window
  standardHeaders: true, // Return rate limit info in headers
  message: {
    success: false,
    error: "Too many login attempts. Try again after 15 minutes.",
  },
});

module.exports = signInRateLimiter;
