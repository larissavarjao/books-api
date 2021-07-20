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
        .send({ message: "Please fill all the fields to create a author." });
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

  try {
    console.log({id})
    if (id) {
      console.log({id})
      const authorById = await getAuthorById(id);

      return res.status(200).send(authorById);
    }

    const allauthors = await getAllAuthors();
    return res.send(allauthors);
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
      const authorDeleted = await deleteAuthor(id);
      
      return res.status(200).send(authorDeleted);
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

router.put("/authors", async (req, res) => {
  const author = req.body;

  try {
    const authorById = await getAuthorById(author.id);
    if (authorById) {
      const updatedauthor = await updateAuthor(author);

      return res.status(200).send(updatedauthor);
    } else { 
      return res.status(404).send({ message: "Not Found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Please retry later." });
  }
});

module.exports = router;
