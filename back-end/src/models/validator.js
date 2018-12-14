const mongoose = require("mongoose")
const Application = require("../models/application.model")
const User = mongoose.model("users")

module.exports = {
  validateToken(token) {
    return new Promise((resolve, reject) => {
      if (token._id) {
        User.findById({ _id: token._id }).then(user => {
          if (user) resolve(token)
          else reject("Niet geauthorizeerd")
        }).catch(err => reject(err))
      } else reject("Niet geauthorizeerd")
    })
  },

  validateApplicationInput(input) {
    return new Promise((resolve, reject) => {
      const { firstname, middlename, lastname } = input.name
      const { day, month, year } = input.birthday
      const { email, gender, motivation, phone } = input
      const { motivationFile, cvFile } = input.files
      const { street, number, zipcode, city } = input.address

      if (firstname, middlename, lastname, day, month, year, email, gender, phone, motivation, motivationFile, cvFile, street, number, zipcode, city) {
        monthNumber(month).then(newMonth => {
          const birthday = new Date(year, newMonth, day)
          resolve(new Application({ name: { firstname, middlename, lastname }, gender, email, phone, address: { street, number, zipcode, city }, birthday, files: { motivationFile, cvFile } }))
        })
      } else {
        reject("Niet alle velden zijn ingevuld")
      }
    })
  },

  validateInputPOSTUser(input) {
    const { email, password, firstname, lastname, admin, driver, role } = input
    return new Promise((resolve, reject) => {
      if (email && email !== null &&
        password && password !== null &&
        firstname && firstname !== null &&
        lastname && lastname !== null &&
        role && role !== null &&
        typeof admin && typeof driver) {

        resolve(new User({
          email: email,
          firstname: firstname,
          lastname: lastname,
          admin: admin,
          driver: driver,
          role: role
        }))

      } else {
        reject("Geen juiste gegevens meegegeven")
      }
    })
  },

   validateInputPOSTPost(input) {
    return new Promise((resolve, reject) => {
      resolve()
    })
   }
}

function monthNumber(monthString) {
  return new Promise((resolve, reject) => {
    let monthnum;
    switch (monthString) {
      case "januari": monthnum = 0; break;
      case "februari": monthnum = 1; break;
      case "maart": monthnum = 2; break;
      case "april": monthnum = 3; break;
      case "mei": monthnum = 4; break;
      case "juni": monthnum = 5; break;
      case "juli": monthnum = 6; break;
      case "augustus": monthnum = 7; break;
      case "september": monthnum = 8; break;
      case "oktober": monthnum = 9; break;
      case "november": monthnum = 10; break;
      case "december": monthnum = 11; break;
      default: 1;
    }
    resolve(monthnum)
  })
}