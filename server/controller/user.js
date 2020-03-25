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
 * [userInfo]
 * @param {String} username
 * @param {String} password
 */

exports.signIn = function(req, res, next){

  console.log(req.isAuthenticated())
  res.send({
    status: true,
    message: 'signin success'
  })

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
        const {username, createdAt} = result
        res.send({
          username,
          createdAt
        });
      }
    })
};


exports.logOut = (req, res) => {
  req.session.destroy();
  res.send({ result: 'OK', message: 'Session destroyed' });
  logger.info('Session destroyed')

}