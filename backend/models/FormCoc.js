const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let FormCoc = new Schema({
    COC_FDICIN:{type: number},
    COC_FDI_CompanyName: { type: String},

    FDI_FlatBuildingNumber: { type: String},
    COC_FDI_RBILetter:{type: Date},
    COC_FDIIncorporationDate: { type: Date},
    COC_FDIPanNo: { type: String},
    COC_FDIFlatBuildingNumber:{type: Date},
    COC_FDIFloorNumber: { type: String},
    COC_FDIPremisesBuilding: { type: String},
    COC_FDIRoadStreet:{type: Date},
    COC_FDICity: { type: String},
    COC_FDIState: { type: String},
    COC_FDIPincode:{type: number},
    COC_FDI_Email: { type: String},
    COC_FDIMobile: { type: number},
    COC_FDITelephone:{type: string},
    COC_FDIFAX: { type: String},
    COC_FDI_AuthPerson: { type: String},
    COC_FDI_AuthPersonAddress:{type: string},
    COC_FDI_AuthPAN: { type: String},
    COC_FDI_AuthDesignation: { type: String}, 
    OPI_Sec_A_LEI: { type: String},
    OPI_Sec_A_PAN: { type: String},
    OPI_Sec_A_LEI: { type: String},
    OPI_Sec_A_PAN: { type: String},

    
}, {
    collection: 'FormCoc'
 })
 module.exports = mongoose.model('FormCoc', FormCoc)