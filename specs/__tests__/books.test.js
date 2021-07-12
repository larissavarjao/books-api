const { clearDB } = require("../setup");
const {
  generateSimpleBook,
  generateCompleteBook,
} = require("../generators/books");
const {
  createBook,
  getAllBooks,
  getBookById,
  getBookSearch,
} = require("../requests/books");

describe("Books test cases", () => {
  let bookOne;
  let bookTwo;

  beforeAll(async () => {
    await clearDB();
  });

  it("Get all books with empty database should return 0 values", async () => {
    const response = await getAllBooks();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it("create post should return return 201 and the correct values", async () => {
    const response = await createBook(generateSimpleBook());
    bookOne = response.body;

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(bookOne.title);
    expect(response.body.sumary).toBe(bookOne.sumary);
    expect(response.body.author).toBe(bookOne.author);
    expect(response.body.publishedAt).toBe(bookOne.publishedAt);
    expect(response.body.avatarLink).toBeNull();
    expect(response.body.amazonLink).toBeNull();
    expect(response.body.amountOfReviews).toBeNull();
    expect(response.body.amountOfRatings).toBeNull();
  });

  it("Get all books should return only one value", async () => {
    const response = await getAllBooks();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("Get book by id should return the correct values", async () => {
    const response = await getBookById(bookOne.id);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(bookOne.title);
    expect(response.body.sumary).toBe(bookOne.sumary);
    expect(response.body.author).toBe(bookOne.author);
    expect(response.body.publishedAt).toBe(bookOne.publishedAt);
    expect(response.body.avatarLink).toBeNull();
    expect(response.body.amazonLink).toBeNull();
    expect(response.body.amountOfReviews).toBeNull();
    expect(response.body.amountOfRatings).toBeNull();
  });

  it("create post with complete book should return return 201 and the correct values", async () => {
    const response = await createBook(generateCompleteBook());
    bookTwo = response.body;

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(bookTwo.title);
    expect(response.body.sumary).toBe(bookTwo.sumary);
    expect(response.body.author).toBe(bookTwo.author);
    expect(response.body.subtitle).toBe(bookTwo.subtitle);
    expect(response.body.imageUrl).toBe(bookTwo.imageUrl);
    expect(response.body.readUrl).toBe(bookTwo.readUrl);
    expect(response.body.audioUrl).toBe(bookTwo.audioUrl);
  });

  it("Get all books should return only one value", async () => {
    const response = await getAllBooks();

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });


  it("Should not create with empty object", async () => {
    const response = await createBook({});

    expect(response.status).toBe(400);
  });

  it("Should not create with missing title", async () => {
    const response = await createBook({
      subtitle: "subtitle",
      author: "author",
      sumary: "sumary",
    });

    expect(response.status).toBe(400);
  });

  it("Should not create with missing sumary", async () => {
    const response = await createBook({
      subtitle: "subtitle",
      author: "author",
      title: "title",
    });

    expect(response.status).toBe(400);
  });

  it("Should not create with missing author", async () => {
    const response = await createBook({
      subtitle: "subtitle",
      title: "title",
      sumary: "sumary",
    });

    expect(response.status).toBe(400);
  });

  it("Should not create with missing subtitle", async () => {
    const response = await createBook({
      title: "title",
      author: "author",
      sumary: "sumary",
    });

    expect(response.status).toBe(400);
  });
});
