import { Injectable } from '@angular/core';
import { DisinvetmentType } from "src/app/model/common.model";

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
    
}