const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let countries = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'Country'
})

module.exports = mongoose.model('countries', countries)