// importing modules
const express = require("express"),
      router = express.Router(),
      middleware = require("../middleware");

// importing controller
const userController = require('../controllers/user');

// user -> dashboard
router.get("/user/:page", middleware.isLoggedIn, userController.getUserDashboard);

// user -> profile
router.get("/user/:page/profile", middleware.isLoggedIn, userController.getUserProfile);

//user -> upload image
router.post("/user/1/image", middleware.isLoggedIn, userController.postUploadUserImage);

//user -> update password
router.put("/user/1/update-password", middleware.isLoggedIn, userController.putUpdatePassword);

//user -> update profile
router.put("/user/1/update-profile", middleware.isLoggedIn, userController.putUpdateUserProfile);

//user -> notification
router.get("/user/1/notification", middleware.isLoggedIn, userController.getNotification);

//user -> issue a book
router.post("/books/:book_id/issue/:user_id", middleware.isLoggedIn, userController.postIssueBook);

//user -> show return-renew page
router.get("/books/return-renew", middleware.isLoggedIn, userController.getShowRenewReturn);

//user -> renew book
router.post("/books/:book_id/renew", middleware.isLoggedIn, middleware.isLoggedIn, userController.postRenewBook);

// user -> return book

router.post("/books/:book_id/return", middleware.isLoggedIn, userController.postReturnBook);

//user -> create new comment
router.post("/books/details/:book_id/comment", middleware.isLoggedIn, userController.postNewComment);

//user -> update existing comment
router.post("/books/details/:book_id/:comment_id", middleware.isLoggedIn, userController.postUpdateComment);

//user -> delete existing comment
router.delete("/books/details/:book_id/:comment_id", middleware.isLoggedIn, userController.deleteComment);

// user -> delete user account
router.delete("/user/1/delete-profile", middleware.isLoggedIn, userController.deleteUserAccount);

module.exports = router;