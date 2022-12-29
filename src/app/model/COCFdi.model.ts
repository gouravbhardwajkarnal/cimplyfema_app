export class COC_FDI_DetailsList {
  COC_FDICIN: string;
  COC_FDI_CompanyName: string;
  COC_FDIIncorporationDate: Date;
  COC_FDIBusPanNo: string;
  COC_FDIRegOfficeAddress: string;
  COC_FDICity: string;
  COC_FDIState: string;
  COC_FDIPincode: number;
  COC_FDI_Email: string;
  COC_FDIMobile: string;
  COC_FDIFAX: string;
  COC_FDITelephone: string;
  COC_FDI_AuthPerson: string;
  COC_FDI_AuthPersonAddress: string;
  COC_FDI_AuthPAN: string;
  COC_FDI_AuthDesignation: string;
  COC_FDI_BusinessAct: string;
  SelectCOC_FDINICCodeDesArray: any = [];
  COC_FDIFemaRegNoArray: any = [];
  COC_FDIGSTNo: string;
  SelectCOC_FDICenResArray: any = [];
  COC_FDI_CompoundSubject: string;
  COC_FDI_CompoundRef: string;
  COC_FDI_CompoundAppFee: string;
  COC_FDI_CompoundDemandNo: string;
  COC_FDI_CompoundDemandDate: string;
  COC_FDI_CompoundCity: string;
  BackSubmissionArray: any = [];
  TransactionSubmissionArray: any = [];
  RegulatorySubmissionArray: any = [];
  DelayReasonsSubmissionArray: any = [];
  PetitionRequestSubmissionArray: any = [];
  COC_FDIODIName: string;
  COC_FDIODIDate: string;
  COC_FDIODIPAN: string;
  COC_FDIODIActivities: string;
  COC_FDIODIaboutforegien: string;
  COC_FDIODIDetailforeign: string;
}
export class CompoundingBackList {
  COC_FDI_Background: string;
}
export class CompoundingTransactionList {
  COC_FDI_Transaction: string;
}
export class CompoundingRegulatoryList {
  COC_FDI_Regulatory: string;
}
export class CompoundingDelayReasonsList {
  COC_FDI_DelayReasons: string;
}
export class CompoundingPetitionRequestList {
  COC_FDI_PetitionRequest: string;
}
export class COC_FDIODITableAList {
  COC_FDIODITabARemitterName: string;
  COC_FDIODITabAAmount: string;
  COC_FDIODITabAReceiptDate: Date;
  COC_FDIODITabAReportedDate: Date;
  COC_FDIODITabADelay: string;
}
export class COC_FDIODITableBList {
  COC_FDIODITabBInvestorName: string;
  COC_FDIODITabBShareDate: Date;
  COC_FDIODITabBNumofShare: string;
  COC_FDIODITabBAmtofShare: string;
  COC_FDIODITabBReportingDate: Date;
  COC_FDIODITabBDelay: string;
}
export class COC_FDIODITableCList {
  COC_FDIODITabCRemitterName: string;
  COC_FDIODITabCAmount: string;
  COC_FDIODITabCReceiptDate: Date;
  COC_FDIODITabCExcessshare: string;
  COC_FDIODITabCDateRefund: Date;
  COC_FDIODITabCForexAmt: string;
  COC_FDIODITabCapprovaldate: string;
}
export class COC_FDIODIAuthorisedCapitalList {
  COC_FDIODIAuthorisedDate: string;
  COC_FDIODIAuthorisedCapital: string;
  COC_FDIODIAuthorisedEffect: string;
  COC_FDIODIAuthorisedMeetDate: Date;
  COC_FDIODIAuthorisedROCDate: string;
}

// Step 5 ECBDetailsList
export class COC_ECBDetailsList {
  COC_ECBDetailLrn: string;
  COC_ECBDetailDescription: string;
  COC_ECBDetailLoanCurency: string;
  COC_ECBDetailAmountFcy: string;
  COC_ECBDetailAmountInr: string;
  COC_ECBDetailTransactionDate: Date;
}

export class COC_ECBRepaymentList {
  COC_ECBRepaymentDrawn: Date;
  COC_ECBRepaymentAmountFc: String;
  COC_ECBRepaymentAmountInr: String;
}

export class COC_ODIRemittanceList {
  COC_ODIRemittanceDate: Date;
  COC_ODIRemittanceAmountFcy: string;
  COC_ODIRemittanceAmountInr: string;
}

export class COC_ODIReceiptShareList {
  COC_ODIShareNumber: string;
  COC_ODIReceiptDate: Date;
}

export class COC_ODIAprsDetailList {
  COC_ODIAprTransactionNo: string;
  COC_ODIAprPeriodEnded: string;
  COC_ODIAprSubmissionDate: Date;
}

export class COC_LiasonOfficeDetailsList {
  COC_LiasonOfficeDate: Date;
  COC_LiasonOfficePeriod: string;
}

export class COC_LiasonAnnualActivityList {
  COC_LiasonFinancialYear: string;
  COC_LiasonAnnualSubmissionDate: Date;
}
