const validator = require("../models/validator")
const ApiError = require("../models/apierror.model")
const Post = require("../models/post.model")

module.exports = {
  getPosts(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      Post.find().then(posts => {
        if (posts.length !== 0 && posts !== undefined) {
          res.status(200).json(posts).end()
        } else next(new ApiError("Geen berichten beschikbaar", 404))
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  getPostByID(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const _id = req.params.id

      Post.findById({ _id: _id }).then(post => {
        if (post !== null && post !== undefined && post.length !== 0) {
          res.status(200).json(post).end()
        } else next(new ApiError("Geen berichten met ID " + _id + " gevonden", 404))
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  addPost(req, res, next) {
    validator.validateToken(req.payload).then(token => {      
      validator.validateInputPOSTPost(req.body).then(() => {
        
        const post = new Post({
          author: token.firstname + " " + token.lastname,
          title: req.body.title,
          content: req.body.content
        })

        post.save().then(() => {          
          res.status(200).json(post).end()
        }).catch(error => next(new ApiError("Error: " + error, 400)))
      }).catch(error => next(new ApiError("Error: " + error, 400)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  editPost(req, res, next) {
    res.status(503).json({ "message": "Not implemented yet" }).end()
  },

  deletePostById(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const _id = req.params.id

      Post.findByIdAndDelete({ _id: _id }).then(() => {
        res.status(200).json(new ApiError("Success", 200)).end()
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  getPostComments(req, res, next) {
    res.status(503).json({ "message": "Not implemented yet" }).end()
  },

  placeComment(req, res, next) {
    res.status(503).json({ "message": "Not implemented yet" }).end()
  },

  editPostCommentById(req, res, next) {
    res.status(503).json({ "message": "Not implemented yet" }).end()
  },

  deletePostCommentById(req, res, next) {
    res.status(503).json({ "message": "Not implemented yet" }).end()
  }
}