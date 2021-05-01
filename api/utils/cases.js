const { snakeCase, camelCase } = require("change-case");

const transformToSnakeCase = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((camelCaseKey) => {
    newObj[snakeCase(camelCaseKey).toString()] = obj[camelCaseKey];
  });

  return newObj;
};

const transformToCamelCase = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((snakeCaseKey) => {
    newObj[camelCase(snakeCaseKey).toString()] = obj[snakeCaseKey];
  });

  return newObj;
};

module.exports = {
  transformToSnakeCase,
  transformToCamelCase,
};
