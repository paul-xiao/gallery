const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Course
var Post = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
    desc: {
      type: String,
    },
    likes: Array,
  },
  {
    timestamps: true,
    collection: 'post',
  }
)

module.exports = mongoose.model('Post', Post)
