const isBookValid = (book) => {
  if (!book.title || !book.sumary || !book.author || !book.publishedAt) {
    return false;
  }

  return true;
};

const isAuthorValid = (book) => {
  if (!book.firstName || !book.lastName) {
    return false;
  }

  return true;
};

module.exports = { isBookValid, isAuthorValid };
