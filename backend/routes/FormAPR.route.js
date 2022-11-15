const express = require('express')
const app = express()
const aprRoute = express.Router()

// APRModel model
let FormAPR = require('../models/FormAPR')

// Add AprModel
aprRoute.route('/createApr').post((req, res, next) => {
  console.log(req.body);
    FormAPR.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get All APRModel
aprRoute.route('/').get((req, res) => {
    FormAPR.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single APRModel
aprRoute.route('/read/:id').get((req, res) => {
    FormAPR.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update APRModel
aprRoute.route('/update/:id').put((req, res, next) => {
    FormAPR.findByIdAndUpdate(
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

// Delete APRModel
aprRoute.route('/delete/:id').delete((req, res, next) => {
    FormAPR.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = aprRoute
