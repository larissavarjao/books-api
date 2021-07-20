const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllAuthors = async () => {
  const res = await db.query("SELECT * FROM authors");
  return res.rows.map((obj) => transformToCamelCase(obj));
};

const getAuthorById = async (id) => {
  const res = await db.query("SELECT * FROM authors WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const insertAuthor = async (newAuthor) => {
  const query =
    "INSERT INTO authors(first_name, last_name, pseudo, fortune, biography, books_published)" +
    "VALUES($1, $2, $3, $4, $5, $6)" +
    "RETURNING *";
  const values = [
    newAuthor.firstName,
    newAuthor.lastName,
    newAuthor.pseudo,
    newAuthor.fortune || 0,
    newAuthor.biography,
    newAuthor.booksPublished || 0
  ];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

const deleteAuthor = async (id) => {
  const query =
    "DELETE FROM authors WHERE ID = $1 RETURNING *;"
  const values = [id];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

const updateAuthor = async (author) => {
  const query =
    "UPDATE authors SET first_name = $1, last_name = $2, pseudo = $3, fortune = $4, biography = $5, books_published = $6" +
    "WHERE id = $7 RETURNING *";
  const values = [
    author.firstName,
    author.lastName,
    author.pseudo,
    author.fortune || 0,
    author.biopgraphy,
    author.booksPublished || 0,
    author.id
  ];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  insertAuthor,
  deleteAuthor,
  updateAuthor
};
