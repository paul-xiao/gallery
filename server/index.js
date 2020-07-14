const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const passport = require('./config/passport')
const upload = require('./utils/upload')
const path = require('path')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' })) // create application/json parser
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
) // // create application/x-www-form-urlencoded parser
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('MongoDB is on')
  })

const expires = 1000 * 60 * 30 // 30min
const sessionStorage = new MongoStore({
  mongooseConnection: mongoose.connection,
})

const sessionOpts = {
  // 设置密钥
  secret: 'gallery', // Forces the session to be saved back to the session store
  resave: false, // Forces a session that is "uninitialized" to be saved to the store.
  saveUninitialized: true, // 设置会话cookie名, 默认是connect.sid
  key: 'gallery_sid',
  store: sessionStorage, // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
  cookie: { maxAge: expires * 2, secure: false },
}

app.use(session(sessionOpts))
// init passport
app.use(passport.initialize())
app.use(passport.session())

//static

app.use(express.static(path.join(__dirname, 'uploads')))

//controller
const userController = require('./controller/user')
const postController = require('./controller/post')
const commentController = require('./controller/comment')

// user
app.post('/user/signup', userController.signUp)
app.post('/user/signin', userController.signIn)
app.post('/user/avatar', upload.single('avatar'), userController.updateAvatar)
app.post('/user/update', userController.updateUserInfo)
app.delete('/user/logout', userController.logOut)
app.get(
  '/user/session',
  passport.authenticateMiddleware(),
  userController.userInfo
)

//posts
app.post('/post/add', upload.array('file', 9), postController.addPost)
app.post('/post/like', postController.toggleLikes) //点赞
app.get('/post/list', postController.getPostList)
app.delete('/post/delete', postController.rmFromPostList)

//comments
app.post('/comment/add', commentController.AddComment)

// server
app.listen(config.SERVER.PORT, async (err) => {
  if (err) {
    logger.error(err)
  } else {
    logger.info(`Server runing on: `, `http://127.0.0.1:${config.SERVER.PORT}`)
  }
})
