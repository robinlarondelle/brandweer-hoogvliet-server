const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ApplicationSchema = new Schema({
  name: {
    firstname: {
      type: String,
      required: true
    },
    middlename: {
      required: false,
      type: String
    },
    lastname: {
      type: String,
      required: true
    }
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
  },
  phone: {
    type: "Number",
    required: true
  },
  address: {
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  birthday: {
    type: Date,
    required: true
  },
  motivation: {
    type: String,
    required: false
  },
  files: {
    motivationFile: {
      type: String,
      required: false
    },
    cvFile: {
      type: String,
      required: false
    }
  }
})

module.exports = ApplicationSchema