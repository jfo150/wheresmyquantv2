const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const sessionSecret = process.env.SESSION_SECRET;

const sessionMiddleware = session({
  secret: sessionSecret, 
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
});

module.exports = sessionMiddleware;
