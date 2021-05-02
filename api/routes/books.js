const express = require("express");
const { isBookValid } = require("../validators/books");
const {
  insertBook,
  getBookById,
  getAllBooks,
  searchByQueryString,
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

    // const snakeCaseBook = transformToSnakeCase(newBook);
    const newBookAdded = await insertBook(newBook);
    console.log({ newBookAdded });
    res.status(201).send(newBookAdded);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.get("/books/:id?", async (req, res) => {
  const id = req.params.id;
  const querySearch = req.query.search;

  try {
    if (id) {
      const bookById = await getBookById(id);

      return res.status(200).send(bookById);
    }

    if (querySearch) {
      const searched = await searchByQueryString(querySearch);
      return res.status(200).send(searched);
    }

    const allBooks = await getAllBooks();
    return res.send(allBooks);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

module.exports = router;
