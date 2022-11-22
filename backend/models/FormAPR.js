const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let FormAPR = new Schema({
   APR_From_Date:
   {
      type: Date
   },
   APR_tO_Date: {
      type: Date
   },
   Unique_Identification_Number:
   {
      type: Number
   },
   Cap_Struct_Indian_Amount:
   {
      type: Number
   },
   Cap_Struct_Indian_Share:
   {
      type: Number
   },
   Cap_Struct_Foreign_Amount:
   {
      type: Number
   },
   Cap_Struct_Foreign_Share:
   {
      type: Number
   },
   IndianEntityResidentIndividualTrust:
   {
      type: String
   },
   Person_resident_India_1:
   {
      type: String
   },
   Person_resident_India_2:
   {
      type: String
   },
   Person_resident_India_3:
   {
      type: String
   },
   India_Stake_1:
   {
      type: Number
   },
   India_Stake_2:
   {
      type: Number
   },
   Indian_Stake_3:
   {
      type: Number
   },
   Foreign_partner_1:
   {
      type: String
   },
   Foreign_partner_2:
   {
      type: String
   },
   Foreign_partner_3:
   {
      type: String
   },
   Foreign_Stake_1:
   {
      type: Number
   },
   Foreign_Stake_2:
   {
      type: Number
   },
   Foreign_Stake_3:
   {
      type: Number
   },
   FP_NetProfit_Previous_Year:
   {
      type: Number
   },
   FP_NetProfit_Current_Year:
   {
      type: Number
   },
   FP_Dividend_Previous_Year:
   {
      type: Number
   },
   FP_Dividend_Current_Year:
   {
      type: Number
   },
   FP_Networth_Current_Year:
   {
      type: Number
   },
   FP_Networth_Previous_Year:
   {
      type: Number
   },
   Repat_Dividend_CurYear:
   {
      type: Number
   },
   Repat_Dividend_commencement:
   {
      type: Number
   },
   Repat_Repayment_CurYear:
   {
      type: Number
   },
   Repat_Repayment_commencement:
   {
      type: Number
   },
   Repat_EquityExport_CurYear:
   {
      type: Number
   },
   Repat_EquityExport_commencement:
   {
      type: Number
   },
   Repat_Royalties_CurYear:
   {
      type: Number
   },
   Repat_Royalties_commencement:
   {
      type: Number
   },
   Repat_Technical_CurYear:
   {
      type: Number
   },
   Repat_Technical_commencement:
   {
      type: Number
   },
   Repat_Consultancyfee_CurYear:
   {
      type: Number
   },
   Repat_Consultancyfee_commencement:
   {
      type: Number
   },
   Repat_Others_CurYear:
   {
      type: Number
   },
   Repat_Others_commencement:
   {
      type: Number
   },
   Repat_Profit_CurYear:
   {
      type: Number
   },
   Repat_Profit_commencement:
   {
      type: Number
   },
   Repat_Retained_CurYear:
   {
      type: Number
   },
   Repat_Retained_commencement:
   {
      type: Number
   },
   Repat_FDIforeign_CurYear:
   {
      type: Number
   },
   Repat_FDIforeign_commencement:
   {
      type: Number
   },
   Repat_exces_sshare_CurYear:
   {
      type: Number
   },
   Repat_exces_sshare_commencement:
   {
      type: Number
   },
   Furnish_jurisdiction_SDS:
   {
      type: String
   },
   Furnish_jurisdiction_ParentSDS:
   {
      type: String
   },
   Furnish_Investment_Amount:
   {
      type: Number
   },
   Furnish_Investment_Date:
   {
      type: Date
   },
   Furnish_ActivityCd_1987:
   {
      type: String
   },
   Furnish_ActivityCd_2008:
   {
      type: String
   },
   Furnish_Stake_SDS:
   {
      type: Number
   },
   SDS_financial_services:
   {
      type: String
   },
   Furnish_jurisdiction_SDSwoundup:
   {
      type: String
   }, 
   authorized_official_Signature:
   {
      type: String
   }, 
   authorized_official_NameDesignation:
   {
      type: String
   },
   authorized_official_Place:
   {
      type: String
   },
   authorized_official_Telephone:
   {
      type: String
   },
   authorized_official_Email:
   {
      type: String
   },
   authorized_official_Stamp:
   {
      type: String
   },
   Signature_Statutory_Auditors:
   {
      type: String
   },
   Name_Audit_Firm_UDIN:
   {
      type: String
   }, 
   Statutory_Auditors_Place:
   {
      type: String
   },
   Statutory_Auditors_Date:
   {
      type: Date
   },
   Statutory_Auditors_Email:
   {
      type: String
   },
   Statutory_Auditors_Stamp:
   {
      type: String
   },
},
 {
   collection: 'formapr'
})

module.exports = mongoose.model('FormAPR', FormAPR)