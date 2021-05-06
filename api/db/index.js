const { Client } = require("pg");
const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

client.connect();

module.exports = {
  query: (text, params) => client.query(text, params),
};
