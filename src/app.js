require("dotenv").config();
const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/note.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON requests

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format or empty body",
      data: null,
    });
  }
  next();
});

// Routes
app.use("/api/notes", noteRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    data: null,
  });
});

module.exports = app;