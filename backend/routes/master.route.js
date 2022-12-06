const express = require('express')
const app = express()
const masterRoute = express.Router()


let Country = require('../data/countries')
let cities = require('../data/cities')
let bank = require('../data/commonMasters')
let currencycode= require('../data/commonMasters')
let locations = require('../data/locations');

var countryarray = [];
masterRoute.route('/bank').get((req, res) => {
  bank.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
masterRoute.route('/currencycode').get((req, res) => {
  currencycode.distinct("Code", function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
masterRoute.route('/country').get((req, res) => {
  Country.distinct("country", function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})
//masterRoute.route('/City').get((req, res) => {
masterRoute.route('/City').get((req, res) => {
  Country.find({country: 'India'}, function (error, data) {
      if (error) {
        return next(error)
      } else {
        res.json(data);
      }
    })
  });
  masterRoute.route('/State').get((req, res) => {
    Country.find({country: 'India'}, function (error, data) {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
      })
    });
//    let statesList =  await Country.find({country: "India"}).lean()

//  for(let y in statesList){
//   let stateData ={ 
//     state_id : statesList[y].id,
//     state_name: statesList[y].name,
//     cities:[]
//   }

//   stateData.cities =   await cities.find({state_id: statesList[y].id}).lean()
//   getData.states.push(stateData)
// }

//   Country.find((error, data) => {
//   if (error) {
//     return next(error)
//   } else {
//     res.json(data)
//   }
// })
// masterRoute.route('/country').get((req, res) => {
//   Country.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// masterRoute.route('/master').get(async (req, res) => {
//   let countriesList = await countries.find().lean()
//   // let locations = []
//   console.log(countriesList,'----locations');

//   for(var i in countriesList){
//     let getData = {
//       country_name : countriesList[i].name,
//       country_code: countriesList[i].sortname,
//       states:[]}
//    let statesList =  await states.find({country_id: countriesList[i].id}).lean()

//    for(let y in statesList){
//     let stateData ={ 
//       state_id : statesList[y].id,
//       state_name: statesList[y].name,
//       cities:[]
//     }

//     stateData.cities =   await cities.find({state_id: statesList[y].id}).lean()
//     getData.states.push(stateData)
//    }
//    await locations.create(getData)
//    //locations.push(getData)
//   }
//   // console.log(locations,'----locations');
//   res.json('locations')

// })
// masterRoute.route('/master/City').get(async (req, res) => {

// let stateList = await states.find({country_id:'101'}).select("id").then(res=>{
//   return res.map((val)=>val.id)
// })

// let citiesList =await  cities.find({
//     state_id : {
//       '$in' : stateList
//     }
//   })
//   console.log(citiesList);
//   return citiesList;
// })
// const express = require('express')
// const app = express()
// const employeeRoute = express.Router()

// // Employee model
// let Employee = require('../models/Employee')

// // Add Employee
// employeeRoute.route('/create').post((req, res, next) => {
//   Employee.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// // Get All Employees
// employeeRoute.route('/').get((req, res) => {
//   Employee.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// // Get single employee
// employeeRoute.route('/read/:id').get((req, res) => {
//   Employee.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })

// // Update employee
// employeeRoute.route('/update/:id').put((req, res, next) => {
//   Employee.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (error, data) => {
//       if (error) {
//         return next(error)
//         console.log(error)
//       } else {
//         res.json(data)
//         console.log('Data updated successfully')
//       }
//     },
//   )
// })

// // Delete employee
// employeeRoute.route('/delete/:id').delete((req, res, next) => {
//   Employee.findOneAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.status(200).json({
//         msg: data,
//       })
//     }
//   })
// })

// module.exports = employeeRoute

module.exports = masterRoute;
