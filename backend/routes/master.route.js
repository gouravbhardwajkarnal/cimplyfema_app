const express = require('express')
const app = express()
const masterRoute = express.Router()


let countries = require('../data/countries')

masterRoute.route('/master').get((req, res) => {
    debugger;
    countries.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  module.exports = masterRoute;
