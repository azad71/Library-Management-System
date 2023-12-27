// importing dependencies
const fs = require("fs");

// importing models
const Book = require("../models/book");
const User = require("../models/user");
const Activity = require("../models/activity");
const Issue = require("../models/issue");
const Comment = require("../models/comment");
const datatablesQuery = require("datatables-query");

// importing utilities
const deleteImage = require("../utils/delete_image");
const { isAdmin } = require("../middleware");

// GLOBAL_VARIABLES
const PER_PAGE = 10;

// admin -> show dashboard working procedure
/*
    1. Get user, book and activity count
    2. Fetch all activities in chunk (for pagination)
    3. Render admin/index
*/
exports.getDashboard = async (req, res, next) => {
  var page = req.query.page || 1;
  try {
    const users_count = await User.find({ isAdmin: false }).countDocuments();
    const books_count = await Book.find().countDocuments();

    res.render("admin/index", {
      users_count: users_count,
      books_count: books_count,
      layout: "activities-layout",
    });
  } catch (err) {
    console.log(err);
  }
};

// admin -> search activities working procedure
/*
    1. Get user and book count
    2. Fetch activities by search query
    3. Render admin/index
    **pagination is not done
*/
exports.postDashboard = async (req, res, next) => {
  const params = req.body;
  try {
    const activity = Activity.find().populate("user_id").lean();
    const query = datatablesQuery(activity);
    const activities = await query.run(params);
    res.json(activities);
  } catch (err) {
    console.log(err);
  }
};

// admin -> delete profile working procedure
/*
    1. Find admin by user_id and remove
    2. Redirect back to /
*/
exports.deleteAdminProfile = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.user._id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// admin -> get book inventory working procedure
/*
    1. Construct search object
    2. Fetch books by search object
    3. Render admin/bookInventory
*/
exports.getAdminBookInventory = async (req, res, next) => {
  try {
    // rendering admin/bookInventory
    res.render("admin/bookInventory", {
      layout: "inventory-layout",
    });
  } catch (err) {
    // console.log(err.messge);
    return res.redirect("back");
  }
};

// admin -> return book inventory by search query working procedure
/*
    same as getAdminBookInventory method
*/
exports.postAdminBookInventory = async (req, res, next) => {
  try {
    let page = req.params.page || 1;
    const filter = req.body.filter.toLowerCase();
    const value = req.body.searchName;

    if (value == "") {
      req.flash(
        "error",
        "Search field is empty. Please fill the search field in order to get a result"
      );
      return res.redirect("back");
    }
    const searchObj = {};
    searchObj[filter] = value;

    // get the books count
    const books_count = await Book.find(searchObj).countDocuments();

    // fetch the books by search query
    const books = await Book.find(searchObj)
      .skip(PER_PAGE * page - PER_PAGE)
      .limit(PER_PAGE);

    // rendering admin/bookInventory
    res.render("admin/bookInventory", {
      books: books,
      current: page,
      pages: Math.ceil(books_count / PER_PAGE),
      filter: filter,
      value: value,
    });
  } catch (err) {
    // console.log(err.message);
    return res.redirect("back");
  }
};

// admin -> get the book to be updated
exports.getUpdateBook = async (req, res, next) => {
  try {
    const book_id = req.params.book_id;
    const book = await Book.findById(book_id);

    res.render("admin/book", {
      book: book,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// admin -> post update book
exports.postUpdateBook = async (req, res, next) => {
  try {
    const description = req.sanitize(req.body.book.description);
    const book_info = req.body.book;
    const book_id = req.params.book_id;

    await Book.findByIdAndUpdate(book_id, book_info);

    res.redirect("/admin/bookInventory/all/all/1");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> delete book
exports.getDeleteBook = async (req, res, next) => {
  try {
    const book_id = req.params.book_id;

    const book = await Book.findById(book_id);
    await book.remove();

    req.flash("success", `A book named ${book.title} is just deleted!`);
    res.redirect("back");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> get user list
exports.getUserList = async (req, res, next) => {
  try {
    res.render("admin/users", { layout: "usertable-layout" });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

exports.getAllUsers = async (req, res, next) => {
  const params = req.body;
  try {
    const user = User.find({ isAdmin: false }).populate("bookIssueInfo").lean();
    const query = datatablesQuery(user);
    const users = await query.run(params);
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

// admin -> show searched user
exports.postShowSearchedUser = async (req, res, next) => {
  try {
    const page = req.params.page || 1;
    const search_value = req.body.searchUser;

    const users = await User.find({
      $or: [
        { firstName: search_value },
        { lastName: search_value },
        { username: search_value },
        { email: search_value },
      ],
    });

    if (users.length <= 0) {
      req.flash("error", "User not found!");
      return res.redirect("back");
    } else {
      res.render("admin/users", {
        users: users,
        current: page,
        pages: 0,
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> flag/unflag user
exports.getFlagUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id);

    if (user.violationFlag) {
      user.violationFlag = false;
      await user.save();
      req.flash(
        "success",
        `An user named ${user.firstName} ${user.lastName} is just unflagged!`
      );
    } else {
      user.violationFlag = true;
      await user.save();
      req.flash(
        "warning",
        `An user named ${user.firstName} ${user.lastName} is just flagged!`
      );
    }

    res.redirect("/admin/users/1");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> show one user
exports.getUserProfile = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const user = await User.findById(user_id);
    const issues = await Issue.find({ "user_id.id": user_id });
    const comments = await Comment.find({ "author.id": user_id });
    const activities = await Activity.find({ "user_id.id": user_id }).sort(
      "-entryTime"
    );

    res.render("admin/user", {
      user: user,
      issues: issues,
      activities: activities,
      comments: comments,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> show all activities of one user
exports.getUserAllActivities = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const activities = await Activity.find({ "user_id.id": user_id }).sort(
      "-entryTime"
    );
    res.render("admin/activities", {
      activities: activities,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> show activities by category
exports.postShowActivitiesByCategory = async (req, res, next) => {
  try {
    const category = req.body.category;
    const activities = await Activity.find({ category: category });

    res.render("admin/activities", {
      activities: activities,
    });
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> delete a user
exports.getDeleteUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const user = await User.findById(user_id);
    await user.remove();

    let imagePath = `images/${user.image}`;
    if (fs.existsSync(imagePath)) {
      deleteImage(imagePath);
    }

    await Issue.deleteMany({ "user_id.id": user_id });
    await Comment.deleteMany({ "author.id": user_id });
    await Activity.deleteMany({ "user_id.id": user_id });

    res.redirect("/admin/users/1");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> add new book
exports.getAddNewBook = (req, res, next) => {
  res.render("admin/addBook");
};

exports.postAddNewBook = async (req, res, next) => {
  try {
    const book_info = req.body.book;
    book_info.description = req.sanitize(book_info.description);

    const isDuplicate = await Book.find(book_info);

    if (isDuplicate.length > 0) {
      req.flash("error", "This book is already registered in inventory");
      return res.redirect("back");
    }

    const new_book = new Book(book_info);
    await new_book.save();
    req.flash(
      "success",
      `A new book named ${new_book.title} is added to the inventory`
    );
    res.redirect("/admin/bookInventory/all/all/1");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> get profile
exports.getAdminProfile = (req, res, next) => {
  res.render("admin/profile");
};

// admin -> update profile
exports.postUpdateAdminProfile = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const update_info = req.body.admin;

    await User.findByIdAndUpdate(user_id, update_info);

    res.redirect("/admin/profile");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};

// admin -> update password
exports.putUpdateAdminPassword = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const old_password = req.body.oldPassword;
    const new_password = req.body.password;

    const admin = await User.findById(user_id);
    await admin.changePassword(old_password, new_password);
    await admin.save();

    req.flash(
      "success",
      "Your password is changed recently. Please login again to confirm"
    );
    res.redirect("/auth/admin-login");
  } catch (err) {
    console.log(err);
    res.redirect("back");
  }
};
