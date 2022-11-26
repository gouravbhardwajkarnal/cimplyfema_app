import { Injectable } from '@angular/core';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { DisinvetmentType, Modules, SubModules,COCmodules,COCsubmodules,COCssubmodules } from "src/app/model/common.model";

@Injectable()
export class CommonService {
    disinvestmenttypes: DisinvetmentType[] = [
        { id: 1, name: "Investigation" },
        { id: 2, name: "Wilful Defaulter" },
        { id: 3, name: "NPA Account" }
    ];
    Jurisdictiontypes: DisinvetmentType[] = [
        { id: 1, name: "Startup" },
        { id: 2, name: "Strategic Sector" },
        { id: 3, name: "Financial Services" },
        { id: 4, name: "Others" }
    ];
    accountingtypes: DisinvetmentType[] = [
        { id: 1, name: "April - March" },
        { id: 2, name: "Janaury - December" },
        { id: 3, name: "June - July" },
        { id: 4, name: "Others" }
    ];
    invetmentsCategorytypes: DisinvetmentType[] = [
        { id: 1, name: "Equity" },
        { id: 2, name: "Guarantee" },
    ];
    sdstypes: DisinvetmentType[] = [
        { id: 1, name: "SPV" },
        { id: 2, name: "Holding Company" },
        { id: 2, name: "Operating" },
        { id: 2, name: "Operating cum Holding" },
    ];
    sdsleveltypes: DisinvetmentType[] = [
        { id: 1, name: "1st Level" },
        { id: 2, name: "2nd Level" },
        { id: 3, name: "3rd Level" },
    ];
    modules: Modules[] = [
        { id: 1, name: "Foreign Direct Investment" },
        { id: 2, name: "Overseas Direct Investment" }
    ];
    submodules: SubModules[] = [
        { id: 1, name: "Form FCGPR", moduleid: 1 },
        { id: 2, name: "Form FCTRS", moduleid: 1 },
        { id: 3, name: "Form ESOP", moduleid: 1 },
        { id: 4, name: "Form Downstream Investment", moduleid: 1 },
        { id: 5, name: "Form LLP I", moduleid: 1 },
        { id: 6, name: "Form LLP II", moduleid: 1 },
        { id: 7, name: "Form CN", moduleid: 1 },
        { id: 8, name: "Form INVI", moduleid: 1 },
        { id: 9, name: "Form DRR", moduleid: 1 },
        { id: 10, name: "DPIIT Application", moduleid: 1 },
        { id: 11, name: "Form FC ( Overseas Direct Investment)", moduleid: 2 },
        { id: 12, name: "Form APR (Annual Performance Report)", moduleid: 2 },
        { id: 13, name: "Form OPI (Overseas Portfolio Investment)", moduleid: 2 }
    ];
//**************FORM-COCStart*********************//
cocssubmodules:COCssubmodules[]=[
    {id:1,name:"Regulation 13.1(1) and 13.1(2) of Notification No."},
    {id:2,name:"Paragraphs 9(1)A, 9(1)B and 8 of Schedule I to Not"},
    {id:3,name:"Paragraph 2(3) of Schedule I to Notification No. F"},
];
cocmodules: COCmodules[] = [
    { id: 1, name: "Foreign Direct Investment" },
    { id: 2, name: "Overseas Direct Investment" },
    { id: 3, name: "External Commercial Borrowings" },
    { id: 4, name: "Liaison / Branch / Project Office (LOBOPO)" },
    { id: 5, name: "Immovable Property in India" },
    { id: 6, name: "Immovable Property Outside India" },
    { id: 7, name: "Export of Goods and Services" },
    { id: 8, name: "Import of Goods and Services" },
    { id: 9, name: "Insurance" },
    { id: 10, name: "Foreign Exchange Management Act" },
    { id: 11, name: "Foreign Currency Accounts" },
    { id: 12, name: "Deposits & Accounts" },
    { id: 13, name: "Capital Account Transactions" },
    { id: 14, name: "Current Account Transactions" },   
];
cocsubmodules: COCsubmodules[] = [
    { id: 1, name: "Section 10(6) of FEMA 1999",Description:"Section 10(6) of FEMA 1999", moduleid: 1 },
    { id: 2, name: "Regulation 3(2) and Regulation 5(2) of Notification",Description:"Regulation 3(2) and Regulation 5(2) of Notification No. FEMA 14/ 2000- RB, Regulation 3(2)(b) and Regulation 5(2)(c) of Notification No. FEMA 14(R)/ 2016- RB, Regulation 6(3) of Notification No. FEMA 3/2000-RB", moduleid: 2 },
    { id: 3, name: "FEMA 1/2000-RB - Regulation 3(2) read with Master",Description:"FEMA 1/2000-RB - Regulation 3(2) read with Master Directions on Liberated Remittance Scheme - Para A.5", moduleid: 3 },
    { id: 4, name: "Regulation 3 of Notification No. FEMA 10(R) / 2015",Description:"	Regulation 3 of Notification No. FEMA 10(R) / 2015-RB", moduleid: 4 },
    { id: 5, name: "Regulation 13.1(1) and 13.1(2) of Notification No.",Description:"Regulation 13.1(1) and 13.1(2) of Notification No. FEMA 20(R)/2017-RB", moduleid: 5 },
    { id: 6, name: "Paragraphs 9(1)A, 9(1)B and 8 of Schedule I to Not",Description:"	Paragraphs 9(1)A, 9(1)B and 8 of Schedule I to Notification No. FEMA 20/2000-RB", moduleid: 5 },
    { id: 7, name: "Paragraph 2(3) of Schedule I to Notification No. F",Description:"	Paragraph 2(3) of Schedule I to Notification No. FEMA 20(R)/2017-RB", moduleid: 5 },
    { id: 8, name: "Regulation 6(i) of Notification No. FEMA.22/2000-R",Description:"	Regulation 6(i) of Notification No. FEMA.22/2000-RB dated May 03, 2000 (as amended from time to time) read with Para 3(ii) and Annex C of FED Master Direction No.10/2015-16 January 1, 2016", moduleid: 6 },
    { id: 9, name: "FEMA.22(R)/RB-2016 - Regulation 2(e)",Description:"FEMA.22(R)/RB-2016 - Regulation 2(e)", moduleid: 6 },
    { id: 10, name: "FEMA 22(R)/RB-2016 - Regulation 4(f) read with Ann",Description:"FEMA 22(R)/RB-2016 - Regulation 4(f) read with Annex D of Regulation 4(l)", moduleid: 6 },
    { id: 11, name: "FEMA 7(R)/2015-RB - Regulation 3",Description:"FEMA 7(R)/2015-RB - Regulation 3", moduleid: 7 },
    { id: 12, name: "",Description:"", moduleid: 8 },
    { id: 13, name: "",Description:"", moduleid: 9 },
    { id: 14, name: "FEMA 23/ 2000- RB- Regulation 16 (1)(i)",Description:"FEMA 23/ 2000- RB- Regulation 16 (1)(i)", moduleid: 10 },
    { id: 15, name: "FEMA 23(R)/ 2015- RB - Regulation 15(1)(i)",Description:"FEMA 23(R)/ 2015- RB - Regulation 15(1)(i)", moduleid: 10 },
    { id: 16, name: "FEMA.5/2000-RB - Para 3 of Schedule 3",Description:"FEMA.5/2000-RB - Para 3 of Schedule 3", moduleid: 11 },
    { id: 17, name: "FEMA.5(R)/2000-RB - Regulation 3",Description:"FEMA.5(R)/2000-RB - Regulation 3", moduleid:11 },
    { id: 18, name: "FEMA.5/2000-RB - Para 3(A) of Schedule 3 read with",Description:"FEMA.5/2000-RB - Para 3(A) of Schedule 3 read with Regulation 5(1)(iii)", moduleid:11 },
    { id: 19, name: "FEMA 21(R)/2018-RB - Regulation 10(i)",Description:"FEMA 21(R)/2018-RB - Regulation 10(i)", moduleid: 12 },
    { id: 20, name: "FEMA 21(R)/2018-RB - Regulation 8",Description:"FEMA 21(R)/2018-RB - Regulation 8", moduleid: 12 },
    { id: 21, name: "Regulation 5(1), Para D1 and Para D3 of Schedule V",Description:"Regulation 5(1), Para D1 and Para D3 of Schedule V read with Regulation 20A and Regulation 15(iii) of Notification No. FEMA 120/ 2004- RB", moduleid: 13 },
    { id: 22, name: "Regulation 5(1), Para C4, Para D1, Para D3 and Par",Description:"	Regulation 5(1), Para C4, Para D1, Para D3 and Para D4 of Schedule V read with Regulation 20A, Regulation 15(i) and Regulation15 (iii) of Notification No. FEMA 120/ 2004- RB", moduleid: 13 },
    { id: 23, name: "Regulation 5(1) of Notification No. FEMA 120/ 2004",Description:"Regulation 5(1) of Notification No. FEMA 120/ 2004- RB", moduleid: 13 },
    { id: 24, name: "Regulation 6(2)(ii) of Notification No. FEMA 120/",Description:"	Regulation 6(2)(ii) of Notification No. FEMA 120/ 2004- RB", moduleid: 13 },
    { id: 25, name: "Regulation 6(1) read with Para 1 (xiii) of Schedul",Description:"Regulation 6(1) read with Para 1 (xiii) of Schedule I to Notification No. FEMA 3/2000-RB", moduleid: 14 },
    { id: 26, name: "Regulation 4(B)(i) read with Para 12 of Schedule I",Description:"	Regulation 4(B)(i) read with Para 12 of Schedule I to Notification No. FEMA 3(R)/2018-RB", moduleid: 14 },
    { id: 27, name: "Regulation 6(1) read with Para 1(xi) and Para 1(xi",Description:"	Regulation 6(1) read with Para 1(xi) and Para 1(xii) of Schedule 1 to Notification No. FEMA 3/2000-RB", moduleid: 14 },
    { id: 28, name: "Para 1(iii) of Schedule I read with Regulation 6(1",Description:"Para 1(iii) of Schedule I read with Regulation 6(1) of Notification No. FEMA 3/ 2000- RB further read with Para 1(A)(ii)(d)(i) of Annex to A.P. (DIR Series) Circular No. 5 dated August 1, 2005", moduleid: 14 },
    { id: 29, name: "Regulation 3 read with Regulation 5(6) of Notification",Description:"	dRegulation 3 read with Regulation 5(6) of Notification No. FEMA 3/ 2000- RB, Regulation 3 read with Regulation 4.B.(v) of Notification No. FEMA 3(R)/ 2018- RBescription0", moduleid: 14 },
    { id: 30, name: "Regulation 3, Regulation 6(1) read with Para 1(iv)",Description:"	Regulation 3, Regulation 6(1) read with Para 1(iv), Para 1(xi) and Para 1(xii) of Schedule I of Notification No. FEMA 3/ 2000- RB, Regulation 3, Regulation 4 (B)(i) read with Para 11 and Para 12 of Schedule 1 of Notification No. FEMA 3(R)/ 2018- RB", moduleid: 14 },
    { id: 31, name: "Regulation 6(1) read with Para 1(xi) and Para 1(xi",Description:"	Regulation 6(1) read with Para 1(xi) and Para 1(xii) of Schedule I of Notification No. FEMA 3/ 2000- RB, Regulation 4(B)(i) read with Para 11 and Para 12 of Schedule I of Notification No. FEMA 3(R)/ 2018- RB", moduleid: 14 },
    { id: 32, name: "Regulation 4.B (i) read with Para 10 of Schedule I",Description:"Regulation 4.B (i) read with Para 10 of Schedule I of Notification No. FEMA 3(R)/2018-RB", moduleid: 14 },
    { id: 33, name: "Para 11 and Para 12 of Schedule 1 read with Regula",Description:"	Para 11 and Para 12 of Schedule 1 read with Regulation 4 (B)(i) of Notification No. FEMA 3(R)/ 2018- RB, Para 1(1)(i) of Schedule 1 read with Regulation 4(A) of Notification No. FEMA 10(R)/ 2015- RB", moduleid: 14 },
    { id: 34, name: "Regulation 5(3) of Notification No. FEMA 3/ 2000-",Description:"	Regulation 5(3) of Notification No. FEMA 3/ 2000- RB", moduleid: 14 },
    
];
//**************FORM-COCEnd**********************//
    constructor() { }
    getAllDisinvestmentTypes(): DisinvetmentType[] {
        return this.disinvestmenttypes;
    }
    getAllJurisdictiontypes(): DisinvetmentType[] {
        return this.Jurisdictiontypes;
    }
    getAllaccountingtypes(): DisinvetmentType[] {
        return this.accountingtypes;
    }
    getAllinvetmentsCategorytypes(): DisinvetmentType[] {
        return this.invetmentsCategorytypes;
    }
    getAllsdstypes(): DisinvetmentType[] {
        return this.sdstypes;
    }
    getAllsdsleveltypes(): DisinvetmentType[] {
        return this.sdsleveltypes;
    }
    getAllmodules(): Modules[] {
        return this.modules;
    }
    getAllsubmodules(): SubModules[] {
        return this.submodules;
    }
    getCOCmodules(): COCmodules[] {
        return this.cocmodules;
    }
    getCOCsubmodules(): COCsubmodules[] {
        return this.cocsubmodules;
    }

}