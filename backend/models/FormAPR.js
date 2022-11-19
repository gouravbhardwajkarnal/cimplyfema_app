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
   Authorized_Place_ADBank:
   {
      type: String
   },
   Authorized_Place_Date: {
      type: Date
   },
   Authorized_Signature_ADBank:
   {
      type: String
   },
   Authorized_Stamp_ADBank:
   {
      type: String
   },
   Authorized_designation_ADBank:
   {
      type: String
   },
   FP_Dividend_Current_Year:
   {
      type: Number
   },
   FP_Dividend_Previous_Year:
   {
      type: Number
   },
   FP_NetProfit_Current_Year:
   {
      type: Number
   },
   FP_NetProfit_Previous_Year:
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
   Foreign_Amount:
   {
      type: Number
   },
   Foreign_Share:
   {
      type: Number
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
   Furnish_ActivityCd_1987:
   {
      type: Number
   },
   Furnish_ActivityCd_2008:
   {
      type: Number
   },
   Furnish_Investment_Amount:
   {
      type: Number
   },
   Furnish_Investment_Date:
   {
      type: Date
   },
   Furnish_Stake_SDS:
   {
      type: Number
   },
   Furnish_jurisdiction_ParentSDS:
   {
      type: String
   },
   Furnish_jurisdiction_SDS:
   {
      type: String
   },
   Furnish_jurisdiction_SDSwoundup:
   {
      type: String
   },
   India_Stake_2:
   {
      type: Number
   },
   India_Stake_3:
   {
      type: Number
   },
   IndianEntityResidentIndividualTrust:
   {
      type: String
   },
   Indian_Amount:
   {
      type: Number
   },
   Indian_Share:
   {
      type: Number
   },
   Indian_Stake_1:
   {
      type: Number
   },
   Name_Audit_Firm_UDIN:
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
   Repat_Consultancyfee_CurYear:
   {
      type: String
   },
   Repat_Consultancyfee_commencement:
   {
      type: String
   },
   Repat_Dividend_CurYear:
   {
      type: String
   },
   Repat_Dividend_commencement:
   {
      type: String
   },
   Repat_EquityExport_CurYear:
   {
      type: String
   },
   Repat_EquityExport_commencement:
   {
      type: String
   },
   Repat_FDIforeign_CurYear:
   {
      type: String
   },
   Repat_FDIforeign_commencement:
   {
      type: String
   },
   Repat_Others_CurYear:
   {
      type: String
   },
   Repat_Others_commencement:
   {
      type: String
   },
   Repat_Profit_CurYear:
   {
      type: String
   },
   Repat_Profit_commencement:
   {
      type: String
   },
   Repat_Repayment_CurYear:
   {
      type: String
   },
   Repat_Repayment_commencement:
   {
      type: String
   },
   Repat_Retained_CurYear:
   {
      type: String
   },
   Repat_Retained_commencement:
   {
      type: String
   },
   Repat_Royalties_CurYear:
   {
      type: String
   },
   Repat_Royalties_commencement:
   {
      type: String
   },
   Repat_Technical_CurYear:
   {
      type: String
   },
   Repat_Technical_commencement:
   {
      type: String
   },
   Repat_exces_sshare_CurYear:
   {
      type: String
   },
   Repat_exces_sshare_commencement:
   {
      type: String
   },
   SDS_financial_services:
   {
      type: String
   },
   Signature_Statutory_Auditors:
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
   Statutory_Auditors_Place:
   {
      type: String
   },
   Statutory_Auditors_Stamp:
   {
      type: String
   },
   Unique_Identification_Number:
   {
      type: Number
   },
   authorized_official_Email:
   {
      type: String
   },
   authorized_official_NameDesign:
   {
      type: String
   },
   authorized_official_Place:
   {
      type: String
   },
   authorized_official_Signature:
   {
      type: String
   },
   authorized_official_Stamp:
   {
      type: String
   },
   authorized_official_Telephone:
   {
      type: Number
   },
   authorized_official_To_Date:
   {
      type: Date
   },
},
 {
   collection: 'formapr'
})

module.exports = mongoose.model('FormAPR', FormAPR)