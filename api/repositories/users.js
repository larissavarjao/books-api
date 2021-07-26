const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");
const { transformToCamelCase } = require("../utils/cases");
const { bcryptPassword } = require("../utils/auth");

const getUserById = async (id) => {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return transformToCamelCase(res.rows[0]);
};

const getByEmail = async (email) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows && res.rows.length > 0 && res.rows[0];
};

const insertUser = async (newUser) => {
  console.log(newUser)
  const encryptedPassword = await bcryptPassword(newUser.password);
  const query =
    "INSERT INTO users(first_name, last_name, user_type, email, password)" +
    "VALUES($1, $2, $3, $4, $5)" +
    "RETURNING *";
  const values = [
    newUser.firstName,
    newUser.lastName,
    newUser.userType,
    newUser.email,
    encryptedPassword
  ];

  const res = await db.query(query, values);

  console.log({user: res.rows[0]})
  return transformToCamelCase(res.rows[0]);
};

const generateAuthToken = (id) => {
  console.log({id})
  const token = jwt.sign({ id }, process.env.JWT_SECRET || "");

  return token;
};

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  getByEmail,
  getUserById,
  insertUser,
  generateAuthToken,
  comparePassword
}