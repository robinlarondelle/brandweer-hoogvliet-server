const routes = require('express').Router();
const AuthController = require("../controllers/authentication.controller")

routes.post('/login', AuthController.login)

module.exports = routes