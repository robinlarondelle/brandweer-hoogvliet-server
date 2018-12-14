const mongoose = require('mongoose')
const PostSchema = require("../schemas/post.schema")

const PostModel = mongoose.model("posts", PostSchema)
module.exports = PostModel