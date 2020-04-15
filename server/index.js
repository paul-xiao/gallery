const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require("./config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const multer = require('multer')

const upload = multer()
const app = express();

app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb',extended: true })); // create application/json parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: false })); // // create application/x-www-form-urlencoded parser

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
const postController = require("./controller/post");
app.get("/", function(req, res) {
  res.send("hello");
});
app.post("/user/signup", userController.signUp);
app.post("/user/signin", userController.signIn);
app.post("/user/update", userController.updateUserInfo);
app.delete("/user/logout", userController.logOut);
app.delete("/user/delete/:id", userController.deleteUser);
app.get("/user/session", passport.authenticateMiddleware(), userController.userInfo);

// post
app.post("/post/add", upload.array('file', 9), postController.addPost)
app.get("/post", postController.getAllPosts)
app.delete("/post/delete/:id", postController.deletePostByID)

// comment like
app.post('comments/:id', (req, res) => {

  // login check

})

app.post('like/:id', (req, res) => {

 // login check
 // like + 1 -1
})





app.post("/test/:id", function(req, res) {
  console.log(req.body.name)
  console.log(req.params)
  console.log(req.query)
  res.send('ok')
})

app.listen(config.SERVER.PORT, async err => {
  if (err) {
    logger.error(err);
  } else {
    logger.info(`Server runing on: `, `http://127.0.0.1:${config.SERVER.PORT}`);
  }
});