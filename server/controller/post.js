const Post = require('../model/Post')
const logger = require('../utils/logger')
const fs = require('fs')
const Comments = require('../model/Comments')
const buildTree = require('../utils/buildTree')

exports.addPost = async (req, res) => {
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
    if (!req.user) {
      res.send('Unauthorized')
    }
    let result = []

    const allPosts = await Post.find({})
      .populate('author', {
        username: 1,
        avatar: 1,
      })
      .exec()
    try {
      for (const post of allPosts) {
        const comments = await Comments.find({
          postId: post._id,
        })
          .populate('from', {
            username: 1,
            avatar: 1,
          })
          .exec()
        console.log('---start--')
        let commentTree = buildTree(comments, '_id', 'parentId')
        console.log('---end--')
        let file = post.files.map((f) => {
          return `/static/${f.filename}`
        })
        let p = {
          _id: post._id,
          createdAt: post.createdAt,
          files: file,
          author: post.author,
          title: post.title,
          desc: post.desc,
          likes: post.likes,
          comments: commentTree,
          flag: post.likes.includes(req.user._id),
        }
        result.push(p)
      }
    } catch (error) {
      res.send(error)
    }
    res.send(result)
  } catch (error) {
    res.send(error)
  }
}

exports.rmFromPostList = async (req, res) => {
  try {
    const { files } = await Post.findOne({
      _id: req.body._id,
    })
    try {
      for (const file of files) {
        await fs.unlinkSync(`${file.path}`)
      }
      await Comments.deleteMany({ postId: req.body._id })
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
    let flag = post.likes.find((like) => like.id === req.user._id)
    if (!flag) {
      const updatedpost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $addToSet: {
            likes: {
              id: req.user._id,
              name: req.user.username,
              avatar: req.user.avatar,
            },
          },
        },
        { new: true }
      )
      console.log(updatedpost.likes)
      res.send({
        flag: true,
        likes: updatedpost.likes,
      })
    } else {
      const updatedpost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: {
            likes: {
              id: req.user._id,
            },
          },
        },
        { new: true }
      )

      res.send({
        flag: false,
        likes: updatedpost.likes,
      })
    }
  } catch (error) {
    res.send(error)
  }
}

exports.addComment = async (req, res) => {
  try {
    const updatedpost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $addToSet: {
          comments: {
            userId: req.user._id,
            username: req.user.username,
            avatar: req.user.avatar,
            content: req.body.comment,
          },
        },
      },
      { new: true }
    )
    res.send({
      comments: updatedpost.comments,
    })
  } catch (error) {
    res.send(error)
  }
}
