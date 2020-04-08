const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    multer = require('multer'),
    uid = require('uid');
    path = require("path"),
    sanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    localStrategy = require("passport-local"),
    fs = require("fs"),
    flash = require("connect-flash"),
    resize = require("./resize"),
    User = require("./models/user"),
    Activity = require("./models/activity"),
    Issue = require("./models/issue"),
    Comment = require("./models/comment"),
    userRoutes = require("./routes/users"),
    adminRoutes = require("./routes/admin"),
    bookRoutes = require("./routes/books"),
    authRoutes = require("./routes/auth"),
    middleware = require("./middleware"),
    Seed = require('./seed');

 //Seed(1000);

 
// app config
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(sanitizer());

// db config
const url = process.env.db_url || "mongodb://localhost/LMS1";
mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true,});

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

// configure image file storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, `${uid()}-${file.originalname}`);
    }
});

const filefilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: filefilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
   res.locals.currentUser   = req.user;
   res.locals.error         = req.flash("error");
   res.locals.success       = req.flash("success");
   res.locals.warning       = req.flash("warning"); 
   next();
});


//Routes
app.use(userRoutes);
app.use(adminRoutes);
app.use(bookRoutes);
app.use(authRoutes);

function deleteImage(imagePath, next) {
    fs.unlink(imagePath, (err) => {
      if (err) {
         console.log("Failed to delete image at delete profile");
         return next(err);
      }
  });
}

app.listen(3000, () =>{
   console.log(`LMS server is running at: http://localhost:3000`); 
});
    