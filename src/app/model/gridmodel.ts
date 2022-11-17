export class DynamicGrid{     
    name:string;  
    email:string;  
    phone:string;  
}
export class SumFCGrid
{
    EntityName: string;
    FCY: string;
    INR: string;
}
export class FCDisinvestmentGrid
{
    DisinvestmentType: string;
    FromDate: Date;
    ToDate: Date;
    Name: string;
}
export class PEFEntityGrid
{
    NameFE:string;
    UIN:string;
    BankName:string
}
export class CodeClassGrid
{
    Description1987:string;
    Description2008:string;
}
export class FinancialCommitmentGrid
{
    InvestSource:string;
    CategoryType:string;
    Date:Date;
    AmountFCY:number;
    AmountINR: number;
}
export class ShareHoldingFEGrid
{
    Person:string;
    Pstake:number;
    ForeignPartner:string;
    FPstake:number;
    Total: number;
}