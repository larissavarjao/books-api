const { query } = require("../../api/db");

const clearDB = async () => {
  await query("DELETE FROM books WHERE id IS NOT NULL;");
};

module.exports = {
  clearDB,
};
