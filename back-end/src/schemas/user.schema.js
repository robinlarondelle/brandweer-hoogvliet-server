const mongoose = require("mongoose")
const crypto = require("crypto")
const Schema = mongoose.Schema
const roles = require("../models/roles.model")
let jwt = require("jsonwebtoken")

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
  },
  hash: String,
  salt: String,
  firstname: {
    type: String,
    required: true,
    trim: true,
    default: "John"
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    default: "Doe"
  },
  role: {
    type: String,
    enum: roles,
    required: true,
    trim: true,
    default: "Brandwacht"
  },
  driver: {
    type: Boolean,
    required: true,
    default: false
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
})

UserSchema.methods.setPassword = function(password) {  
  this.salt = crypto.randomBytes(16).toString	("hex")  
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha256").toString("hex")  
}

UserSchema.methods.validatePassword = function(password) {  
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha256").toString("hex")
  return this.hash === hash
}

UserSchema.methods.generateToken = function() {   
  let exp = new Date()
  exp.setDate(exp.getDate() + 7)  
  
  const token = jwt.sign({
    _id: this._id,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    role: this.role,
    admin: this.admin,
    driver: this.driver,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.SECRET)

  return token
}

module.exports = UserSchema
