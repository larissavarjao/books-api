const { Client } = require("pg");
const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

var connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const client = new Client({
  connectionString: connectionString,
});

client.connect();

module.exports = {
  query: (text, params) => client.query(text, params),
};
