const express = require("express");
const { isBookValid } = require("../validators/books");
const { transformToSnakeCase } = require("../utils/cases");
const { insertBook } = require("../repositories/books");

const router = express.Router();

router.post("/books", (req, res) => {
  const newBook = req.body;

  try {
    if (!isBookValid(newBook)) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields to create a book." });
    }

    const snakeCaseBook = transformToSnakeCase(newBook);
    insertBook(snakeCaseBook);
    res.status(201).send(snakeCaseBook);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.get("/books", (req, res) => {});

module.exports = router;
