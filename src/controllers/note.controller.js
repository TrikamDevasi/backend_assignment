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

// 1) POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return sendResponse(res, 400, false, "title and content are required fields");
    }

    const note = new Note({ title, content, category, isPinned });
    await note.save();

    return sendResponse(res, 201, true, "Note created successfully", note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return sendResponse(res, 400, false, error.message);
    }
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

module.exports = {
  createNote,
};
