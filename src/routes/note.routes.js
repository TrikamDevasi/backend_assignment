const express = require("express");
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes, getNoteById, replaceNote, updateNote, deleteNote } = require("../controllers/note.controller");

// 1) POST /api/notes
router.post("/", createNote);

// 2) POST /api/notes/bulk
router.post("/bulk", bulkCreateNotes);

// 3) GET /api/notes
router.get("/", getAllNotes);

// 4) GET /api/notes/:id
router.get("/:id", getNoteById);

// 5) PUT /api/notes/:id
router.put("/:id", replaceNote);

// 6) PATCH /api/notes/:id
router.patch("/:id", updateNote);

// 7) DELETE /api/notes/:id
router.delete("/:id", deleteNote);

module.exports = router;