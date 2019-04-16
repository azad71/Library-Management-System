const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    multer = require("multer"),
    path = require("path"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    fs = require("fs"),
    flash = require("connect-flash"),
    resize = require("./resize"),
    User = require("./models/user"),
    Book = require("./models/book"),
    Comment = require("./models/comment"),
    Issue = require("./models/issue"),
    Activity = require("./models/activity"),
    seedDB = require("./SeedDB");

// seedDB();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost/LMS1", {useNewUrlParser : true});
mongoose.set('useFindAndModify', false);


//PASSPORT CONFIGURATION

app.use(require("express-session") ({ //must be declared before passport session and initialize method
    secret : "Wubba lubba dub dub",
    saveUninitialized : false,
    resave : false
}));

app.use(passport.initialize()); //must declared before passport.session()
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error         = req.flash("error");
   res.locals.success       = req.flash("success");
   next();
});


const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

app.get('/', (req, res) => {
   res.render("landing"); 
});

//ADMIN ROUTES
//admin login handler
app.get("/adminLogin", (req, res) => {
   res.render("admin/adminLogin"); 
});

app.post("/adminLogin", (req, res) => {
   res.redirect("/admin");
});

// app.get("/admin", (req, res) => {
//    res.render("admin/index");
// });

//admin logout handler
app.get("/adminLogout", (req, res) => {
   res.redirect("/");
});

//admin activity
app.get("/admin/activities", (req, res) => {
   res.render("admin/activities");
});

//admin book inventory
app.get("/admin/bookInventory", (req, res) => {
   res.render("admin/bookInventory");
});

//admin -> users list 
app.get("/admin/users", (req, res) => {
   res.render("admin/users");
});

//admin -> home
app.get("/adminHome", (req, res) => {
   res.render("admin/index");
});

//admin -> profile
app.get("/admin/profile", (req, res) => {
   res.render("admin/profile");
});

//admin -> details
app.get("/admin/details", (req, res) => {
   res.render("admin/details");
});

//admin -> notifications
app.get("/admin/notification", (req, res) => {
   res.render("admin/notification");
});

//USER ROUTES
//user -> landing page
app.get("/user/:page", isLoggedIn, (req, res) => {
   const perPage = 5;
   var page = req.params.page || 1;
   
   User.findById(req.user._id, (err, newUser) => {
      // console.log(newUser);
      if(err) {
         console.log(err);
         return res.redirect("/");
      } else {
         Activity.find({"user_id.id": req.user._id})
         .sort('-entryTime')
         .skip((perPage*page) - perPage)
         .limit(perPage)
         .exec((err, foundActivity) => {
            if (err) throw err;
            Activity.countDocuments().exec((err, count) => {
               if(err) throw err;
               //  req.flash('success', 'Hello, ' + req.user.username + ' Welcome to Dashboard');
               res.render("user/index", {
               user : newUser,
               current : page,
               pages: Math.ceil(count / perPage),
               activity : foundActivity,
               });
            }); 
         });
      }
   });
});

//user login handler
app.get("/userLogin", (req, res) => {
   res.render("user/userLogin");
});

app.post("/userLogin", passport.authenticate("local", {
        successRedirect : "/user/1",
        failureRedirect : "/userLogin",
    }), (req, res)=> {
});

//user sign up handler
app.get("/signUp", (req, res) => {
   res.render("user/userSignup");
});

app.post("/signUp", (req, res) => {
   const newUser = new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      username : req.body.username,
      email : req.body.email,
      gender : req.body.gender,
      address : req.body.address,
   });
   
   // console.log(newUser);
   
   User.register(newUser, req.body.password, (err, user) =>{
      // console.log(user);
      if(err) {
         // console.log(err);
         return res.render("user/userSignup");
      }
      passport.authenticate("local")(req, res, function() {
        
         res.redirect("/user/1");
      });
   });
});

//user -> user logout handler
app.get("/userLogout", (req, res) => {
   req.logout();
   res.redirect("/");
});

//user -> profile
app.get("/user/:page/profile", isLoggedIn, (req, res) => {
   res.render("user/profile");
});

// user -> upload photo
app.post("/user/:page/image", isLoggedIn, upload.single("image"), (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
     if(err) throw err;
     const imagePath = path.join(__dirname, '/public/image/profile/');
    if(foundUser.image) {
       fs.unlink(imagePath+foundUser.image, (err) => {
          if (err) throw err;
       });
    }
    
    const fileUpload = new resize(imagePath);
    if (!req.file) {
       res.status(401).json({error: 'Please provide an image'});
     }
    const filename = fileUpload.save(req.file.buffer);
    foundUser.image = filename;
    foundUser.save();
    
    const activity = {
            category : "Update/Upload Photo",
            user_id : {
               id : req.user._id,
             }
          };
    Activity.create(activity, (err, newActivity) => {
       if(err) {
          console.log("Failed to log activity at upload photo");
          return res.redirect("back");
       }
       res.redirect("/user/1/profile");
    });
    
   });
});

//user -> update password
app.put("/user/1/update-password", isLoggedIn, (req, res) => {
   User.findByUsername(req.user.username, (err, foundUser) => {
      if(err) throw err;
      
      foundUser.changePassword(req.body.oldPassword, req.body.password, (err)=> {
         if(err) {
            // req.flash("error", "Old password is incorrct");
            res.redirect("back");
         }
         foundUser.save();
         
         const activity = {
            category : "Update Password",
            user_id : {
               id : req.user._id,
             }
          };
         
         Activity.create(activity, (err, newAcitvity) => {
            if(err) {
               console.log("Failed to log activity at update password");
               res.redirect("back");
            }
            res.redirect("/userLogin");
         });
      });
   }); 
});

//user -> update profile
app.put("/user/1/update-profile", isLoggedIn, (req, res) => {
   const userUpdateInfo = {
     "firstName" : req.body.firstName,
     "lastName" : req.body.lastName,
     "email" : req.body.email,
     "gender" : req.body.gender,
     "address" : req.body.address,
   };
   //userUpdateInfo can be refactored further by implementing user[firstName], user[lastName] thus req.body.user
   User.findByIdAndUpdate(req.user._id, userUpdateInfo, (err) => {
      if (err) {
         console.log("Error at updating profile finding requested user in User Schema");
         return res.redirect("back");
      }
      const activity = {
         category : "Update Profile",
         user_id : {
            id : req.user._id,
          }
       };
      
      Activity.create(activity, (err, newAcitvity) => {
         if(err) {
            console.log("Failed to log activity at update profile");
            return res.redirect("back");
         }
         res.redirect("back");
      });
   });
});

//user -> delete profile
app.delete("/user/1/delete-profile", isLoggedIn, (req, res) => {
    const imagePath = path.join(__dirname, '/public/image/profile/'+req.user.image);
    if(req.user.image) {
       fs.unlink(imagePath, (err) => {
          if (err) {
             console.log("Failed to delete image at delete profile");
             return res.redirect("back");
          }
       });
    }
   User.findByIdAndRemove(req.user._id, (err, foundUser) => {
      if(err) {
         console.log("Failed to find user at delete profile");
         return res.redirect("back");
      } else {
         
         Issue.deleteMany({"user_id.id" : foundUser._id}, (err, foundIssues) => {
            if(err) {
               console.log("Failed to find all issues related to this user at delete profile");
               return res.redirect("back");
            } else {
               Comment.deleteMany({"author.id" : foundUser._id}, (err, foundComments) => {
                  if(err) {
                     console.log("Failed to find all comments related to this user at delete profile");
                     return res.redirect("back");
                  } else {
                     Activity.deleteMany({"user_id.id" : foundUser._id}, (err, foundActivities) => {
                        if(err) {
                           console.log("Failed to find all activities of this user at delete profile");
                           return res.redirect("back");
                        } else {
                           res.redirect("/");
                        }
                     });
                  }
               });
            }
         });
      }
   });
});


//user -> notification
app.get("/user/1/notification", (req, res) => {
   res.render("user/notification");
});

//user -> issue a book
app.post("/books/:book_id/issue/:user_id", isLoggedIn, (req, res)=> {
   Book.findById(req.params.book_id, (err, foundBook) => {
      if(err) {
         console.log("Error at finding book");
         return res.redirect("back");
      } else {
         User.findById(req.params.user_id, (err, foundUser) => {
            if(err) {
               console.log("Error at finding user");
               return res.redirect("back");
            } else {
               // console.log(foundBook);
               const issueInfo = {
                book_info : {
                   id : foundBook._id,
                   title : foundBook.title,
                   author : foundBook.author,
                   ISBN : foundBook.ISBN,
                   category : foundBook.category,
                   stock : foundBook.stock,
                },
                
                user_id : {
                   id : foundUser._id,
                   username : foundUser.username,
                }, 
             };
             
            Issue.create(issueInfo, (err, newIssuedBook) => {
               if(err) {
                  console.log("Error at issuing book");
                  return res.redirect("back");
               } else {
                foundUser.bookIssueInfo.push(newIssuedBook.book_info.id);
                foundBook.stock -= 1;
                newIssuedBook.book_info.stock = foundBook.stock;
                foundUser.save();
                foundBook.save();
                
                const acitvity = {
                   info : {
                      id : foundBook._id,
                      title : foundBook.title,
                   },
                   category : "Issue",
                   time : {
                      id : newIssuedBook._id,
                      issueDate : newIssuedBook.book_info.issueDate,
                      returnDate : newIssuedBook.book_info.returnDate,
                   },
                   user_id : {
                      id : foundUser._id,
                   }
                };
                Activity.create(acitvity, (err, newActivity) => {
                   if(err) {
                      throw err;
                   } else {
                      res.redirect("/books/all/all/1");
                   }
                });
               }
            });
            }
         });   
      }
   });
});

//user -> show return-renew page
app.get("/books/return-renew", isLoggedIn, (req, res) => {
   
   Issue.find({"user_id.id" : req.user._id}, (err, foundUser) => {
      if(err) {
         console.log(err);
      } else {
         // console.log(foundUser);
          res.render("user/return-renew", {user : foundUser});
      }
   });
});

//user -> renew book
app.post("/books/:book_id/renew",isLoggedIn, (req, res) => {
   Issue.find({"user_id.id" : req.user._id, "book_info.id" : req.params.book_id} , (err, foundBook) => {
      if(err) {
         console.log(err);
      } else {
         var time = foundBook[0].book_info.returnDate.getTime();
         foundBook[0].book_info.returnDate = time + 7*24*60*60*1000;
         foundBook[0].book_info.isRenewed = true;
         foundBook[0].save();
         
         
         const acitvity = {
                   info : {
                      id : foundBook[0]._id,
                      title : foundBook[0].book_info.title,
                   },
                   category : "Renew",
                   time : {
                      id : foundBook[0]._id,
                      issueDate : foundBook[0].book_info.issueDate,
                      returnDate : foundBook[0].book_info.returnDate,
                   },
                   user_id : {
                      id : req.user._id,
                   }
                };
                
         Activity.create(acitvity, (err, newAcitvity) => {
            if(err) throw err;
            res.redirect("/books/return-renew");
         });
      }
   });
});

//user -> return book
app.post("/books/:book_id/return", (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
    if(err) {
       console.log("Error at finding the user");
       return res.redirect("back");
    } else {
       
      var tempId = [];
            
        foundUser.bookIssueInfo.forEach(book => {
         tempId.push(String(book._id));
        });
        
      var pos = tempId.indexOf(req.params.book_id);
      foundUser.bookIssueInfo.splice(pos, 1);
      foundUser.save();
      
      Book.findById(req.params.book_id, (err, foundBook) => {
         if(err) {
            console.log(err);
            return res.redirect("back");
         } else {
            foundBook.stock += 1;
            foundBook.save();
             Issue.findOneAndRemove({"user_id.id" : req.user._id, "book_info.id" : req.params.book_id}, (err, deletedBook) => {
               if(err) {
                  console.log(err);
                  return res.redirect("back");
               } else {
                  const acitvity = {
                   info : {
                      id : deletedBook.book_info.id,
                      title : deletedBook.book_info.title,
                   },
                   category : "Return",
                   time : {
                      id : deletedBook._id,
                      issueDate : deletedBook.book_info.issueDate,
                      returnDate : deletedBook.book_info.returnDate,
                   },
                   user_id : {
                      id : req.user._id,
                   }
                };
                
                  Activity.create(acitvity, (err, newAcitvity) => {
                     if(err) throw err;
                     else {
                       
                        res.redirect("/books/return-renew");
                     }
                  });
               }
            });
         } 
      });
    }
  });
});

//user -> book details
app.get("/books/details/:book_id", (req, res) => {
  Book.findById(req.params.book_id).populate("comments").exec((err, foundBook) => {
     if(err) {
        console.log(err);
        return res.redirect("/books/all/all/1");
     } else {
      //  console.log(foundBook)
        res.render("user/bookDetails", {book : foundBook});
     }
  });
});

//user -> create new comment
app.post("/books/details/:book_id", isLoggedIn, (req, res) => {
   // console.log(req.params.book_id);
   Book.findById(req.params.book_id, (err, book) => {
      // console.log(book);
      if(err) {
         console.log("Oops! An error occred finding the requested book by ID");
         return res.redirect("/books/all/all/1");
      } else {
         Comment.create(req.body.comment, (err, comment) => {
            // console.log(req.body.comment);
            if(err) {
               console.log("Oops! An error occured finding the requested comment associated with this book");
               return res.redirect("/books/all/all/1");
            } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               book.comments.push(comment._id);
               book.save();
               res.redirect("/books/details/"+req.params.book_id);
            }
         });
      }
   });
});

//user -> update existing comment
app.post("/books/details/:book_id/:comment_id", isLoggedIn, (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedDetails) => {
      if(err) {
         console.log("Oops! an error occured commenting on this book");
         return res.redirect("/books/details/"+req.params.book_id);
      } else {
         res.redirect("/books/details/"+req.params.book_id);
      }
   });
});

//user -> delete existing comment
app.delete("/books/details/:book_id/:comment_id", isLoggedIn, (req, res)=> {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           res.redirect("back");
       } else {
         //  req.flash("success", "Comment deleted");
           res.redirect("/books/details/" + req.params.book_id);
       }
    }); 
});

//COMMON ROUTES
//Browse books
app.get("/books/:filter/:value/:page", (req, res, next) => {
   var perPage = 16;
   var page = req.params.page || 1;
   
   // console.log(req.params.filter, req.params.value);
   
   if(req.params.filter == "title") {
      Book
      .find({ "title" : req.params.value} )
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
         // console.log(foundBooks[0]);
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
         // console.log(foundBooks[0]);
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
         // console.log(foundBooks[0]);
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
         // console.log(foundBooks[0]);
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
app.post("/books/:filter/:value/:page", (req, res, next) => {
   
   var perPage = 16;
   var page = req.params.page || 1;
   // console.log(req.params.filter, req.params.value);
   
   if(req.body.searchName == "") {
      res.redirect("back");
   } else if(req.body.filter == "By Title") {
    Book
      .find({title : req.body.searchName})
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
         // console.log(foundBooks[0]);
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
         // console.log(foundBooks[0]);
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


//middleware
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}



app.listen(process.env.PORT, process.env.IP, () =>{
   console.log("LMS server is running..."); 
});
    