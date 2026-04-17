const express = require("express");
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes, getNoteById } = require("../controllers/note.controller");

// 1) POST /api/notes
router.post("/", createNote);

// 2) POST /api/notes/bulk
router.post("/bulk", bulkCreateNotes);

// 3) GET /api/notes
router.get("/", getAllNotes);

// 4) GET /api/notes/:id
router.get("/:id", getNoteById);

module.exports = router;