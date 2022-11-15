const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cities = new Schema({
    _id: {
      type: Number
    },
    name: {
      type: String
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'State'
    }
  }, {
    collection: 'City'
 })
 
 module.exports = mongoose.model('cities', cities)