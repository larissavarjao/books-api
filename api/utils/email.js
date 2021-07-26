const validator = require('validator');

const isValidEmail = (email) => {
  return validator.isEmail(email);
};

module.exports = {
  isValidEmail,
};