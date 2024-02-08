const mongoose = require("mongoose");
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      return: true,
    },
    author: {
      type: String,
      return: true,
    },
    publishYear: {
      type: String,
      return: true,
    },
  },
  { timestamps: true }
);
const Book = mongoose.model("Books", bookSchema);
module.exports = { Book };
