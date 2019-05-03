//Importing modules
const express = require("express"),
      router = express.Router(),
      passport = require("passport"),
      middleware = require("../middleware");

//Importing models
const User = require("../models/user"),
      Activity = require("../models/activity"),
      Book = require("../models/book"),
      Issue = require("../models/issue"),
      Comment = require("../models/comment");

//user -> landing page
router.get("/user/:page", middleware.isLoggedIn, (req, res) => {
   const perPage = 5;
   var page = req.params.page || 1;
   
   User.findById(req.user._id, (err, newUser) => {
      // console.log(newUser);
      if(err) {
         console.log(err);
         return res.redirect("/");
      } else {
         Activity.find({"user_id.id": req.user._id})
         .sort({entryTime : 'desc'})
         .skip((perPage*page) - perPage)
         .limit(perPage)
         .exec((err, foundActivity) => {
            if (err) throw err;
            Activity.countDocuments().exec((err, count) => {
               if(err) throw err;
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
router.get("/userLogin", (req, res) => {
   res.render("user/userLogin");
});

router.post("/userLogin", passport.authenticate("local", {
        successRedirect : "/user/1",
        failureRedirect : "/userLogin",
    }), (req, res)=> {
});

//user sign up handler
router.get("/signUp", (req, res) => {
   res.render("user/userSignup");
});

router.post("/signUp", (req, res) => {
   
   const newUser = new User({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      username : req.body.username,
      email : req.body.email,
      gender : req.body.gender,
      address : req.body.address,
   });
   
   User.register(newUser, req.body.password, (err, user) =>{
      if(err) {
         return res.render("user/userSignup");
      }
      passport.authenticate("local")(req, res, ()=> {
        
        res.redirect("/user/1");
      });
   });
});

//user -> user logout handler
router.get("/userLogout", (req, res) => {
   req.logout();
   res.redirect("/");
});

//user -> profile
router.get("/user/:page/profile", middleware.isLoggedIn, (req, res) => {
   res.render("user/profile");
});

//user -> update password
router.put("/user/1/update-password", middleware.isLoggedIn, (req, res) => {
   User.findByUsername(req.user.username, (err, foundUser) => {
      if(err) throw err;
      
      foundUser.changePassword(req.body.oldPassword, req.body.password, (err)=> {
         if(err) throw new Error("IncorrectPasswordError: Password or username is incorrect");
         foundUser.save();
         
         const activity = {
            category : "Update Password",
            user_id : {
               id : req.user._id,
               username : req.user.username,
             }
          };
         
         Activity.create(activity, (err, newAcitvity) => {
            if(err) {
               console.log("Failed to log activity at update password");
               res.redirect("back");
            }
            req.flash("success", "Your password is recently updated. Please log in again to confirm");
            res.redirect("/userLogin");
         });
      });
   }); 
});

//user -> update profile
router.put("/user/1/update-profile", middleware.isLoggedIn, (req, res) => {
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
            username : req.user.username,
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


//user -> notification
router.get("/user/1/notification", (req, res) => {
   res.render("user/notification");
});

//user -> issue a book
router.post("/books/:book_id/issue/:user_id", middleware.isLoggedIn, (req, res)=> {
   if(req.user.violationFlag) {
      req.flash("error", "You are flagged for violating rules/delay on returning books/paying fines. Untill the flag is lifted, You can't issue any books");
      return res.redirect("back");
   }
   if(req.user.bookIssueInfo.length >= 5) {
      req.flash("warning", "You can't issue more than 5 books at a time");
      return res.redirect("back");
   }
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
                      username : foundUser.username,
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
router.get("/books/return-renew", middleware.isLoggedIn, (req, res) => {
   
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
router.post("/books/:book_id/renew", middleware.isLoggedIn, (req, res) => {
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
                      username : req.user.username,
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
router.post("/books/:book_id/return", middleware.isLoggedIn, (req, res) => {
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
                      username : req.user.username,
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
router.get("/books/details/:book_id", (req, res) => {
  Book.findById(req.params.book_id).populate("comments").exec((err, foundBook) => {
     if(err) {
        console.log(err);
        return res.redirect("/books/all/all/1");
     } else {
         console.log(foundBook);
        res.render("user/bookDetails", {book : foundBook});
     }
  });
});

//user -> create new comment
router.post("/books/details/:book_id", middleware.isLoggedIn, (req, res) => {
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
               
               const activity = {
                   info : {
                      id : book._id,
                      title : book.title,
                   },
                   category : "Comment",
                   user_id : {
                      id : req.user._id,
                      username : req.user.username,
                   }
                };
                
                Activity.create(activity, (err, newActvity) => {
                   if(err) {
                      console.log("Failed to create activities at /books/details/:book_id POST");
                      return res.redirect("back");
                   }
                   res.redirect("/books/details/"+req.params.book_id);
                });
            }
         });
      }
   });
});

//user -> update existing comment
router.post("/books/details/:book_id/:comment_id", middleware.isLoggedIn, (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedDetails) => {
      if(err) {
         console.log("Oops! an error occured commenting on this book");
         return res.redirect("back");
      } else {
         Book.findById(req.params.book_id, (err, book) => {
            if(err) {
              console.log("Failed to find book at /books/details/:book_id/:comment_id POST");
              return res.redirect("back");
            }
            const activity = {
                   info : {
                      id : book._id,
                      title : book.title,
                   },
                   category : "Update Comment",
                   user_id : {
                      id : req.user._id,
                      username : req.user.username,
                   }
                };
            Activity.create(activity, (err, newActvity) => {
               if(err) {
                 console.log("Failed to find book at /books/details/:book_id/:comment_id POST");
                 return res.redirect("back");
               }
               res.redirect("/books/details/"+req.params.book_id);
            });
         });
      }
   });
});

//user -> delete existing comment
router.delete("/books/details/:book_id/:comment_id", middleware.isLoggedIn, (req, res)=> {
   Comment.findByIdAndRemove(req.params.comment_id, function(err) {
       if(err) {
           res.redirect("back");
       } else {
           Book.findById(req.params.book_id, (err, book) => {
              if(err) res.redirect("back");
              
              const activity = {
                   info : {
                      id : book._id,
                      title : book.title,
                   },
                   category : "Delete Comment",
                   user_id : {
                      id : req.user._id,
                      username : req.user.username,
                   }
                };
                
                Activity.create(activity, (err, newActivity) => {
                   if(err) {
                      console.log("Failed to create activity at /books/details/:book_id/:comment_id DELETE");
                      return res.redirect("back");
                   }
                    res.redirect("/books/details/" + req.params.book_id);
                });
           });
       }
    }); 
});

module.exports = router;