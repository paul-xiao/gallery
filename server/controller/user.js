const User = require("../model/User");
const passport = require("passport");


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

exports.signIn = (req, res) => {
  console.log('success')
  res.send('success')
}
/**
 * [userInfo]
 * @param {String} username
 * @param {String} password
 */


exports.userInfo = (req, res) => {
  console.log(req.session.user)
};