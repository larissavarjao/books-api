const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllBooks = async (page) => {
  const res = await db.query("SELECT * FROM books LIMIT 5 OFFSET($1 - 1) * 5", [
    page,
  ]);
  console.log(res.rows);
  return res.rows.map((obj) => transformToCamelCase(obj));
};

const getBookById = async (id) => {
  const res = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const searchByQueryString = async (wordsOfQueriesStringSearch) => {
  const allBooksStored = await getAllBooks();

  if (wordsOfQueriesStringSearch === "") return allBooksStored;

  const filterByTitle = allBooksStored.filter((bookStored) => {
    const titleWordsStoredWithoutSpace = bookStored.title.split(" ");
    const isTitleStoredIncludesAtLeastOneWord = titleWordsStoredWithoutSpace.some(
      (wordOfTitle) =>
        wordsOfQueriesStringSearch.includes(wordOfTitle.toLowerCase())
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
