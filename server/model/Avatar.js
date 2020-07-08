const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Course
var Avatar = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
    collection: 'avatar',
  }
)

module.exports = mongoose.model('Avatar', Avatar)
