const assert = require("chai").assert
const request = require("supertest")

const server = require("../server")
const User = require("../src/models/user.model")

const token = process.env.TOKEN
const joe = new User({
  email: "testemail1@email.com",
  firstname: "joe",
  lastname: "Doe",
  role: "Brandwacht",
  admin: true,
  driver: true
})
joe.setPassword("password123")

const maria = new User({
  email: "testemail2@email.com",
  firstname: "Maria",
  lastname: "May",
  role: "Brandwacht",
  admin: true,
  driver: true
})
maria.setPassword("password123")

const joePOSTBody = {
  "email": joe.email,
  "password": "Password1!",
  "firstname": joe.firstname,
  "lastname": joe.lastname,
  "role": joe.role,
  "admin": joe.admin,
  "driver": joe.driver
}

describe("A User", () => {

  describe("Properties", () => {
    xit("Should have a firstname, middlename and lastname", done => {
      done()
    })

    xit("Should have an email address which needs to be of a valid format", done => {
      done()
    })

    xit("Should not contain a password, but a hash and a salt", done => {
      done()
    })

    xit("Should have a helper method to validate the password", done => {
      done()
    })

    xit("Should have a helper method to set the password", done => {
      done()
    })

    xit("Should have a helper method to generate a JWT token", done => {
      done()
    })

    xit("The generated token should contain all the user information", done => {
      done()
    })
  })
  
  describe("API endpoint", () => {
    xit("GET /users should return all users in the database with status 200", done => {
      Promise.all([joe.save(), maria.save()]).then(() => {
        User.countDocuments().then((res) => {
          request(server)
            .get("/api/users")
            .set("Authorization", token)
            .end((err, res) => {
              assert.isTrue(res.status === 200)
              assert.notExists(err)
              assert.exists(res.body)
              assert.approximately(Object.keys(res.body).length, 2, 1)
              done()
            })
        })
      })
    })

    xit("GET /users should return an error with status 404 when there are no users in the DB", done => {
      done()
    })

    xit("GET /users/ID should return a single user with status 200", done => {
      joe.save().then(() => {
        User.findOne({ _id: joe._id }).then(user1 => {
          request(server)
            .get("/api/users/" + joe._id)
            .set("Authorization", token)
            .end((err, res) => {
              User.find({ email: joe.email }).then(user => {
                assert.notExists(err)
                assert.isTrue(res.status === 200)
                assert.isTrue(res.body.firstname == user[0].firstname)
                assert.isTrue(res.body.email == user[0].email)
                assert.isTrue(res.body.role == user[0].role)
                assert.isTrue(res.body.admin == user[0].admin)
                assert.isTrue(res.body.driver == user[0].driver)
                assert.isTrue(res.body._id == user[0]._id)
                done()
              })
            })
        })
      })
    })

    xit("GET /users/ID should return an error with status 404 when there is no user with the specified ID", done => {
      done()
    })

    xit("POST /users should write a user to the database based on the request body with status 200", done => {

      //TODO fix this test

      User.countDocuments().then(i => {
        request(server)
          .post("/api/users")
          .set("Authorization", token)
          .send(joePOSTBody)
          .end((err, res) => {
            User.find({ email: joe.email }).then(user => {
              assert.isTrue(joe.firstname == user[0].firstname)
              assert.isTrue(joe.email == user[0].email)
              assert.isTrue(joe.role == user[0].role)
              assert.isTrue(joe.admin == user[0].admin)
              assert.isTrue(joe.driver == user[0].driver)
              assert.exists(res.body.token)
              assert.isTrue(res.status === 200)
              done()
            })
          })
      })
    })

    xit("POST/users should not post a user if password is not valid with status 401", done => {
      done()
    })

    xit("POST/users should not post a user if the email is not of a valid format with status 401", done => {
      done()
    })

    xit("POST/users should throw an error when not all fields are given", done => {
      done()
    })

    xit("POST/users should throw an error then a field is left empty", done => {
      done()
    })

    xit("PUT /users/ should update a specific user based on the request body with status 200", done => {
      joe.save().then(() => {
        User.findOne({ _id: joe._id }).then(user => {
          request(server)
            .put("/api/users")
            .set("Authorization", token)
            .send({
              email: joe.email,
              role: "Bevelvoerder",
              admin: !joe.admin,
              driver: !joe.driver
            })
            .end((err, res) => {
              User.findOne({ _id: joe._id }).then(user1 => {
                assert.notExists(err)
                assert.isTrue(res.status === 200)
                assert.exists(res.body)
                assert.isTrue(user.firstname == user1.firstname)
                assert.isTrue(user.lastname == user1.lastname)
                assert.isTrue(user.email == user1.email)
                assert.isTrue(user.admin !== user1.admin)
                assert.isTrue(user.driver !== user1.driver)
                assert.isTrue(res.body.firstname == user1.firstname)
                assert.isTrue(res.body.lastname == user1.lastname)
                assert.isTrue(res.body.email == user1.email)
                assert.isTrue(res.body.admin == user1.admin)
                assert.isTrue(res.body.driver == user1.driver)
                done()
              })
            })
        })
      })
    })

    xit("PUT/users should return 200, even if nothing changed", done => {
      done()
    })

    xit("DELETE /users/ID should delete a specific user from the database", done => {
      joe.save().then(() => {
        User.findOne({ _id: joe._id }).then(user => {
          request(server)
            .delete(`/api/users/${joe._id}`)
            .set("Authorization", token)
            .end((err, res) => {
              User.findOne({ _id: user._id }).then(user1 => {
                assert.notExists(err)
                assert.notExists(user1)
                assert.isTrue(res.status === 200)
                assert.exists(res.body)
                assert.isTrue(res.body.message == "Success")
                done()
              })
            })
        })
      })
    })

    xit("DELETE/users should give status 200 even if nothing was deleted", done => {
      done()
    })
  })
})