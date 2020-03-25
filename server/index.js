const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("./config/passport");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // create application/json parser
app.use(bodyParser.urlencoded({ extended: false })); // // create application/x-www-form-urlencoded parser

mongoose.connect(config.DB).then(() => {
  logger.info("MongoDB is on");
});

const expires = 1000 * 60 * 30; // 30min
const sessionStorage = new MongoStore({
  mongooseConnection: mongoose.connection
});

const sessionOpts = {
  // 设置密钥
  secret: "gallery", // Forces the session to be saved back to the session store
  resave: false, // Forces a session that is "uninitialized" to be saved to the store.
  saveUninitialized: true, // 设置会话cookie名, 默认是connect.sid
  key: "gallery_sid",
  store: sessionStorage, // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
  cookie: { maxAge: expires * 2, secure: false }
};

app.use(session(sessionOpts));
// init passport
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//   console.log(req.session)
//   next()
// })

const userController = require("./controller/user");
app.get("/", function(req, res) {
  res.send("hello");
});
app.post("/signup", userController.signUp);
app.post("/signin", passport.authenticate("local"), userController.signIn);
app.delete("/logout", userController.logOut);

app.get("/session", passport.authenticateMiddleware(), userController.userInfo);
app.get("/about", passport.authenticateMiddleware(), function(req, res) {
  res.send("about");
});

app.listen(config.SERVER.PORT, async err => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Server runing on: `, `http://127.0.0.1:${config.SERVER.PORT}`);
  }
});
