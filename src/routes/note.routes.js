const express = require("express");
const router = express.Router();
const { createNote } = require("../controllers/note.controller");

// 1) POST /api/notes
router.post("/", createNote);

module.exports = router;