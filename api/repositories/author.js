const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllAuthors = async (page) => {
  const res = await db.query("SELECT * FROM authors", [
    page,
  ]);
  return res.rows.map((obj) => transformToCamelCase(obj));
};

const getAuthorById = async (id) => {
  const res = await db.query("SELECT * FROM authors WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const insertAuthor = async (newBook) => {
  const query =
    "INSERT INTO authors(first_name, last_name, pseudo, fortune)" +
    "VALUES($1, $2, $3, $4)" +
    "RETURNING *";
  const values = [
    newBook.firstName,
    newBook.lastName,
    newBook.pseudo,
    newBook.fortune || 0,
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

const updateAuthor = async (book) => {
  // first_name, last_name, pseudo, fortune
  const query =
    "UPDATE authors SET first_name = $1, last_name = $2, pseudo = $3, fortune = $4" +
    "WHERE id = $5 RETURNING *";
  const values = [
    newBook.firstName,
    newBook.lastName,
    newBook.pseudo,
    newBook.fortune || 0,
    book.id
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
