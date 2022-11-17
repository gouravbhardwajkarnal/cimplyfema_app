const express = require('express')
const app = express()
const masterRoute = express.Router()


let countries = require('../data/countries')
let cities = require('../data/cities')
let states = require('../data/states')
let locations = require('../data/locations');

var countryarray=[];

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
  //   debugger;
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
  module.exports = masterRoute;
