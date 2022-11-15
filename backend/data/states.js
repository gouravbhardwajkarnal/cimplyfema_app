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