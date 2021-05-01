const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllBooks = async () => {
  return await db.query("SELECT * FROM books").rows;
};

const getBookById = async (id) => {
  return await db.query("SELECT * FROM books WHERE id = $1", [id]);
};

const insertBook = async (newBook) => {
  const query =
    "INSERT INTO books(title, description, subtitle, author, audio_url, read_url, image_url)" +
    "VALUES($1, $2, $3, $4, $5, $6, $7)" +
    "RETURNING *";
  const values = [
    newBook.title,
    newBook.description,
    newBook.subtitle,
    newBook.author,
    newBook.audioUrl,
    newBook.readUrl,
    newBook.imageUrl,
  ];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
};
