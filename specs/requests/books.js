const request = require("supertest");
const { app } = require("../../api/index");

const createBook = (book) => {
  return request(app).post("/books").send(book);
};

const getAllBooks = () => {
  return request(app).get(`/books`);
};

const getBookById = (id) => {
  return request(app).get(`/books/${id}`);
};

const getBookSearch = (searchQueryString) => {
  return request(app).get(`/books/`).query(searchQueryString);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getBookSearch,
};
