const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let FormCoc = new Schema({
    COC_FDI_RBILetter:{type: Date},
    OPI_Sec_A_LEI: { type: String},
    OPI_Sec_A_PAN: { type: String},
    
}, {
    collection: 'formopi'
 })
 module.exports = mongoose.model('FormOpi', FormOpi)