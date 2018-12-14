const mongoose = require("mongoose")
const cfg = require("../src/config/config.json")


before("Connect to MongoDB", done => {
  mongoose.connect(process.env.DB_TEST_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })

  mongoose.connection
    .once("open", () => { console.log("Opened Test DB \n"); done() })
    .on("error", ((error) => { console.warn("Error: " + error); done(); }))
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
