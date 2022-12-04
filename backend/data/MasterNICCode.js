const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Master_NIC_Codes = new Schema({
   Year: {
      type: String
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

module.exports = mongoose.model('Master_NIC_Codes', Master_NIC_Codes)