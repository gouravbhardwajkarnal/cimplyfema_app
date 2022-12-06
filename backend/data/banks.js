
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const banklist = new Schema({
 
    bankname: {
      type: String
    }
  }, {
   collection: 'AD_BankList'
  })
  
  module.exports = mongoose.model('banklist', banklist)