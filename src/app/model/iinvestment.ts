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

