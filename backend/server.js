const express = require("express");
const cors = require("cors");
require("dotenv").config();

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const { getStatusResponse } = require("./utils/statusResponse");

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Global Middleware =====
app.use(cors());
app.use(express.json()); // parses incoming JSON request bodies
app.use(logger); // logs method + URL for every request

// ===== Routes =====
app.get("/", (req, res) => {
  res.status(200).json({ message: "Express backend is running. Try /api/status" });
});

app.get("/api/status", (req, res) => {
  res.status(200).json(getStatusResponse());
});

app.use("/api/users", userRoutes);

// ===== 404 handler (unknown routes) =====
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ===== Global Error Handler (must be last) =====
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});