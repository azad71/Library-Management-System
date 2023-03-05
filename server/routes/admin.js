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

//admin -> dashboard
router.get("/admin", middleware.isAdmin, adminController.getDashboard);

//admin -> find activities of all users on admin dashboard
router.post("/admin", middleware.isAdmin, adminController.postDashboard);

//admin -> delete profile
router.delete("/admin/delete-profile", middleware.isAdmin, adminController.deleteAdminProfile);

//admin book inventory
router.get("/admin/bookInventory/:filter/:value/:page", middleware.isAdmin, adminController.getAdminBookInventory);

// admin -> show searched books
router.post("/admin/bookInventory/:filter/:value/:page", middleware.isAdmin, adminController.postAdminBookInventory);

//admin -> show books to be updated
router.get("/admin/book/update/:book_id", middleware.isAdmin, adminController.getUpdateBook);

//admin -> update book
router.post("/admin/book/update/:book_id", middleware.isAdmin, adminController.postUpdateBook);

//admin -> delete book
router.get("/admin/book/delete/:book_id", middleware.isAdmin, adminController.getDeleteBook);

//admin -> users list 
router.get("/admin/users/:page", middleware.isAdmin, adminController.getUserList);

//admin -> show searched user
router.post("/admin/users/:page", middleware.isAdmin, adminController.postShowSearchedUser);

//admin -> flag/unflag user
router.get("/admin/users/flagged/:user_id", middleware.isAdmin, adminController.getFlagUser);

//admin -> show one user
router.get("/admin/users/profile/:user_id", middleware.isAdmin, adminController.getUserProfile);

//admin -> show all activities of one user
router.get("/admin/users/activities/:user_id", middleware.isAdmin, adminController.getUserAllActivities);

//admin -> show activities by category
router.post("/admin/users/activities/:user_id", middleware.isAdmin, adminController.postShowActivitiesByCategory);

// admin -> delete a user
router.get("/admin/users/delete/:user_id", middleware.isAdmin, adminController.getDeleteUser);

//admin -> add new book
router.get("/admin/books/add", middleware.isAdmin, adminController.getAddNewBook);

router.post("/admin/books/add", middleware.isAdmin, adminController.postAddNewBook);

//admin -> profile
router.get("/admin/profile", middleware.isAdmin, adminController.getAdminProfile);

//admin -> update profile
router.post("/admin/profile", middleware.isAdmin, adminController.postUpdateAdminProfile);

//admin -> update password
router.put("/admin/update-password", middleware.isAdmin, adminController.putUpdateAdminPassword);

// //admin -> notifications
// router.get("/admin/notifications", (req, res) => {
//    res.send("This route is still under development. will be added in next version");
// });

module.exports = router;