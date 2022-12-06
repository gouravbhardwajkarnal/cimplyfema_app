const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const states = new Schema({
    _id: {
      type: Number
    },
    id: {
        type: String
      },
    name: {
      type: String
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'City'
      }
    ],
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country'
    }
  }, {
   collection: 'State'
})

module.exports = mongoose.model('states', states)

const banklist = new Schema({
 
  bankname: {
    type: String
  }
}, {
 collection: 'AD_BankList'
})

module.exports = mongoose.model('banklist', banklist)

const currencycodelist = new Schema({
 
  currency: {
    type: String
  },
  code: {
    type: Number
  },
}, {
 collection: 'CurrencyList'
})

module.exports = mongoose.model('currencycodelist', currencycodelist)