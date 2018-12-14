const routes = require("express").Router()
const postController = require("../controllers/post.controller")
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.SECRET,
  requestProperty: 'payload'
});

routes.get("/", auth, postController.getPosts)
routes.get("/:id", auth, postController.getPostByID)
routes.get("/:id/comments", auth, postController.getPostComments)
routes.post("/:id/comments", auth, postController.placeComment)
routes.put("/:id/comments/:id", auth, postController.editPostCommentById)
routes.delete("/:id/comments/:id", auth, postController.deletePostCommentById)
routes.post("/", auth, postController.addPost)
routes.put("/", auth, postController.editPost)
routes.delete("/:id", auth, postController.deletePostById)

module.exports = routes