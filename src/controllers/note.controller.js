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

// 2) POST /api/notes/bulk
const bulkCreateNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return sendResponse(res, 400, false, "notes array is missing or empty");
    }

    const createdNotes = await Note.insertMany(notes);

    return sendResponse(
      res,
      201,
      true,
      `${createdNotes.length} notes created successfully`,
      createdNotes
    );
  } catch (error) {
    if (error.name === "ValidationError") {
      return sendResponse(res, 400, false, error.message);
    }
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 3) GET /api/notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return sendResponse(res, 200, true, "Notes fetched successfully", notes);
  } catch (error) {
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 4) GET /api/notes/:id
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid Object ID");
    }

    const note = await Note.findById(id);

    if (!note) {
      return sendResponse(res, 404, false, "Note not found");
    }

    return sendResponse(res, 200, true, "Note fetched successfully", note);
  } catch (error) {
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 5) PUT /api/notes/:id
const replaceNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid Object ID");
    }

    const note = await Note.findByIdAndUpdate(
      id,
      req.body,
      { new: true, overwrite: true, runValidators: true }
    );

    if (!note) {
      return sendResponse(res, 404, false, "Note not found");
    }

    return sendResponse(res, 200, true, "Note replaced successfully", note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return sendResponse(res, 400, false, error.message);
    }
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 6) PATCH /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid Object ID");
    }

    if (Object.keys(req.body).length === 0) {
      return sendResponse(res, 400, false, "No fields provided to update");
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!note) {
      return sendResponse(res, 404, false, "Note not found");
    }

    return sendResponse(res, 200, true, "Note updated successfully", note);
  } catch (error) {
    if (error.name === "ValidationError") {
      return sendResponse(res, 400, false, error.message);
    }
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 7) DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, "Invalid Object ID");
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return sendResponse(res, 404, false, "Note not found");
    }

    return sendResponse(res, 200, true, "Note deleted successfully", note);
  } catch (error) {
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

// 8) DELETE /api/notes/bulk
const bulkDeleteNotes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return sendResponse(res, 400, false, "ids array is missing or empty");
    }

    const result = await Note.deleteMany({ _id: { $in: ids } });

    return sendResponse(
      res,
      200,
      true,
      `${result.deletedCount} notes deleted successfully`,
      null
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

module.exports = {
  createNote,
  bulkCreateNotes,
  getAllNotes,
  getNoteById,
  replaceNote,
  updateNote,
  deleteNote,
  bulkDeleteNotes,
};
