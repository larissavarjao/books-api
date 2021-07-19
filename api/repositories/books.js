const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");

const getAllBooks = async (page) => {
  const res = await db.query("SELECT * FROM books", [
    page,
  ]);
  return res.rows.map((obj) => transformToCamelCase(obj));
};

const getBookById = async (id) => {
  const res = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const searchByQueryString = async (wordsOfQueriesStringSearch) => {
  const allBooksStored = (await db.query("SELECT * FROM books")).rows;

  const filterByTitle = allBooksStored.filter((bookStored) => {
    const titleWordsStoredWithoutSpace = bookStored.title.split(" ");

    const isTitleStoredIncludesAtLeastOneWord = titleWordsStoredWithoutSpace.some(
      (wordOfTitle) => {
        const lowerCaseWordsOfQueriesStringSearch = wordsOfQueriesStringSearch.map(
          (word) => word.toLowerCase()
        );
        return lowerCaseWordsOfQueriesStringSearch.includes(
          wordOfTitle.toLowerCase()
        );
      }
    );

    return isTitleStoredIncludesAtLeastOneWord;
  });

  return filterByTitle;
};

const insertBook = async (newBook) => {
  const query =
    "INSERT INTO books(title, author, sumary, amount_of_pages, current_reading, amazon_link," +
    " avatar_link, published_at, amount_of_reviews, amount_of_ratings)" +
    "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)" +
    "RETURNING *";
  const values = [
    newBook.title,
    newBook.author,
    newBook.sumary,
    newBook.amountOfPages || 0,
    newBook.currentReading || false,
    newBook.amazonLink || null,
    newBook.avatarLink || null,
    newBook.publishedAt || new Date(),
    newBook.amountOfReviews || null,
    newBook.amountOfRatings || null,
  ];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

const deleteBook = async (id) => {
  const query =
    "DELETE FROM books WHERE ID = $1 RETURNING *;"
  const values = [id];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

const updateBook = async (book) => {
  const query =
    "UPDATE books SET title = $1, author = $2, sumary = $3, amount_of_pages = $4, current_reading = $5, amazon_link = $6," +
    " avatar_link = $7, published_at = $8, amount_of_reviews = $9, amount_of_ratings = $10" +
    "WHERE id = $11 RETURNING *";
  const values = [
    book.title,
    book.author,
    book.sumary,
    book.amountOfPages || 0,
    book.currentReading || false,
    book.amazonLink || null,
    book.avatarLink || null,
    book.publishedAt || new Date(),
    book.amountOfReviews || null,
    book.amountOfRatings || null,
    book.id
  ];

  const res = await db.query(query, values);

  return transformToCamelCase(res.rows[0]);
};

module.exports = {
  getAllBooks,
  getBookById,
  insertBook,
  deleteBook,
  updateBook
};
