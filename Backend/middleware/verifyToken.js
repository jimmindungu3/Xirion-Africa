// Updated verifyAdminToken middleware
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
  const adminToken = req.cookies.adminToken;

  // Debug line to help troubleshoot
  // console.log("Cookie received:", req.cookies);

  if (!adminToken) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(adminToken, JWT_SECRET);

    // Attach the admin object to the request object
    req.admin = decodedToken;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyAdminToken;
