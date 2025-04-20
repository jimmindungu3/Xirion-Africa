const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyAdminToken = (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });

  jwt.verify(adminToken, JWT_SECRET, (err, admin) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid Token" });

    // Attach the admin object to the request object
    req.admin = admin;
    next();
  });
};

module.exports = verifyAdminToken;
