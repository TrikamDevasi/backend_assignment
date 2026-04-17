const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    _id:      { type: Number, required: true },
    title:    { type: String, required: [true, "Title is required"] },
    content:  { type: String, required: [true, "Content is required"] },
    category: { type: String, enum: ["work", "personal", "study"], default: "personal" },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);