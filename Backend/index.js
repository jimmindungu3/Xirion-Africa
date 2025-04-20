const express = require("express");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

// Use middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://xirion-africa.vercel.app",
      "https://admin-xirion-africa.vercel.app",
    ],
    credentials: true,
  })
);

// Import routes
const productRoutes = require("./routes/products");
const adminRoutes = require("./routes/admins");
const usersRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

// Use routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);

// DB Connection
mongoose
  .connect(DB_URI)
  .then(() => {
    // Start server on successful connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "We're up!!" });
});
