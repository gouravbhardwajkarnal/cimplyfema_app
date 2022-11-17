export interface Iinvestment {
    investment_name: string;
    investment_pan: string;
    investment_LEI: string;
    investment_pin: number;
    investment_Address: string;
    investment_City:string;
    investment_GroupIE: string;
    investment_ContactPerson: string;
    investment_CPDesignation: string;
    investment_TelephoneNumber: string;
    investment_MobileNumber:string;
    investment_Email: string;
    investment_AmountINR: string;
    investment_NetWorth: string;
    investment_NetWorthDate: string;  
}
export interface IinvestmentWOS {
    investment_ForeignEntity: string;
    investment_Jurisdiction: string;
    investment_DateIncorpation: string;
    investment_LEI: number;
    investment_ControlFE: string;
    investment_AccountingYear:string;
    investment_Email: string; 
}
export interface IinvestmentSDS {
    investment_SDS_Name: string;
    investment_SDS_Level: string;
    investment_SDS_Jurisdiction: string;
    investment_SDS_ParentName: number;
    investment_SDS_ParentLevel: string;
    investment_SDS_ParentJurisdiction: string;
    investment_SDS_InvestmentAmount: string; 
    investment_SDS_InvestmentDate: Date; 
    investment_SDS_LEI: string; 
    investment_SDS_Type: string; 
    investment_SDS_1987NIC: string; 
    investment_SDS_2008NIC: string; 
    investment_SDS_Stake: number; 
}

