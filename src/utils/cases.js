const { snakeCase } = require("change-case");

const transformToSnakeCase = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((camelCaseKey) => {
    newObj[snakeCase(camelCaseKey).toString()] = obj[camelCaseKey];
  });

  return newObj;
};

module.exports = {
  transformToSnakeCase,
};
