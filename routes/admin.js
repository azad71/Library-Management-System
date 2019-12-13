const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      // fs = require("fs"),
      // path = require("path"),
      middleware = require("../middleware"),
      User = require("../models/user"),
      Book = require("../models/book"),
      Activity = require("../models/activity"),
      Issue = require("../models/issue"),
      Comment = require("../models/comment");

// importing controller
const adminController = require('../controllers/admin');

router.get("/dashboard", middleware.isAdmin, adminController.getDashboard);

//admin -> dashboard




//admin -> find activities of all users on admin dashboard
router.post("/admin", middleware.isAdmin, (req, res) => {
  User.find({}, (err, users) => {
     if (err) throw new Error("Failed to find users at /admin POST");
     
     Book.find({}, (err, books) => {
        if (err) throw new Error("Failed to find books at /admin POST");
        
        Activity.find({$or : [{"user_id.username" : req.body.searchUser}, {"category" : req.body.searchUser}]})
        .sort({entryTime : 'desc'})
        .exec((err, activities) => {
           if (err) throw new Error("Failed to find activities at /admin GET");
            res.render("admin/index", {
               users : users,
               books : books,
               activities : activities,
               current : 1,
               pages: 0,
            });      
        });
     });
  });
});

//admin -> delete profile
router.delete("/admin/delete-profile", middleware.isAdmin, (req, res) => {
   User.findByIdAndRemove(req.user._id, (err) => {
      if(err) throw new Error("Failed to delete admin at /admin/delete-profile DELETE");
      
      res.redirect("/");
   });
});

//admin book inventory
router.get("/admin/bookInventory/:filter/:value/:page", middleware.isAdmin, (req, res, next) => {
   var perPage = 15;
   var page = req.params.page || 1;
   
   if(req.params.filter == "title") {
      Book
      .find({ "title" : req.params.value} )
      .skip((perPage*page) - perPage)
      .limit(perPage)
      .exec((err, books) => {
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("admin/bookInventory", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
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
            res.render("admin/bookInventory", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
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
            res.render("admin/bookInventory", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
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
            res.render("admin/bookInventory", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
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
            res.render("admin/bookInventory", {
               books : books,
               current : page,
               pages: Math.ceil(count / perPage),
               filter : req.params.filter,
               value : req.params.value,
            });
         });
      });
   }
});

// admin -> show searched books
router.post("/admin/bookInventory/:filter/:value/:page", middleware.isAdmin, (req, res, next) => {
   
   var perPage = 15;
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
            res.render("admin/bookInventory", {
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
            res.render("admin/bookInventory", {
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
            res.render("admin/bookInventory", {
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
         if(err) console.log(err);
         Book.countDocuments().exec((err, count) => {
            if(err) return next(err);
            res.render("admin/bookInventory", {
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

//admin -> show books to be updated
router.get("/admin/book/update/:book_id", middleware.isAdmin, (req, res) => {
   Book.findById(req.params.book_id, (err, foundBook) => {
      if(err) {
         console.log("Failed to find requested book at /admin/books/update/:book_id GET");
         return res.redirect("back");
      }
      res.render("admin/book", {book : foundBook});
   });
});

//admin -> update book
router.post("/admin/book/update/:book_id", middleware.isAdmin, (req, res) => {
  req.body.book.description = req.sanitize(req.body.book.description);
   Book.findByIdAndUpdate(req.params.book_id, req.body.book, (err, updatedBook) => {
      if(err) {
         console.log("Failed to find requested book at  /admin/books/update/:book_id POST");
         return res.redirect("back");
      }
      res.redirect("/admin/bookInventory/all/all/1");
   });
});

//admin -> delete book
router.get("/admin/book/delete/:book_id", middleware.isAdmin, (req, res) => {
   Book.findByIdAndRemove(req.params.book_id, (err, deletedBook) => {
      if(err) {
         console.log("Failed to delete the requested book");
         return res.redirect("back");
      }
      req.flash("success", "A book named " + deletedBook.title + " is just deleted!");
      res.redirect("back");
   });
});

//admin -> users list 
router.get("/admin/users/:page", middleware.isAdmin, (req, res, next) => {
   var perPage = 10;
   var page = req.params.page || 1;
   
   User.find().sort({joined : 'desc'}).skip((perPage*page) - perPage).limit(perPage).exec((err, foundUsers) => {
      if(err) {
         console.log("Failed to find users from db at /admin/users/:page GET");
         return res.redirect("back");
      }
      User.countDocuments().exec((err, count) =>{
         if(err) {
            console.log("Failed to count User at /admin/users/:page GET");
            return next(err);
         }
         res.render("admin/users", {
               users : foundUsers,
               current : page,
               pages: Math.ceil(count / perPage),
         });
      });
   });
});

//admin -> show searched user
router.post("/admin/users/:page", middleware.isAdmin, (req, res, next) => {
   var page = req.params.page || 1;
   
   User.find({$or: [{"firstName" : req.body.searchUser}, {"lastName" : req.body.searchUser},
   {"username" : req.body.searchUser}, {"email" : req.body.searchUser},]})
   .exec((err, foundUsers) => {
      if(err) {
         console.log("Failed to find users from db at /admin/users/:page POST");
         return res.redirect("back");
      } else if(foundUsers.length <= 0) {
         req.flash("error", "Either the search value is inserted incorrectly or user is not found in database");
         return res.redirect("back");
      } 
      res.render("admin/users", {
         users : foundUsers,
         current : page,
         pages: 0,
      });
   });
});


//admin -> flag/unflag user
router.get("/admin/users/flagged/:user_id", middleware.isAdmin, (req, res) => {
   User.findById(req.params.user_id, (err, foundUser) => {
      if(err) {
         console.log("Failed to find users at /admin/users/flagged/:user_id GET");
         return res.redirect("back");
      }
      if(foundUser.violationFlag) {
         foundUser.violationFlag = false;
         foundUser.save();
         req.flash("success", "An user named " + foundUser.firstName + " " + foundUser.lastName + " is just unflagged!");
      } else {
         foundUser.violationFlag = true;
         foundUser.save();
          req.flash("warning", "An user named " + foundUser.firstName + " " + foundUser.lastName + " is just flagged!");
      }
      res.redirect("/admin/users/1");
   });
});

//admin -> show one user
router.get("/admin/users/profile/:user_id", middleware.isAdmin, (req, res) => {
  User.findById(req.params.user_id, (err, foundUser) => {
     if(err) {
        console.log("Failed to find requested user at /admin/users/profile/:user_id GET");
        return res.redirect("back");
     }
     
     Issue.find({"user_id.id" : foundUser._id}, (err, foundIssues) => {
        if(err) {
           console.log("Failed to find issues related to this user at /admin/users/profile/:user_id GET");
           return res.redirect("back");
        }
        Comment.find({"author.id" : foundUser._id}, (err, foundComments) => {
           if(err) {
              console.log("Failed to find comments related to this user at /admin/users/profile/:user_id GET");
              return res.redirect("back");
           }
           
           Activity.find({"user_id.id" : foundUser._id}).sort({entryTime : 'desc'}).exec((err, foundActivities) => {
              if(err) {
                 console.log("Failed to find activities related to this user at /admin/users/profile/:user_id GET");
                 return res.redirect("back");
              }
              res.render("admin/user", {user : foundUser, issues : foundIssues, activities : foundActivities, comments : foundComments});
           }); 
        });
     });
  });
});

//admin -> show all activities of one user
router.get("/admin/users/activities/:user_id", middleware.isAdmin, (req, res) => {
   Activity.find({"user_id.id": req.params.user_id})
         .sort({entryTime: 'desc'})
         .exec((err, foundActivities) => {
            if(err) {
                  console.log("Failed to find all activities related to this user at /admin/users/activities/:user_id GET");
                  return res.redirect("back");
            }
            res.render("admin/activities", {activities : foundActivities});
      });
});

//admin -> show activities by category
router.post("/admin/users/activities/:user_id", middleware.isAdmin, (req, res) => {
   Activity.find({"category" : req.body.category}, (err, foundActivities) => {
      if(err) {
          console.log("Failed to find all activities related to this  at /admin/users/activities/:user_id GET");
         return res.redirect("back");
      }
       res.render("admin/activities", {activities : foundActivities});
   });
});

//admin -> add new book
router.get("/admin/books/add", middleware.isAdmin, (req, res) =>{
   res.render("admin/addBook");
});

router.post("/admin/books/add", middleware.isAdmin, (req, res) => {
   req.body.book.description = req.sanitize(req.body.book.description);
   
   Book.find({"ISBN" : req.body.book.ISBN}, (err, foundBook) => {
      if(err) {
         console.log("Failed to find book at /admin/books/add POST");
         return res.redirect("back");
      }
      
      if(foundBook.length > 0) {
         req.flash("error", "This book already exists in book inventory");
         return res.redirect("back");
      }
      
      Book.create(req.body.book, (err, newBook) => {
         if(err) {
            console.log("Failed to create new book at /admin/books/add POST");
            return res.redirect("back");
         }
         req.flash("success", "A new book named " + newBook.title + " is added to book inventory");
         res.redirect("/admin/bookInventory/all/all/1");
      });
   });
});

//admin -> profile
router.get("/admin/profile", middleware.isAdmin, (req, res) => {
   res.render("admin/profile");
});

//admin -> update profile
router.post("/admin/profile", middleware.isAdmin, (req, res) => {
   User.findByIdAndUpdate(req.user._id, req.body.admin, (err, updatedAdmin) => {
      if(err) throw new Error("Failed to update admin at /admin/profile POST");
      res.redirect("/admin/profile");
   });
});

//admin -> update password
router.put("/admin/update-password", middleware.isAdmin, (req, res) => {
   User.findByUsername(req.user.username, (err, admin) => {
      if(err) throw new Error("Failed to update password at /admin/update-password PUT");
      
      admin.changePassword(req.body.oldPassword, req.body.password, (err) =>{
         if(err) throw new Error("Failed to change password at /admin/update-password PUT");
         admin.save();
         req.flash("success", "Your password is changed recently. Please login again to confirm");
         res.redirect("/adminLogin");
      });
   });
});

//admin -> notifications
router.get("/admin/notifications", (req, res) => {
   res.send("This route is still under development. will be added in next version");
});

module.exports = router;