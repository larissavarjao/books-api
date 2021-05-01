const isBookValid = (book) => {
  if (!book.title || !book.subtitle || !book.description) {
    return false;
  }

  return true;
};

module.exports = { isBookValid };
