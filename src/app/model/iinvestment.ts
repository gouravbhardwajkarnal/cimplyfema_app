import { CodeClassGrid, FCDisinvestmentGrid, FinancialCommitmentGrid, PEFEntityGrid, ShareHoldingFEGrid, SumFCGrid } from "./gridmodel";

export interface Iinvestment extends IinvestmentWOS,IinvestmentSDS,IinvestmentDeclaration {
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
    investment_ForeignEntity: string;
    investment_SumFC: SumFCGrid[];
    investment_FCDisinvestment: FCDisinvestmentGrid[];
    investment_PEFEntity: PEFEntityGrid[];
    investment_ActivityCode: CodeClassGrid[];
    investment_SDSModel: IinvestmentSDS[];
    investment_ShareHoldingFE: ShareHoldingFEGrid[];
}
export interface IinvestmentWOS {
    investment_ForeignEntity: string;
    investment_Jurisdiction: string;
    investment_DateIncorpation: string;
    investment_WOS_LEI: number;
    investment_ControlFE: string;
    investment_AccountingYear:string;
    investment_WOS_Email: string; 
    investment_WOS_ActivityCode: CodeClassGrid[];
    investment_WOS_FinancialCommitment: FinancialCommitmentGrid[];
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
export interface IinvestmentDeclaration
{
    investment_Individual_Place :string;
    investment_Individual_Date :Date;
    investment_Individual_Stamp :string;
    investment_Individual_Telephone :string;
    investment_Individual_Email :string;
    investment_individual_A: boolean;
    investment_individual_B: boolean;
    investment_individual_C: boolean;
    investment_individual_D: boolean;
    investment_individual_E: boolean;
    investment_individual_F: boolean;
    investment_individual_G: boolean;

    investment_Group_Signature :string;
    investment_Group_Name :string;
    investment_Group_Place :string;
    investment_Group_Date :Date;
    investment_Group_Stamp :string;
    investment_Group_Telephone :string;
    investment_Group_Email :string;

}
export interface Disinvestment
{
    disinvestment_UIN: string;
}

