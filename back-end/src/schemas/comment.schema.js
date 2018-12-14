const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema ({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comments"
  }],
})

module.exports = CommentSchema