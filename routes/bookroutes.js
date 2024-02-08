const express = require("express");
const router = express.Router();
const { Book } = require("../model/bookModel");

// response home route
router.get("/", (req, res) => {
  return res.status(200).send("<h1>Wealcome to mern project</h1>");
});
// route for get all books from database
router.get("/all", async (req, res) => {
  try {
    const book = await Book.find();
    if (book) {
      res.status(200).send({ coutn: book.length, data: book });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(201).send({ message: "your info in empty" });
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      if (book) {
        console.log(book);
        res.status(201).send({ message: newBook });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// single book router
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    console.log(book);
    res.status(200).send({ data: book });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// router for update/edit
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rejult = await Book.findByIdAndUpdate(id, req.body);
    if (!rejult) {
      return res.status(201).send({ message: "Book not found" });
    }
    return res.status(201).send({ message: "Book update succesfully" });

    res.status(501).send({ data: book });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// delet all books
router.delete("/allbooks", async (req, res) => {
  try {
    const rejult = await Book.find().deleteMany();
    if (!rejult) {
      return res.status(404).send({ message: "all book nots delet" });
    }
    return res.status(501).send({ message: "all book delet" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// delet route single book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rejult = await Book.findByIdAndDelete(id);
    if (!rejult) {
      return res.status(200).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book delet succesfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
