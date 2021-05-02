const faker = require("faker");

const generateSimpleBook = () => {
  return {
    title: faker.name.title(),
    description: faker.random.words(),
    subtitle: faker.random.words(),
    author: faker.name.title(),
  };
};

const generateCompleteBook = () => {
  return {
    title: faker.name.title(),
    description: faker.random.words(),
    subtitle: faker.random.words(),
    author: faker.name.title(),
    audioUrl: faker.internet.url(),
    imageUrl: faker.image.imageUrl(),
    readUrl: faker.internet.url(),
  };
};

module.exports = {
  generateSimpleBook,
  generateCompleteBook,
};
