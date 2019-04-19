const multer = require("multer");

const middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in first");
    res.redirect("/");
};

middleware.upload = multer({
      limits: {
        fileSize: 4 * 1024 * 1024,
      }
    });

module.exports = middleware;