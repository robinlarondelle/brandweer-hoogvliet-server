const assert = require("chai").assert
const request = require("supertest")
const server = require("../server")
const Application = require("../src/models/application.model")

const token = process.env.TOKEN

describe("A Application", () => {
  describe("API", () => {

    it("GET /api/applications should return all applications", done => {
      const app1 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app2 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app3 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      Promise.all([
        app1.save(),
        app2.save(),
        app3.save()
      ]).then(() => {
        Application.find().then(applications => {
          request(server)
            .get("/api/applications/")
            .set("Authorization", token)
            .end((err, res) => {
              assert.isTrue(res.status === 200)
              assert.notExists(err)
              assert.exists(res.body)
              assert.equal(Object.keys(res.body).length, applications.length)
              done()
            })
        })
      })
    })

    it("GET /api/applications/:id should return one applications", done => {
      const app1 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      app1.save().then(() => {
        Application.findOne({ _id: app1._id }).then(application => {
          request(server)
            .get("/api/applications/" + app1._id)
            .set("Authorization", token)
            .end((err, res) => {
              assert.isTrue(res.status === 200)
              assert.notExists(err)
              assert.exists(res.body)
              assert.isTrue(application.email === app1.email)
              assert.isTrue(application.gender === app1.gender)
              assert.isTrue(application.name.firstname === app1.name.firstname)
              done()
            })
        })
      })
    })

    it("POST /api/applications should add a application to the db", done => {
      request(server)
        .post("/api/applications")
        .send({
          "name": {
            "firstname": "Robin",
            "lastname": "Rondelle"
          },
          "birthday": {
            "day": "23",
            "month": "september",
            "year": "1998"
          },
          "address": {
            "street": "Beugstraat",
            "number": "68",
            "city": "Hoogvliet",
            "zipcode": "3192GA"
          },
          "email": "robinlarondelle@hotmail.com",
          "gender": "male",
          "phone": "0612345678",
          "motivation": "motivation here",
          "files": {
            "cvFile": "file_here",
            "motivationFile": "file_here"
          }
        })
        .end((err, res) => {
          Application.find({ email: "robinlarondellle@hotmail.com" }).then(application => {
            assert.exists(application)
            assert.exists(res.body)
            assert.isTrue(res.status === 200)
            assert.notExists(err)
            done()
          })
        })
    })

    it("DELETE /api/applications should delete all applications", done => {
      const app1 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app2 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app3 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      Promise.all([
        app1.save(),
        app2.save(),
        app3.save()
      ]).then(() => {
        request(server)
          .delete("/api/applications")
          .set("Authorization", token)
          .end((err, res) => {
            Application.find().then(applications => {
              assert.isEmpty(applications )
              done()
            })
          })
      })
    })

    it("DELETE /api/applications/:id should return one applications", done => {
      const app1 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app2 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      const app3 = new Application({
        "name": {
          "firstname": "Robin",
          "lastname": "Rondelle"
        },
        "birthday": new Date(1998, 08, 24),
        "address": {
          "street": "Beugstraat",
          "number": "68",
          "city": "Hoogvliet",
          "zipcode": "3192GA"
        },
        "email": "robinlarondelle@hotmail.com",
        "gender": "male",
        "phone": "0612445678",
        "motivation": "motivation here",
        "files": {
          "cvFile": "file_here",
          "motivationFile": "file_here"
        }
      })

      Promise.all([
        app1.save(),
        app2.save(),
        app3.save()
      ]).then(() => {
        request(server)
          .delete("/api/applications/" + app1._id)
          .set("Authorization", token)
          .end((err, res) => {
            Application.countDocuments().then((count) => {              
              assert.isTrue(count == 2)
              done()
            })
          })
      })
    })
  })
})
