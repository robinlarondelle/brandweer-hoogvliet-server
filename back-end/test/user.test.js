const assert = require("chai").assert
const request = require("supertest")
const mongoose = require("mongoose")

const server = require("../server")
const User = require("../src/models/user.model")

const token = process.env.TOKEN


describe("A User", () => {
  describe("API", () => {

    it("GET /users should return all users in the database", done => {
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

      Promise.all([
        joe.save(),
        maria.save()
      ]).then(() => {
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

    it("GET /users/ID should return a single user", done => {
      const joe = new User({
        "email": "testemail@test.nl",
        "password": "Password1!",
        "firstname": "Joe",
        "lastname": "Doe",
        "role": "Admin",
        "admin": true,
        "driver": false
      })

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

    it("POST /users should write a user to the database based on the request body", done => {
      const joe = new User({
        email: "r.larondelle5@gez-brandweer.nl",
        firstname: "Admin",
        lastname: "La Rondelle",
        role: "Admin",
        admin: true,
        driver: false
      })
      joe.setPassword("Password1!")
      User.countDocuments().then(i => {
        request(server)
          .post("/api/users")
          .set("Authorization", token)
          .send({
            "email": joe.email,
            "password": "Password1!",
            "firstname": joe.firstname,
            "lastname": joe.lastname,
            "role": joe.role,
            "admin": joe.admin,
            "driver": joe.driver
          })
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

    it("PUT /users/ will update a specific user based on the request body", done => {
      const joe = new User({
        email: "testemail@test.nl",
        firstname: "Joe",
        lastname: "Doe",
        role: "Brandwacht",
        admin: true,
        driver: false
      })
      joe.setPassword("Password1!")

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

    it("DELETE /users/ID will delete a specific user from the database", done => {
      const joe = new User({
        "email": "testemail@test.nl",
        "password": "Password1!",
        "firstname": "Admin",
        "lastname": "La Rondelle",
        "role": "Admin",
        "admin": true,
        "driver": false
      })

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
  })
})