const Book = require("./models/book.model");
const nGrams = require("./utils/nGrams");
const faker = require("faker");
const category = ["Science", "Biology", "Physics", "Chemistry", "Novel", "Travel", "Cooking", "Philosophy", "Mathematics", "Ethics", "Technology", "History"];

const author = [];
for (let i = 0; i < 12; i++) {
  author.push(faker.name.findName());
}
async function seed(limit) {
  for (let i = 0; i < 12; i++) {
    author.push(faker.name.findName());
  }
  for (let i = 0; i < limit; i++) {
    let index1 = Math.floor(Math.random() * Math.floor(11));
    let index2 = Math.floor(Math.random() * Math.floor(11));
    try {
      let title = faker.lorem.words(4);
      let searchTitle = nGrams(title);
      const book = new Book({
        title,
        ISBN: `${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(4)}-${faker.random.alphaNumeric(4)}`,
        stock: 10,
        author: author[index2],
        description: faker.lorem.paragraphs(3),
        category: category[index1],
        searchTitle: [...new Set(searchTitle.split(" "))].join(),
      });
      //   let errors = await book.validate();

      //   console.log(errors);
      await book.save();
    } catch (err) {
      console.log(err);
      console.log("Error at creating books");
    }
  }
}

module.exports = seed;
