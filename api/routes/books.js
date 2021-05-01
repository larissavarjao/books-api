const express = require("express");
const { isBookValid } = require("../validators/books");
const { insertBook } = require("../repositories/books");

const router = express.Router();

router.post("/books", async (req, res) => {
  const newBook = req.body;

  try {
    if (!isBookValid(newBook)) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields to create a book." });
    }

    // const snakeCaseBook = transformToSnakeCase(newBook);
    const newBookAdded = await insertBook(newBook);
    console.log({ newBookAdded });
    res.status(201).send(newBookAdded);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.get("/books", (req, res) => {});

module.exports = router;
