const routes = require("express").Router()
const applicationController = require("../controllers/application.controller")
var jwt = require('express-jwt');
var auth = jwt({  
  secret: process.env.SECRET,
  requestProperty: 'payload'
});

routes.get("/", auth, applicationController.getApplications)
routes.get("/:id", auth, applicationController.getApplicationById)
routes.post("/", applicationController.addApplication)
routes.delete("/", auth, applicationController.deleteApplications)
routes.delete("/:id", auth, applicationController.deleteApplicationById)

module.exports = routes