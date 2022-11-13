const express = require('express')
const app = express()
const esopRoute = express.Router()

// EsopModel model
let FromEsop = require('../models/FormEsop')

// Add EsopModel
esopRoute.route('/createEsop').post((req, res, next) => {
  console.log(req.body);
    FromEsop.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get All EsopModel
esopRoute.route('/').get((req, res) => {
    FromEsop.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single EsopModel
esopRoute.route('/read/:id').get((req, res) => {
    FromEsop.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update EsopModel
esopRoute.route('/update/:id').put((req, res, next) => {
    FromEsop.findByIdAndUpdate(
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

// Delete EsopModel
esopRoute.route('/delete/:id').delete((req, res, next) => {
    FromEsop.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = esopRoute
