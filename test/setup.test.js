const mongoose = require("mongoose")

before("Connect to MongoDB", done => {
  if (process.env.NODE_ENV === "test") {
    mongoose.connect(process.env.DB_LOCAL_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  
    mongoose.connection
    .once('open', () => {console.log("Opened local Test-DB\n"); done()})
    .on('error', (error) => {console.warn("Error", error); done()})
    
  } else if (process.env.NODE_ENV === "test-cloud") {
    mongoose.connect(process.env.DB_CLOUD_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  
    mongoose.connection
    .once('open', () => {console.log("Opened local Test-DB\n"); done()})
    .on('error', (error) => {console.warn("Error", error); done()})
  }
})

beforeEach("Clear database", done => {
  const { 
    users, 
    applications} = mongoose.connection.collections

  Promise.all([
    //DO NOT DELETE ADMIN USER!!!!
    users.deleteMany({ email: { $ne: "admin@admin.nl" } }),
    // posts.drop(),
    applications.deleteMany()
  ]).then(() => done())
    .catch(err => done(err))
})

describe("Tests", () => {
  it("Should run the first test case", done => {
    done()
  })
})

after("Drop MongoDB and close connection", (done) => {
  mongoose.connection.close(() => {
    console.log("Closed connection")
    done()
  })
})
