const express = require("express");
const { isAuthorValid } = require("../validators/books");
const {
  insertAuthor,
  getAuthorById,
  getAllAuthors,
  deleteAuthor,
  updateAuthor
} = require("../repositories/author");

const router = express.Router();

router.post("/authors", async (req, res) => {
  const newAuthor = req.body;

  try {
    if (!isAuthorValid(newAuthor)) {
      return res
        .status(400)
        .send({ message: "Please fill all the fields to create a book." });
    }

    const newAuthorAdded = await insertAuthor(newAuthor);
    res.status(201).send(newAuthorAdded);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.get("/authors", async (req, res) => {
  const id = req.query.id;
  const page = req.query.page;

  try {
    console.log({id})
    if (id) {
      console.log({id})
      const bookById = await getAuthorById(id);

      return res.status(200).send(bookById);
    }


    const allBooks = await getAllAuthors(page);
    return res.send(allBooks);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.delete("/authors", async (req, res) => {
  const id = req.query.id;

  try {
    if (id) {
      console.log({id});
      const bookDeleted = await deleteAuthor(id);
      
      return res.status(200).send(bookDeleted);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.put("/authors", async (req, res) => {
  const book = req.body;

  try {
    const bookById = await getAuthorById(book.id);
    if (bookById) {
      const updatedBook = await updateAuthor(book);

      return res.status(200).send(updatedBook);
    } else { 
      return res.status(404).send({ message: "Not Found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

module.exports = router;
