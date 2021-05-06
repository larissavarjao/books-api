const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

console.log(process.env);
console.log(pool);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
