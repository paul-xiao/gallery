const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Course
var Likes = new Schema(
  {
    postId: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    // 是否已点赞 0、1
    flag: String,
  },
  {
    timestamps: true,
    collection: 'likes',
  }
)

module.exports = mongoose.model('Likes', Likes)
