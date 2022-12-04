const express = require('express')
const app = express()
const cocRoute = express.Router()

// CocModel model
 let FormCoc = require('../models/FormCoc')

// // Add CocModel
 cocRoute.route('/createcoc').post((req, res, next) => {
   console.log(req.body);
   FormCoc.create(req.body, (error, data) => {
       console.log(data);
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })


// Get All CocModel
/* cocRoute.route('/').get((req, res) => {
    FromCoc.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}) */

// Get single CocModel
/* cocRoute.route('/read/:id').get((req, res) => {
  FromCoc.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}) */

// Update CocModel
/* cocRoute.route('/update/:id').put((req, res, next) => {
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
}) */

// Delete CocModel
/* cocRoute.route('/delete/:id').delete((req, res, next) => {
    FromCoc.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
}) */

module.exports = cocRoute
