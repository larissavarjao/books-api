const express = require("express");
const { isBookValid } = require("../validators/books");
const {
  insertBook,
  getBookById,
  getAllBooks,
  deleteBook,
} = require("../repositories/books");

const router = express.Router();

router.post("/books", async (req, res) => {
  const newBook = req.body;

  try {
    if (!isBookValid(newBook)) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields to create a book." });
    }

    const newBookAdded = await insertBook(newBook);
    res.status(201).send(newBookAdded);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.get("/books", async (req, res) => {
  const id = req.query.id;
  const page = req.query.page;

  try {
    if (id) {
      const bookById = await getBookById(id);

      return res.status(200).send(bookById);
    }


    const allBooks = await getAllBooks(page);
    return res.send(allBooks);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.delete("/books", async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
      console.log({id});
      const bookDeleted = await deleteBook(id);
      
      return res.status(200).send(bookDeleted);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.put("/books", async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
      const bookById = await deleteBook(id);
    }

    return res.status(200).send({ sucess: true });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

module.exports = router;
