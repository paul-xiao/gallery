const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Course
var Comments = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'comments',
  }
)

module.exports = mongoose.model('Comments', Comments)
