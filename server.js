const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

const morgan = require("morgan");
const formidable = require("express-formidable");

const config = require("./config");
const routes = require("./routes");

const Seed = require("./seed");

// uncomment below line for first time to seed database;
// Seed(6000);

// app config
app.use("/media", express.static(__dirname + "/public"));
app.use(formidable({ multiples: true }));
app.use(morgan("dev"));

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

//Routes
app.use(routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
