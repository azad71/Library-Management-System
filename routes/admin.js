const express = require("express"),
      router = express.Router();


//admin login handler
router.get("/adminLogin", (req, res) => {
   res.render("admin/adminLogin"); 
});

router.post("/adminLogin", (req, res) => {
   res.redirect("/admin");
});

router.get("/admin", (req, res) => {
   res.render("admin/index");
});

//admin logout handler
router.get("/adminLogout", (req, res) => {
   res.redirect("/");
});

//admin activity
router.get("/admin/activities", (req, res) => {
   res.render("admin/activities");
});

//admin book inventory
router.get("/admin/bookInventory", (req, res) => {
   res.render("admin/bookInventory");
});

//admin -> users list 
router.get("/admin/users", (req, res) => {
   res.render("admin/users");
});

//admin -> home
router.get("/adminHome", (req, res) => {
   res.render("admin/index");
});

//admin -> profile
router.get("/admin/profile", (req, res) => {
   res.render("admin/profile");
});

//admin -> details
router.get("/admin/details", (req, res) => {
   res.render("admin/details");
});

//admin -> notifications
router.get("/admin/notification", (req, res) => {
   res.render("admin/notification");
});

module.exports = router;