const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const femaRegulations = new Schema({
   srNo:{
      type:Number
   },
    topic: {
       type: String
    }, 
    femaRegulationNoSubTopics: {
       type: String
    },
    ShortDescription: {
       type: String
    },
    Background: {
       backgroun1:String,
       background:String
    },
   //  BackgroundB: {
   //     type: String
   //  },
    regulatoryFramework: {
       type: String
    },
    delayReasons: {
       type: String
    },
    petitionRequest: {
       type: String
    },
 }, 
 {
    collection: 'FemaRegulations'
 })
 
 module.exports = mongoose.model('femaRegulations', femaRegulations)