const Application = require("../models/application.model")
const ApiError = require("../models/apierror.model")
const validator = require("../models/validator")

module.exports = {
  getApplications(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      Application.find().then(applications => {
        if (applications.length !== 0 && applications !== undefined) {
          res.status(200).json(applications).end()
        } else next(new ApiError("Geen aanmeldingen beschikbaar", 404))
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  getApplicationById(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const _id = req.params.id

      Application.findById({ _id: _id }).then(application => {
        if (application !== null && application !== undefined) {
          res.status(200).json(application).end()
        } else next(new ApiError("Geen aanmeldingen met ID " + _id + "gevonden", 404))
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  addApplication(req, res, next) {    
    validator.validateApplicationInput(req.body).then(application => {
      application.save().then(() => {
        res.status(200).json(application).end()
      }).catch(error => next(new ApiError("Error: " + error, 400)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  deleteApplications(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      Application.deleteMany().then(() => {
        res.status(200).json(new ApiError("Success", 200)).end()
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  deleteApplicationById(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const _id = req.params.id

      Application.findByIdAndDelete({ _id: _id }).then(() => {
        res.status(200).json(new ApiError("Success", 200)).end()
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  }
}