const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require("../models/user.model")

passport.use(new LocalStrategy({
  usernameField: "email"
}, (username, password, done) => {  
  User.findOne({email: username}).then(user => {
    if (user) {
      if (user.validatePassword(password)) {
        return done(null, user)
      } else return done(null, false, {message: "Wachtwoord is niet correct"})
    } else return done(null, false, {message: "Geen gebruiker gevonden"})
  }).catch(err => {return done("Error1: "+err)})
}))