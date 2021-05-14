const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const keys = require('../config/keys');

let store = new MongoDBStore({
    uri: keys.DB_URL,
    collection: "authSessions",
});

const opts = {
    key: "_sesTkn",
    secret: keys.SESSION_SECRET,
    store,
    resave: true,
    saveUninitialized: false,
    cookie: { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 },
};

module.exports = session(opts);