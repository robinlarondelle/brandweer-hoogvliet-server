if (process.env.NODE_ENV === "test" || "test-cloud") require("dotenv").config({ path: "./src/config/enviroment.env" })
if (process.env.NODE_ENV === "local" || "cloud") require("dotenv").config({ path: "./src/config/enviroment.env" })

const express = require('express')
const morgan = require("morgan")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require("cors")
const passport = require("passport")

const ApiError = require("./src/models/apierror.model")
require("./src/config/passport")

const userRoutes = require("./src/routes/user.routes")
const applicationRoutes = require("./src/routes/application.routes")
const postRoutes = require("./src/routes/post.routes")
const authenticationRoutes = require("./src/routes/authentication.routes")

const port = process.env.PORT || "3000"
const app = express()

if (process.env.NODE_ENV === "local") {
  mongoose.connect(process.env.DB_LOCAL_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  mongoose.connection
    .once('open', () => console.log("Opened local DB\n"))
    .on('error', (error) => console.warn("Error", error))

} else if (process.env.NODE_ENV === "cloud") {
  mongoose.connect(process.env.DB_CLOUD_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  mongoose.connection
    .once('open', () => console.log("Opened cloud DB\n"))
    .on('error', (error) => console.warn("Error", error))
}

app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors({ origin: "*" }))
app.use(passport.initialize())

app.use("/api", authenticationRoutes)
app.use("/api/users", userRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/posts", postRoutes)

app.use("*", function (req, res, next) {
  next(new ApiError("Deze endpoint bestaat niet", 404, Date.now()))
})

app.use((err, req, res, next) => {
  res.status(err.code || 404).json(err).send();
})

if (process.env.NODE_ENV !== "test" || "test-cloud") {
  app.listen(port, () => {
    console.log("Server is running on port: " + port)
  })
}

module.exports = app