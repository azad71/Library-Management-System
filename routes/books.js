const express = require("express"),
      router = express.Router();


// Importing models
const Book = require("../models/book");


// Browse books
router.get("/books/:filter/:value/:page", (req, res, next) => {
   var perPage = 16;
   var page = req.params.page || 1;
   
   // console.log(req.params.filter, req.params.value);
   
   if(req.params.filter == "title") {
      Book
      .find({ "title" : req.params.value} )
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
               user : req.user,
            });
         });
      });
   } else if(req.params.filter == "author") {
      Book
      .find({ "author" : req.params.value})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
               user : req.user,
            });
         });
      });
   } else if(req.params.filter == "category") {
      Book
      .find({ "category" : req.params.value} )
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
               user : req.user,
            });
         });
      });
   } else if(req.params.filter == "ISBN") {
      Book
      .find({ "ISBN" : req.params.value} )
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
               user : req.user,
            });
         });
      });
   } else {
      Book
      .find({})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
               user : req.user,
            });
         });
      });
   }
});



//Book Search
router.post("/books/:filter/:value/:page", (req, res, next) => {
   
   var perPage = 16;
   var page = req.params.page || 1;
   // console.log(req.params.filter, req.params.value);
   
   if(req.body.searchName == "") {
      req.flash("error", "Search field is empty. Please fill the search field in order to get a result");
      res.redirect("back");
   } else if(req.body.filter == "By Title") {
    Book
      .find({title : req.body.searchName})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : "title",
               value : req.body.searchName,
               user : req.user,
            });
         });
      });  
   } else if(req.body.filter == "By Category") {
      Book
      .find({category : req.body.searchName})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : "category",
               value : req.body.searchName,
               user : req.user,
            });
         });
      });  
   } else if(req.body.filter == "By Author") {
      Book
      .find({author : req.body.searchName})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : "author",
               value : req.body.searchName,
               user : req.user,
            });
         });
      });  
   } else {
      Book
      .find({ISBN : req.body.searchName})
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         // console.log(foundBooks[0]);
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("books", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : "ISBN",
               value : req.body.searchName,
               user : req.user,
            });
         });
      });  
   } 
});

module.exports = router;