const faker = require("faker");

const generateSimpleBook = () => {
  return {
    title: faker.name.title(),
    author: faker.name.title(),
    sumary: faker.random.words(),
    publishedAt: new Date(),
  };
};

const generateCompleteBook = () => {
  return {
    title: faker.name.title(),
    author: faker.name.title(),
    sumary: faker.random.words(),
    publishedAt: new Date(),
    amountOfPages: 100,
    currentReading: true,
    amazonLink: faker.internet.url(),
    avatarLink: faker.image.avatar(),
    amountOfReviews: 1000,
    amountOfRatings: 100,
  };
};

module.exports = {
  generateSimpleBook,
  generateCompleteBook,
};
