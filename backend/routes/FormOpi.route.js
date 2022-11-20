const express = require('express')
const app = express()
const opiRoute = express.Router()

// opiModel model
let FormOpi = require('../models/FormOpi')

// Add opiModel
opiRoute.route('/createOpi').post((req, res, next) => {
  console.log(req.body);
  FormOpi.create(req.body, (error, data) => {
      console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get All opiModel
opiRoute.route('/getOpi').get((req, res) => {
  debugger
    FormOpi.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single opiModel
opiRoute.route('/read/:id').get((req, res) => {
    FormOpi.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update opiModel
opiRoute.route('/update/:id').put((req, res, next) => {
    FormOpi.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete opiModel
opiRoute.route('/delete/:id').delete((req, res, next) => {
    FormOpi.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = opiRoute
