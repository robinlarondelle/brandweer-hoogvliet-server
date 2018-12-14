const mongoose = require("mongoose")
const CommentSchema = require("../schemas/comment.schema")

const CommentModel = mongoose.model("comments", CommentSchema)
module.exports = CommentModel