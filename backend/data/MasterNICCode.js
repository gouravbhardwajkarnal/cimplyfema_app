const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const masterniccode = new Schema({
   Year: {
      type: Number
   },
   Class: {
      type: String
   },
   DescriptionClass: {
      type: String
   },
}, 
{
   collection: 'Master_NIC_Codes'
})

module.exports = mongoose.model('masterniccode', masterniccode)




