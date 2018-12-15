const mongoose = require("mongoose")
const cfg = require("../src/config/config.json")


before("Connect to MongoDB", done => {
  if (process.env.NODE_ENV === "test-local") {
    mongoose.connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  
    mongoose.connection
    .once('open', () => console.log("Opened local DB\n"))
    .on('error', (error) => console.warn("Error", error))
    
  } else if (process.env.NODE_ENV === "test-cloud") {
    mongoose.connect(process.env.DB_CLOUD_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  
    mongoose.connection
    .once('open', () => console.log("Opened cloud DB\n"))
    .on('error', (error) => console.warn("Error", error))
  }
})

beforeEach("Clear database", done => {
  const { users, applications, posts } = mongoose.connection.collections

  Promise.all([
    users.deleteMany({ email: { $ne: "admin@admin.nl" } }),
    posts.drop(),
    applications.deleteMany()
  ]).then(() => done())
    .catch(err => done())
})

after("Drop MongoDB and close connection", (done) => {
  mongoose.connection.close(() => {
    console.log("Closed connection")
    done()
  })
})
