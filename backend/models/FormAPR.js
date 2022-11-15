const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let FormAPR = new Schema({
   NameofinvesteeCompany: {
      type: String
   },
   CIN_LIP: {
      type: String
   },
   PanNo: {
      type: String
   },
   ESOP_Scheme_Name: {
      type: String
   },
   BR_EGM_Circular: {
      type: String
   },
   Date_Resolution: {
      type: Date
   },
   Entry_Route: {
      type: String
   },
   Applicable_Sectoral_Cap: {
      type: String
   },
   foreigninvestmentproject: {
      type: String
   },
   Shareholdingpattern: {
      type: String
   },
   Full_Name_Grantee: {
      type: String
   },
   Date_of_Issue: {
      type: Date
   },
   Number_ESOP_Granted: {
      type: Number
   },
   Country: {
      type: String
   },
   ResidentialStatus: {
      type: String
   },
   SubsidiarySDS: {
      type: String
   },
   Pre_determined_issue_price: {
      type: Number
   },
   Conversion_ratio: {
      type: Number
   },
   Equivalent_equity_shares: {
      type: Number
   },
   Facevalue_equity_shares: {
      type: Number
   },
   Value_of_Shares: {
      type: Number
   },
   Non_Debt_Instruments: {
      type: Boolean
   },
   Indian_companies_reconstruction: {
      type: Boolean
   },
   PMLA_UAPA: {
      type: Boolean
   },
   enclose_documents: {
      type: Boolean
   },
   certificate_Company_Secretary: {
      type: Boolean
   },
   SEBI_registered: {
      type: Boolean
   },
   necessary_documents: {
      type: Boolean
   }

}, {
   collection: 'formAPR'
})

module.exports = mongoose.model('FormAPR', FormAPR)