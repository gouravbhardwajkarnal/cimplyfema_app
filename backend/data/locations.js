const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const locations = new Schema({
 
    country_name: {
      type: String
    },
    country_code: {
        type: String
      },
      states: [
        {
            state_id: {
                type: String
              },
            state_name: {
              type: String
            },
            cities: [  ],
        }
      ]
  }, {
   collection: 'locations'
})

module.exports = mongoose.model('locations', locations)