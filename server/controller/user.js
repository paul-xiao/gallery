const User = require('../model/User')
const Avatar = require('../model/Avatar')
const logger = require('../utils/logger')
const passport = require('../config/passport')

/**
 * [user signUp]
 * @param {String} username
 * @param {String} password
 */
exports.signUp = (req, res) => {
  console.log(req.isAuthenticated())
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  })
  User.findOne(
    {
      username: req.body.username,
    },
    (err, example) => {
      if (err) console.log(err)
      if (example) {
        res.send({
          message: 'User already exist',
        })
      } else {
        newUser
          .save()
          .then((data) => {
            res.json({
              message: 'Successful created new user.',
            })
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            })
          })
      }
    }
  )
}

/**
 * [signIn]
 * @param {String} username
 * @param {String} password
 */

exports.signIn = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send({
        status: false,
        message: info.message,
      })
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err)
      }
      return res.send({
        status: true,
        message: 'login successed',
      })
    })
  })(req, res, next)
}
/**
 * [userInfo]
 * @param {String} username
 * @param {String} password
 */

exports.userInfo = async (req, res) => {
  try {
    const { username } = req.user
    const userinfo = await User.findOne({ username })
    const { _id, avatar, desc, nickname } = userinfo
    const result = {
      username,
      userId: _id,
      status: true,
      avatar,
      desc,
      nickname,
    }
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}

/**
 * [signIn]
 * @param none
 */
exports.logOut = (req, res) => {
  req.session.destroy()
  res.send({ result: 'OK', message: 'Session destroyed' })
  logger.info('Session destroyed')
}

/**
 * [update]
 * @param {String} username
 * @param {String} password
 */

exports.updateUserInfo = async (req, res) => {
  try {
    const { nickname, desc } = req.body

    await User.update({ _id: req.user._id }, { nickname, desc })

    res.send({
      message: 'userinfo updated',
    })
  } catch (error) {
    res.send(error)
  }
}

exports.updateAvatar = async (req, res) => {
  try {
    const { filename } = req.file

    await User.updateOne(
      { _id: req.user._id },
      { avatar: `/static/${filename}` }
    )

    res.send({
      message: 'avatar updated',
      avatar: `/static/${filename}`,
    })
  } catch (error) {
    res.send(error)
  }
}
