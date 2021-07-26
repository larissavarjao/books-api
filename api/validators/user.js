const { isValidEmail } = require('../utils/email');

const isNewUserValid = (newUser) => {
  if (!newUser.firstName) {
    return false;
  }

  if (!newUser.email || !isValidEmail(newUser.email)) {
    return false;
  }

  if (newUser.password && newUser.password.length < 7) {
    return false;
  }

  return true;
};

const isUserLoginValid = (email, password) => {
  if (!email) {
    return false;
  }
  if (!password) {
    return false;
  }

  return true;
};

module.exports = { isNewUserValid, isUserLoginValid };