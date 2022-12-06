const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const femaRegulations = new Schema({
    Topic: {
       type: String
    }, 
 FEMARegulationNoSubtopics: {
       type: String
    },
    ShortDescriptiom: {
       type: String
    },
    BackgroundA: {
       type: String
    },
    BackgroundB: {
       type: String
    },
    RegulatoryFramework: {
       type: String
    },
    DelayReasons: {
       type: String
    },
    PetitionRequest: {
       type: String
    },
 }, 
 {
    collection: 'FemaRegulations'
 })
 
 module.exports = mongoose.model('femaRegulations', femaRegulations)