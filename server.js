const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  multer = require("multer"),
  uid = require("uid"),
  path = require("path"),
  sanitizer = require("express-sanitizer"),
  methodOverride = require("method-override"),
  flash = require("connect-flash");

const session = require("./services/session");
// passport = require("passport"),
// localStrategy = require("passport-local"),
// MongoStore = require("connect-mongodb-session")(session),
// User = require("./models/user");

const config = require("./config");
const routes = require("./routes");

const Seed = require("./seed");

// uncomment below line for first time to seed database;
// Seed(60);

// if (process.env.NODE_ENV !== "production") require("dotenv").config();

// app config
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(sanitizer());

// db config
mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

//PASSPORT CONFIGURATION

// const store = new MongoStore({
//   uri: process.env.DB_URL,
//   collection: "sessions",
// });

// app.use(
//   session({
//     //must be declared before passport session and initialize method
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
//     store,
//   })
// );

app.use(session);

app.use(flash());

// app.use(passport.initialize()); //must declared before passport.session()
// app.use(passport.session());

// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// configure image file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uid()}-${file.originalname}`);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: filefilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  next();
});

//Routes
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
