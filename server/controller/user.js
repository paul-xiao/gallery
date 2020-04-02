const User = require("../model/User");
const logger = require('../utils/logger')
const passport = require("../config/passport");


/**
 * [user signUp]
 * @param {String} username
 * @param {String} password
 */
exports.signUp = (req, res) => {
  console.log(req.isAuthenticated())
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  User.findOne(
    {
      username: req.body.username
    },
    (err, example) => {
      if (err) console.log(err);
      if (example) {
        res.send({
          message: "User already exist"
        });
      } else {
        newUser
          .save()
          .then(data => {
            res.json({
              message: "Successful created new user."
            });
          })
          .catch(err => {
            res.status(500).send({
              message: err.message
            });
          });
      }
    }
  );
};

/**
 * [signIn]
 * @param {String} username
 * @param {String} password
 */

exports.signIn = function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.send({
        status: false,
        message: info.message
      });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({
        status: true,
        message: 'login successed'
      });
    });
  })(req, res, next);

}
/**
 * [userInfo]
 * @param {String} username
 * @param {String} password
 */


exports.userInfo = (req, res) => {
  const username  = req.user.username
  User.findOne(
    {
      username: username
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) {
        const {username, avatar, intro, region, nickname, createdAt} = result
        res.send({
          status: true,
          username,
          avatar,
          intro,
          region,
          nickname,
          createdAt
        });
      }
    })
};

/**
 * [signIn]
 * @param none
 */
exports.logOut = (req, res) => {
  req.session.destroy();
  res.send({ result: 'OK', message: 'Session destroyed' });
  logger.info('Session destroyed')

}

/**
 * [update]
 * @param {String} username
 * @param {String} password
 */

exports.updateUserInfo = (req, res) => {
  const data = req.body
  console.log(JSON.stringify(data))
  const username = req.user.username
  if(username){
    User.update({
      username
    },data, function(err){
      if(err) {
        res.status(500).send({
          status:false,
          message: err
        })
      }else {
        res.send({
          status: true,
          message: 'Update success'
        })
      }
    })
  }
};


exports.deleteUser = (req, res) => {
  const userId = req.params.id
  const username = req.user && req.user.username
  if(username){
    User.deleteOne({
      _id: userId
    },data, function(err){
      if(err) {
        res.status(500).send({
          status:false,
          message: err
        })
      }else {
        res.send({
          status: true,
          message: 'Delete success'
        })
      }
    })
  } else {
    res.status(401).send({
      status:false,
      message: 'Unauthorized'
    })
  }
}