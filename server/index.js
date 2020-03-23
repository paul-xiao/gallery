const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const config = require('./config')
const logger = require('./utils/logger')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express()
app.use(cookieParser())
mongoose.connect(config.DB).then(() => {
  logger.info('MongoDB is on')
})

const expires = 1000 * 60 * 30 // 30min
const sessionStorage = new MongoStore({mongooseConnection: mongoose.connection})

const sessionOpts = {
   // 设置密钥
 secret: 'gallery',
 // Forces the session to be saved back to the session store
 resave: true,
 // Forces a session that is "uninitialized" to be saved to the store.
 saveUninitialized: true,
 // 设置会话cookie名, 默认是connect.sid
 key: 'gallery_sid',
 store: sessionStorage,
 // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
 cookie: { maxAge: expires * 2, secure: false }
}

app.use(session(sessionOpts))

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

app.get('/dashboard', requireLogin, function(req, res) {
  logger.info('sessionID:', req.sessionID)
  res.send({
    sessionID: req.sessionID,
    Cookies: req.cookies,
    Signed_Cookies: req.signedCookies
  })
});
app.get('/', function(req, res) {
  logger.info('sessionID:', req.sessionID)
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  res.send({
    sessionID: req.sessionID,
    Cookies: req.cookies,
    Signed_Cookies: req.signedCookies
  })
});
app.get('/login', function(req, res) {
  req.session.user = 'paul'
  req.session.save()
  logger.info('sessionID:', req.sessionID)
  res.send({
    sessionID: req.sessionID,
    Cookies: req.cookies,
    Signed_Cookies: req.signedCookies
  })
});
app.get('/logout', function(req, res) {
  req.session.destroy()
  res.send({
    sessionID: req.sessionID,
    Cookies: req.cookies,
    Signed_Cookies: req.signedCookies
  })
});

const userController = require('./controller/user')
app.post('signup', userController.signUp)

















app.listen(config.SERVER.PORT, async (err) => {
  if(err) {
    logger.error(err)
  } else {
    logger.info(`Server runing on: `, `http://127.0.0.1:${config.SERVER.PORT}`)
  }
})