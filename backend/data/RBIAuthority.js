

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const rbiAuthority = new Schema({
    Topic: {
       type: String
    },
    RegionalOffices: {
       type: String
    },
    Address: {
       type: String
    },
    RegionalDirector: {
       type: String
    },
 }, 
 {
    collection: 'RBIAuthority'
 })
 
 module.exports = mongoose.model('rbiAuthority', rbiAuthority)