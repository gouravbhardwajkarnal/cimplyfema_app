import { Injectable } from '@angular/core';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { DisinvetmentType, Modules, SubModules } from "src/app/model/common.model";

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

}