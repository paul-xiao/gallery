var passport = require("passport");

var LocalStrategy = require("passport-local");

var UserModel = require("../model/User"); // 实体数据库模块
const logger = require("../utils/logger");

// 用户名密码验证策略
/**

* @param username 用户输入的用户名

* @param password 用户输入的密码

* @param done 验证验证完成后的回调函数，由passport调用

*/

passport.use(
  new LocalStrategy(
    function(username, password, done) {
      UserModel.findOne({ username: username })
        .then(function(result) {
          if (result != null) {
            // check if password matches
            if (result.comparePassword(password)) {
              logger.success(`user ${username} is on`)
              return done(null, result);
            } else {
              logger.error("wrong password")
              return done(null, false, { message:"wrong password"});
            }
          } else {
            logger.error("user not exsit");
            return done(null, false, { message:"user not exsit"});
          }
        })
        .catch(function(err) {
          logger.error(err.message);
          return done(null, false, { message:err.message});
        });
    }
  )
);

// serializeUser 用户登录验证成功以后将会把用户的数据存储到 session 中

passport.serializeUser(function(user, done) {
  done(null, user);
});

// deserializeUser 每次请求的时将从 session 中读取用户对象，并将其封装到 req.user

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

// 这是封装了一个中间件函数到 passport 中，可以在需要拦截未验证的用户的请求的时候调用

passport.authenticateMiddleware = function authenticationMiddleware() {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send({
        status: false,
        message: 'Unauthorized'
      });
      logger.error("Unauthorized");
    }
  };
};

module.exports = passport;
