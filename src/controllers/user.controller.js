const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const ApiError = require("../models/apierror.model")
const cfg = require("../config/config.json")
const validator = require("../models/validator")

module.exports = {
  getUsers(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      User.find().then(users => {
        if (!(users.length === 0 && users === undefined)) {
          res.status(200).json(users).end()
        } else { next(new ApiError("Geen gebruikers gevonden", 404)) }
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  getUserById(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const _id = req.params.id

      User.findById({ _id: _id }).then(user => {
        if (!(user.length === 0 || user === undefined)) {
          res.status(200).json(user).end()
        } else { next(new ApiError(`Geen gebruiker met id ${_id} gevonden`, 404)) }
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  addUser(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      validator.validateInputPOSTUser(req.body).then(user => {
        user.setPassword(req.body.password)
        user.save().then(() => {
          res.status(200).json({ "token": user.generateToken() }).end()
        }).catch(err => next(new ApiError("Error: " + err, 400)))
      }).catch(error => next(new ApiError("Error: " + error, 400)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  editUser(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const { email, role, driver, admin } = req.body      
      if (email && role && typeof driver !== "undefined" && typeof admin !== "undefined") {
        User.findOne({ email: email }).then(user => {          
          if (user) {
            User.findByIdAndUpdate({ _id: user._id }, { email: email, role: role, driver: driver, admin: admin }).then(() => {
              User.findById({ _id: user._id }).then(user => {
                res.status(200).json(user).end()
              }).catch(error => next(new ApiError(`Error: ${error}`, 500)))
            }).catch(error => next(new ApiError(`Error: ${error}`, 500)))
          } else { next(new ApiError(`Gebruiker met email ${email} is niet gevonden`, 404)) }
        }).catch(error => next(new ApiError(`Error: ${error}`, 500)))
      } else next(new ApiError("Niet alle velden zijn ingevuld. Nodig: email, role, driver, admin", 400))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  changePassword(req, res, next) {
    validator.validateToken(req.payload).then(token => {
      const { email, oldpassword, newpassword, newpasswordconf } = req.body

      if (email, oldpassword, newpassword, newpasswordconf) {
        if (oldpassword !== newpassword) {
          if (newpassword === newpasswordconf) {
            User.findOne({ email: email }).then(user => {
              bcrypt.compare(newpassword, user.password, (err, success) => {
                if (success === false) {
                  User.findByIdAndUpdate({ _id: user._id }, { password: bcrypt.hashSync(newpassword, cfg.SALT) }).then(() => {
                    User.findById({ _id: user._id }).then(user1 => {
                      res.status(200).json(user1).end()
                    }).catch(error => next(new ApiError(`Error: ${error}`, 500)))
                  }).catch(error => next(new ApiError(`Error: ${error}`, 500)))
                } else next(new ApiError("Nieuwe wachtwoord is zelfde als oude wachtwoord", 400))
              })
            })
          } else next(new ApiError("Nieuwe wachtwoorden komen niet overeen", 400))
        } else next(new ApiError("Nieuwe wachtwoord is hetzelfde als oude wachtwoord", 400))
      } else next(new ApiError("Niet alle velden zijn ingevuld. Nodig: email, oldpassword, newpassword, newpasswordconf", 400))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  },

  deleteUserByEmail(req, res, next) {
    validator.validateToken(req.payload).then(token => {      
      const _id = req.params.id

      User.findByIdAndDelete({ _id: _id }).then(() => {
        res.status(200).json(new ApiError("Success", 200)).end()
      }).catch(error => next(new ApiError("Error: " + error, 500)))
    }).catch(error => next(new ApiError("Error: " + error, 400)))
  }
}