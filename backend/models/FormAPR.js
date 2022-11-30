const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

// Define collection and schema
let FormAPR = new Schema({
   APR_Authorized_NameDes:
   {
      type: String
   },
   APR_Authorized_Signature:
   {
      type: String
   },
   APR_Consultancyfee_CurYear:
   {
      type: Number
   },
   APR_Consultancyfee_commencement:
   {
      type: Number
   },
   APR_Dec_A:
   {
      type: Boolean
   },
   APR_Dec_B:
   {
      type: Boolean
   },
   APR_Dec_C:
   {
      type: Boolean
   },
   APR_Dec_D:
   {
      type: Boolean
   },
   APR_Dec_Date:
   {
      type: Date
   },
   APR_Dec_E:
   {
      type: Boolean
   },
   APR_Dec_Email:
   {
      type: String
   },
   APR_Dec_Place:
   {
      type: String
   },
   APR_Dec_Stamp:
   {
      type: String
   },
   APR_Dec_Telephone:
   {
      type: String
   },
   APR_Dividend_CurYear:
   {
      type: Number
   },
   APR_Dividend_Current:
   {
      type: Number
   },
   APR_Dividend_Last:
   {
      type: Number
   },
   APR_Dividend_commencement:
   {
      type: Number
   },
   APR_EquityExport_CurYear:
   {
      type: Number
   },
   APR_EquityExport_commencement:
   {
      type: Number
   },
   APR_FDIforeign_CurYear:
   {
      type: Number
   },
   APR_FDIforeign_commencement:
   {
      type: Number
   },
   APR_FE_Control:
   {
      type: String
   },
   APR_Foreign_Amount:
   {
      type: Number
   },
   APR_Foreign_Share:
   {
      type: Number
   },
   APR_From_Date:
   {
      type: Date
   },
   APR_Indian_Amount:
   {
      type: Number
   },
   APR_Indian_Share:
   {
      type: Number
   },
   APR_Others_CurYear:
   {
      type: Number
   },
   APR_Others_commencement:
   {
      type: Number
   },
   APR_Profit_CurYear:
   {
      type: Number
   },
   APR_Profit_Current:
   {
      type: Number
   },
   APR_Profit_Last:
   {
      type: Number
   },
   APR_Profit_commencement:
   {
      type: Number
   },
   APR_Repayment_CurYear:
   {
      type: Number
   },
   APR_Repayment_commencement:
   {
      type: Number
   },
   APR_Retained_CurYear:
   {
      type: Number
   },
   APR_Retained_commencement:
   {
      type: Number
   },
   APR_Royalties_CurYear:
   {
      type: Number
   },
   APR_Royalties_commencement:
   {
      type: Number
   },
   APR_Technical_CurYear:
   {
      type: Number
   },
   APR_Technical_commencement:
   {
      type: Number
   },
   APR_To_Date:
   {
      type: Date
   },
   APR_UIN:
   {
      type: String
   },
   APR_Worth_Current:
   {
      type: Number
   },
   APR_Worth_Last:
   {
      type: Number
   },
   APR_exces_sshare_CurYear:
   {
      type: Number
   },
   APR_exces_sshare_commencement:
   {
      type: Number
   },
   ShareHoldingFE:[{
      Person:{type:String},
      Pstake:{type:Number},
      ForeignPartner:{type:String},
      FPstake:{type:Number},
      Total: {type:Number},
   }],
   SDSDetails:[{
       investment_SDS_Name: {type:String},
    investment_SDS_Level: {type:String},
    investment_SDS_Jurisdiction: {type:String},
    investment_SDS_ParentName: {type:String},
    investment_SDS_ParentLevel: {type:String},
    investment_SDS_ParentJurisdiction: {type:String},
    investment_SDS_InvestmentAmount: {type:Number},
    investment_SDS_InvestmentDate: {type:Date},
    investment_SDS_LEI: {type:String},
    investment_SDS_Type: {type:String},
    investment_SDS_1987NIC: {type:String}, 
    investment_SDS_2008NIC: {type:String},
    investment_SDS_Stake:{type:Number},
   }],

},
   {
      collection: 'formapr'
   })

module.exports = mongoose.model('FormAPR', FormAPR)