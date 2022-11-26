const express = require('express')
const app = express()
const esopRoute = express.Router()

// CocModel model
let FromCoc = require('../models/FormCoc')

// Add CocModel
esopRoute.route('/createCoc').post((req, res, next) => {
  console.log(req.body);
    FromEsop.create(req.body, (error, data) => {
      console.log(data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get All CocModel
cocRoute.route('/').get((req, res) => {
    FromCoc.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single CocModel
CocRoute.route('/read/:id').get((req, res) => {
    FromEsop.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update EsopModel
CocRoute.route('/update/:id').put((req, res, next) => {
    FromCoc.findByIdAndUpdate(
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

// Delete CocModel
esopRoute.route('/delete/:id').delete((req, res, next) => {
    FromCoc.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = cocRoute
