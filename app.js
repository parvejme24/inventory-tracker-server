// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Initialize app
dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(xssClean()); // Protect against XSS attacks
app.use(mongoSanitize()); // Prevent NoSQL injection attacks

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Static file serving (if needed)
app.use(express.static(path.join(__dirname, "public")));

// Routes
// app.use("/api/products", productRoutes); // Route for product-related endpoints
// app.use("/api/users", userRoutes); // Route for user-related endpoints

// Test Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Inventory Tracker API!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Export app
module.exports = app;
