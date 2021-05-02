const { camelCase } = require("change-case");

const transformToCamelCase = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((snakeCaseKey) => {
    newObj[camelCase(snakeCaseKey).toString()] = obj[snakeCaseKey];
  });

  return newObj;
};

module.exports = {
  transformToCamelCase,
};
