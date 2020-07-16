const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Course
var Comments = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: Array,
  },
  {
    timestamps: true,
    collection: 'comments',
  }
)

module.exports = mongoose.model('Comments', Comments)
