const Comments = require('../model/Comments')
/**
 * Add Comments
 * @param {*} req
 * @param {*} res
 */
exports.AddComment = async (req, res) => {
  const newComment = new Comments({
    postId: req.body.postId, // 评论文章
    from: req.user._id, // 评论人
    content: req.body.content,
    parentId: req.body.parent, //回复： 被评论人id
  })
  try {
    await newComment.save()
    const comments = await Comments.find({
      postId: req.body.postId,
    }).populate('from', {
      username: 1,
      avatar: 1,
    })

    res.send({ comments })
  } catch (error) {
    res.send(error)
  }
}

exports.toggleCommentLikes = async (req, res) => {
  try {
    const comment = await Comments.findOne({ _id: req.body.commentId })
    const isLiked = comment.likes.find((c) => c == req.user._id) // is user liked
    console.log(req.body.commentId)
    console.log('isLiked', isLiked)

    if (isLiked) {
      const result = await Comments.findOneAndUpdate(
        { _id: req.body.commentId },
        {
          $pull: {
            likes: req.user._id,
          },
        },
        { new: true }
      )
      res.send({
        flag: false,
        likes: result.likes,
      })
    } else {
      const result = await Comments.findOneAndUpdate(
        { _id: req.body.commentId },
        {
          $addToSet: {
            likes: req.user._id,
          },
        },
        { new: true }
      )
      res.send({
        flag: true,
        likes: result.likes,
      })
    }
  } catch (error) {
    res.send(error)
  }
}
