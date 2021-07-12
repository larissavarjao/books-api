const isBookValid = (book) => {
  if (!book.title || !book.sumary || !book.author || !book.publishedAt) {
    return false;
  }

  return true;
};

module.exports = { isBookValid };
