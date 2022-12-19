const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let FormCoc = new Schema({
    COC_FDICIN:{type:String},
    COC_FDI_CompanyName: { type: String},
    FDI_FlatBuildingNumber: { type: String},
    COC_FDI_RBILetter:{type: Date},
    COC_FDIIncorporationDate: { type: Date},
    COC_FDIBusPanNo: { type: String},
    COC_FDIRegOfficeAddress: { type: String},
    COC_FDICity: { type: String},
    COC_FDIState: { type: String},
    COC_FDIPincode:{type: Number},
    COC_FDI_Email: { type: String},
    COC_FDIMobile: { type: Number},
    COC_FDITelephone:{type: String},
    COC_FDIFAX: { type:Number},
    COC_FDI_AuthPerson: { type: String},
    COC_FDI_AuthPersonAddress:{type: String},
    COC_FDI_AuthPAN: { type: String},
    COC_FDI_AuthDesignation: { type: String}, 
    COC_FDI_BusinessAct: { type: String},
    SelectCOC_FDINICCodeDesDetails:[{ Year:{type: Number},Class:{type:String},DescriptionClass:{type:String}}],
    COC_FDIFemaRegNoDetails: [{ COC_FDINatContDes:{type:String},COC_FDINatContname:{type:String}}],
    COC_FDIGSTNo: { type: Number},
    SelectCOC_FDICenResDetails: [{ RegionalOffice:{type:String},Address:{type:String}}],
    COC_FDI_CompoundSubject: { type: String},
    COC_FDI_CompoundRef: { type: String},
    COC_FDI_CompoundAppFee: { type: String},
    COC_FDI_CompoundDemandNo: { type: String},
    COC_FDI_CompoundDemandDate: { type: Date},
    COC_FDI_CompoundCity: { type: String},
    BackSubmissionDetails: [{ COC_FDI_Background:{type:String}}],
    RegulatorySubmissionDetails: [{ COC_FDI_Regulatory:{type:String}}],
    DelayReasonsSubmissionDetails: [{ COC_FDI_DelayReasons:{type:String}}],
    PetitionRequestSubmissionDetails: [{ COC_FDI_PetitionRequest:{type:String}}],
    TransactionSubmissionDetails: [{ COC_FDI_Transaction:{type:String}}],
    COC_FDIODIName: { type: String},
    COC_FDIODIDate: { type: String},
    COC_FDIODIDetailforeign:{type:String},
    COC_FDIODIPAN: { type: String},
    COC_FDIODIActivities: { type: String},
    COC_FDIODIaboutforegien: { type: String},
    COC_FDIODITabADetails: [{
        COC_FDIODITabARemitterName:{type:String},
        COC_FDIODITabAAmount:{type:Number},
        COC_FDIODITabAReceiptDate:{type:Date},
        COC_FDIODITabAReportedDate:{type:String},
        COC_FDIODITabADelay:{type:String}
        }],
        COC_FDIODITableBDetails: [{
        COC_FDIODITabBInvestorName:{type:String},
        COC_FDIODITabBShareDate:{type:Date},
        COC_FDIODITabBNumofShare:{type:String},
        COC_FDIODITabBAmtofShare:{type:String},
        COC_FDIODITabBReportingDate:{type:Date},
        COC_FDIODITabBDelay:{type:String}
                          }],
COC_FDIODITableCDetails: [{
        COC_FDIODITabCRemitterName:{type:String},
        COC_FDIODITabCAmount:{type:String},
        COC_FDIODITabCReceiptDate:{type:Date},
        COC_FDIODITabCExcessshare:{type:String},
        COC_FDIODITabCDateRefund:{type:Date},
        COC_FDIODITabCForexAmt:{type:String},
        COC_FDIODITabCapprovaldate:{type:Date}
                             }],
COC_FDIODIAuthorisedCapitalDetails: [{
        COC_FDIODIAuthorisedCapital:{type:String},
        COC_FDIODIAuthorisedDate:{type:Date},       
        COC_FDIODIAuthorisedEffect:{type:String},
        COC_FDIODIAuthorisedMeetDate:{type:Date},
        COC_FDIODIAuthorisedROCDate:{type:String}
            }],
    
    
}, {
    collection: 'formcoc'
 })
 module.exports = mongoose.model('FormCoc', FormCoc)