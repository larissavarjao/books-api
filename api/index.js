const express = require("express");
const app = express();
const cors = require("cors");
const bookRoute = require("./routes/books");
const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bookRoute);

const port = process.env.PORT || 4444;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = { app };
