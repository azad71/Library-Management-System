const mongoose = require("mongoose"),
      Book = require("./models/book"),
      Comment = require("./models/comment"),
      faker = require("faker");

var author = ["William Shakespeare", "Fyodor Dostoevsky", "Leo Tolstoy", "Jonathan Swift", "Johann Wolfgang von Goethe",
              "Jane Austen", "Alan Turing", "Donald Knuth", "Brian Kernighan", "Dennis Ritchie", "Edsger W. Dijkstra",
              "Friedrich Nietzsche", "Albert Camus", "Plato", "Bertrand Russell", "Albert Einstein", "Karl Marx", "Sigmund Freud"
];

var category = ["Computer Science", "Philosphy", "Literature", "Business", "Science"];

mongoose.set('useFindAndModify', false);

function seedDB() {
    for(let i = 0; i < 1000; i++) {
        
        var bookSeed = {
            title : faker.lorem.words(),
            author : author[Math.floor(Math.random() * author.length)],
            ISBN : faker.random.number(),
            stock : Math.floor(Math.random() * 21),
            description : faker.lorem.paragraphs(5),
            category : category[Math.floor(Math.random() * category.length)],
        };
        
        Book.create(bookSeed, (err, bookData) => {
            if(err) {
                console.log(err);
            } else {
                    bookData.save();
            }
        });
    }
}

module.exports = seedDB;