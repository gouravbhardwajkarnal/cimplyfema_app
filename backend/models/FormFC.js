const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Formfc = new Schema({
    CertificateDetails: [{
        investment_Group_Date: { type: Date },
        investment_Group_Email: { type: String },
        investment_Group_NameAudit: { type: String },
        investment_Group_Place: { type: String },
        investment_Group_RegistrationNo: { type: String },
        investment_Group_Signature: { type: String },
        investment_Group_Stamp: { type: String },
        investment_Group_Telephone: { type: String },
        investment_Group_UDIN: { type: String },
    }],
    DeclarationDetails: [{
        investment_Individual_Date: { type: Date },
        investment_Individual_Email: { type: String },
        investment_Individual_Place: { type: String },
        investment_Individual_Stamp: { type: String },
        investment_Individual_Telephone: { type: String },
        investment_individual_A: { type: Boolean },
        investment_individual_B: { type: Boolean },
        investment_individual_C: { type: Boolean },
        investment_individual_D: { type: Boolean },
        investment_individual_E: { type: Boolean },
        investment_individual_F: { type: Boolean },
        investment_individual_G: { type: Boolean },
    }],
    FCDetails: [{
        EntityName: { type: String },
        FCY: { type: Number },
        INR: { type: Number },
    }],
    FC_FDINICCodeDesDetails: [{
        Year: { type: Number },
        Class: { type: String },
        DescriptionClass: { type: String },
    }],
    FC_SDS_Control: { type: String },
    FinancialCommitmentDetails: [{
        InvestSource: { type: String },
        CategoryType: { type: String },
        Date: { type: Date }, AmountFCY: { type: Number }, AmountINR: { type: Number }
    }],
    InvestmentDetails: [
        { DisinvestmentType: { type: String }, FromDate: { type: Date }, ToDate: { type: Date }, Name: { type: String } }
    ],
    JVWOSDetails: [{
        investment_AccountingYear: { type: String },
        investment_ControlFE: { type: String },
        investment_DateIncorpation: { type: Date },
        investment_ForeignEntity: { type: String },
        investment_Jurisdiction: { type: String },
        investment_WOS_Email: { type: String },
        investment_WOS_LEI: { type: String },
    }],
    PEFEntityDetails: [{
        NameFE: { type: String },
        UIN: { type: String },
        BankName: { type: String }
    }],
    SDSDetails: [{
        investment_SDS_Name: { type: String },
        investment_SDS_Level: { type: String },
        investment_SDS_Jurisdiction: { type: String },
        investment_SDS_ParentName: { type: String },
        investment_SDS_ParentLevel: { type: String },
        investment_SDS_ParentJurisdiction: { type: String },
        investment_SDS_InvestmentAmount: { type: Number },
        investment_SDS_InvestmentDate: { type: Date },
        investment_SDS_LEI: { type: String },
        investment_SDS_Type: { type: String },
        investment_SDS_1987NIC: { type: String },
        investment_SDS_2008NIC: { type: String },
        investment_SDS_Stake: { type: Number },
    }],
    ShareHoldingDetails: [{
        Person: { type: String },
        Pstake: { type: Number },
        ForeignPartner: { type: String },
        FPstake: { type: Number },
        Total: { type: Number },
    }],
    WOSFC_FDINICCodeDesDetails: [{
        Year: { type: Number },
        Class: { type: String },
        DescriptionClass: { type: String },
    }],
    DisinvestmentMethodDetails:[{
        Method: { type: String },
        Details: { type: String },
    }],
    investment_INR: { type: Number },
    investment_Route: { type: String },
    investment_UIN: { type: String },
    investment_USD: { type: Number },
    investorDetails: [{
        investor_Address: { type: String },
        investor_CIN: { type: String },
        investor_CPDesignation: { type: String },
        investor_City: { type: String },
        investor_ContactPerson: { type: String },
        investor_Email: { type: String },
        investor_GroupIE: { type: String },
        investor_LEI: { type: String },
        investor_Mobile: { type: Number },
        investor_NetworthAmount: { type: Number },
        investor_NetworthDate: { type: Date },
        investor_Pin: { type: Number },
        investor_State: { type: String },
        investor_TelephoneNumber: { type: String },
        investor_name: { type: String },
        investor_pan: { type: String },
    }],
    RestructuringDetails: [{
        restructing_Name_IE: { type: String },
        restructing_PAN_IE: { type: String },
        restructing_Name_FE: { type: String },
        restructing_Date: { type: Date },
        restructing_Valuation_Date: { type: Date },
        restructing_Stake_FE: { type: Number },
        restructing_Stake_PostRestructing: { type: Number },
        restructing_Total_ALosses: { type: Number },
        restructing_Proportionate_Amount: { type: Number },
        restructing_Total_Outstanding: { type: Number },
        restructing_Equity_FC: { type: Number },
        restructing_Equity_AD: { type: Number },
        restructing_Equity_TotalFC: { type: Number },
        restructing_Debt_FC: { type: Number },
        restructing_Debt_AD: { type: Number },
        restructing_Debt_TotalFC: { type: Number },
        restructing_Guarantee_FC: { type: Number },
        restructing_Guarantee_AD: { type: Number },
        restructing_Guarantee_TotalFC: { type: Number },
        restructing_Receivables_FC: { type: Number },
        restructing_Receivables_AD: { type: Number },
        restructing_Receivables_TotalFC: { type: Number },
        restructing_Ainterest_FC: { type: Number },
        restructing_Ainterest_AD: { type: Number },
        restructing_Ainterest_TotalFC: { type: Number },
        restructing_BDividend_FC: { type: Number },
        restructing_BDividend_AD: { type: Number },
        restructing_BDividend_TotalFC: { type: Number },
        restructing_COther_FC: { type: Number },
        restructing_COther_AD: { type: Number },
        restructing_COther_TotalFC: { type: Number },

        restructing_IE_Place: { type: String },
        restructing_AD_Place: { type: String },
        restructing_IE_Date: { type: Date },
        restructing_AD_Date: { type: Date },
        restructing_IE_Signature: { type: String },
        restructing_AD_Signature: { type: String },
        restructing_IE_Name: { type: String },
        restructing_AD_Name: { type: String },
        restructing_IE_Designation: { type: String },
        restructing_AD_Designation: { type: String },
        restructing_IE_Telephone:{ type: String },
        restructing_AD_Telephone:{ type: String },
        restructing_IE_Email: { type: String },
        restructing_AD_Email:{ type: String },
        restructing_IE_A: { type: Boolean },
        restructing_IE_B: { type: Boolean },
        restructing_IE_B1:  { type: Boolean },
        restructing_IE_C:  { type: Boolean },
        restructing_IE_C1: { type: Boolean }

    }],
    DisinvestmentDetails: [{
        disinvestment_Name_IE: { type: String },
        disinvestment_PAN_IE: { type: String },
        disinvestment_Date: { type: Date },
        disinvestment_Route: { type: String },
        disinvestment_Type: { type: String },
        disinvestment_Stake_Time: { type: Number },
        disinvestment_Stake_Partial: { type: Number },
        disinvestment_Total_Fair: { type: Number },
        disinvestment_ValuationDate: { type: Date },
        disinvestment_SubmissionDate: { type: Date },
        disinvestment_APRPeriod: { type: Date },
        disinvestment_Equity_FC: { type: Number },
        disinvestment_Equity_AD: { type: Number },
        disinvestment_Equity_ADAPR: { type: Number },
        disinvestment_Equity_WriteOff: { type: Number },
        disinvestment_Loan_FC: { type: Number },
        disinvestment_Loan_AD: { type: Number },
        disinvestment_Loan_ADAPR: { type: Number },
        disinvestment_Loan_WriteOff: { type: Number },
        disinvestment_Issued_FC: { type: Number },
        disinvestment_Issued_AD: { type: Number },
        disinvestment_Issued_ADAPR: { type: Number },
        disinvestment_Issued_WriteOff: { type: Number },
        disinvestment_Invoked_FC: { type: Number },
        disinvestment_Invoked_AD: { type: Number },
        disinvestment_Invoked_ADAPR: { type: Number },
        disinvestment_Invoked_WriteOff: { type: Number },

        disinvestment_IE_Place: { type: String },
        disinvestment_AD_Place: { type: String },
        disinvestment_IE_Date: { type: Date },
        disinvestment_AD_Date: { type: Date },
        disinvestment_IE_Signature: { type: String },
        disinvestment_AD_Signature: { type: String },
        disinvestment_IE_Name: { type: String },
        disinvestment_AD_Name: { type: String },
        disinvestment_IE_Designation: { type: String },
        disinvestment_AD_Designation: { type: String },
        disinvestment_IE_Telephone:{ type: String },
        disinvestment_AD_Telephone:{ type: String },
        disinvestment_IE_Email: { type: String },
        disinvestment_AD_Email:{ type: String },

        disinvestment_IE_A: { type: Boolean },
        disinvestment_IE_B: { type: Boolean },
        disinvestment_IE_C:  { type: Boolean },
        disinvestment_IE_D:  { type: Boolean },
        disinvestment_IE_E: { type: Boolean },
        disinvestment_IE_F: { type: Boolean },
        disinvestment_IE_G: { type: Boolean },

    }]
}, {
    collection: 'Formfc'
})
module.exports = mongoose.model('Formfc', Formfc)