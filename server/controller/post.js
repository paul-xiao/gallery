const Post = require('../model/Post')
const Comments = require('../model/Comments')
const User = require('../model/User')
const logger = require('../utils/logger')

exports.addPost = async (req, res) => {
  console.log(req.user)
  const newPost = new Post({
    author: req.user._id,
    title: req.body.title,
    desc: req.body.desc,
    files: req.files,
  })
  await newPost.save()
  res.send('success')
}

exports.getPostList = async (req, res) => {
  // let result
  try {
    const allPosts = await Post.find({})
      .populate('author', {
        username: 1,
        avatar: 1,
      })
      .exec()
    res.send(
      allPosts.map((post) => {
        const { createdAt, files, author, title, desc } = post
        let file = files.map((f) => {
          return `/static/${f.filename}`
        })
        return {
          createdAt,
          files: file,
          author,
          title,
          desc,
        }
      })
    )
  } catch (error) {
    res.send(error)
  }
}

exports.rmFromPostList = (req, res) => {
  console.log(req.body._id)

  Post.deleteOne({
    _id: req.body._id,
  })
    .then(() => {
      res.send(`file ${req.body._id} is deleted`)
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.getLatestPosts = async (req, res) => {
  const latestPost = Post.find({})
}
