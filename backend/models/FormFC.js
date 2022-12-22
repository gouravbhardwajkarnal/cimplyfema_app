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
    }]
}, {
    collection: 'Formfc'
})
module.exports = mongoose.model('Formfc', Formfc)