const isBookValid = (book) => {
  if (!book.title || !book.subtitle || !book.description || !book.author) {
    return false;
  }

  return true;
};

module.exports = { isBookValid };
