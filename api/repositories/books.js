const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllBooks = async () => {
  const res = await db.query("SELECT * FROM books");
  return res.rows.map((obj) => transformToCamelCase(obj));
};

const getBookById = async (id) => {
  const res = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const searchByQueryString = async (wordsOfueriesStringSearch) => {
  const allBooksStored = await getAllBooks();

  const filterByTitle = allBooksStored.filter((bookStored) => {
    const titleWordsStoredWithoutSpace = bookStored.title.split(" ");

    const isTitleStoredIncludesAtLeastOneWord = titleWordsStoredWithoutSpace.some(
      (wordOfTitle) => wordsOfueriesStringSearch.includes(wordOfTitle)
    );

    return isTitleStoredIncludesAtLeastOneWord;
  });

  return filterByTitle;
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
  searchByQueryString,
};
