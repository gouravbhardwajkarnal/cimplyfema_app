
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currencylist = new Schema({
 
    currency: {
      type: String
    },
    code: {
        type: String
      }
  }, {
   collection: 'CurrencyList'
  })
  
  module.exports = mongoose.model('currencylist', currencylist)