const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let countries = new Schema({
   city: {
      type: String
   },
   country: {
      type: String
   },
   lat: {
      type: String
   },
   lang: {  
      type: String
   },
   iso3: {
      type: String
   },
   State: {
      type: String
   },
}, {
   collection: 'City_State_CountryList'
})
// let countries = new Schema({
//    name: {
//       type: String
//    },
//    code: {
//       type: String
//    }
// }, {
//    collection: 'Country'
// })
module.exports = mongoose.model('countries', countries)