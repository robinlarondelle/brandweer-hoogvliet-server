const mongoose = require('mongoose')
const applicationSchema = require("../schemas/application.schema")

const ApplicationModel = mongoose.model('applications', applicationSchema)
module.exports = ApplicationModel
