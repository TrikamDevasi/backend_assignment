const mongoose = require("mongoose");
const Note = require("../models/note.model");

// Helper to format responses
const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

module.exports = {
  // Endpoints will be added one by one
};
