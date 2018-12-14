const passport = require("passport")
const ApiError = require("../models/apierror.model")

module.exports = {
  login(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if(!err) {
        if (user) {
          res.status(200).json({token: user.generateToken()}).end()
        } else next(new ApiError("Geen gebruiker gevonden. info: "+ info, 404))
      } else next(new ApiError("Error: " + err, 400))
    })(req, res)
  }
}