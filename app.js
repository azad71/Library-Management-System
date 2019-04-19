const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    path = require("path"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    fs = require("fs"),
    flash = require("connect-flash"),
    resize = require("./resize"),
    User = require("./models/user"),
    Activity = require("./models/activity"),
   //  seedDB = require("./SeedDB"),
    userRoutes = require("./routes/users"),
    adminRoutes = require("./routes/admin"),
    bookRoutes = require("./routes/books"),
    indexRoutes = require("./routes/index"),
    middleware = require("./middleware");

// seedDB();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
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
app.use(flash());

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

//Routes
app.use(userRoutes);
app.use(adminRoutes);
app.use(bookRoutes);
app.use(indexRoutes);

//photo upload
app.post("/user/:page/image", middleware.isLoggedIn, middleware.upload.single("image"), (req, res) => {
  User.findById(req.user._id, (err, foundUser) => {
     if(err) throw err;
     const imagePath = path.join(__dirname, '/public/image/profile/');
    // const imagePath = '/home/ubuntu/workspace/App/public/image/profile';
      if(foundUser.image) {
       fs.unlink(imagePath+foundUser.image, (err) => {
          if (err) {
              console.log("Failed to delete previous photo at photo upload");
              return res.redirect("back");
          }
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


app.listen(process.env.PORT, process.env.IP, () =>{
   console.log("LMS server is running..."); 
});
    