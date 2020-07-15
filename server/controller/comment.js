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
      parentId?: req.body.parent //回复： 被评论人id
    })
}
