const Post = require('../model/Post')
const logger = require('../utils/logger')
const fs = require('fs')

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
        let file = post.files.map((f) => {
          return `/static/${f.filename}`
        })
        return {
          _id: post._id,
          createdAt: post.createdAt,
          files: file,
          author: post.author,
          title: post.title,
          desc: post.desc,
          likes: post.likes.length,
          flag: post.likes.includes(req.user._id),
        }
      })
    )
  } catch (error) {
    res.send(error)
  }
}

exports.rmFromPostList = async (req, res) => {
  try {
    console.log(req.body._id)

    const { files } = await Post.findOne({
      _id: req.body._id,
    })
    console.log(files.path)
    try {
      await fs.unlinkSync(`${files.path}`)
      logger.info('--------------------------')
      await Post.deleteOne({
        _id: req.body._id,
      })
    } catch (error) {
      logger.error(error)
    }

    res.send(`file ${files.filename} is deleted`)
  } catch (error) {
    res.send(error)
  }
}

exports.getLatestPosts = async (req, res) => {
  const latestPost = Post.find({})
}

exports.toggleLikes = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.body.postId,
    })
    logger.info(post.likes)
    let flag = post.likes.includes(req.user._id)
    let likes = post.likes.length
    logger.error('init', likes, flag)

    if (!flag) {
      await Post.updateOne(
        { _id: req.body.postId },
        {
          $addToSet: {
            likes: req.user._id,
          },
        }
      )
      likes++
      logger.info('添加', likes, true)
      res.send({
        flag: true,
        likes: likes,
      })
    } else {
      await Post.updateOne(
        { _id: req.body.postId },
        {
          $pull: {
            likes: req.user._id,
          },
        }
      )
      likes--
      logger.warn('删除', likes, false)
      res.send({
        flag: false,
        likes: likes,
      })
    }
  } catch (error) {
    res.send(error)
  }
}
