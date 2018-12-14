const routes = require("express").Router()
const userController = require("../controllers/user.controller")
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.SECRET,
  requestProperty: "payload"
});

routes.get("/", auth, userController.getUsers)
routes.get("/:id", auth, userController.getUserById)
routes.post("/", auth, userController.addUser)
routes.put("/", auth, userController.editUser)
routes.put("/password", auth, userController.changePassword)
routes.delete("/:id", auth, userController.deleteUserByEmail)

module.exports = routes
