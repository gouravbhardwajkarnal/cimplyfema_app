export interface DisinvetmentType {
    id : number;
    name : string;
}
export interface Modules {
    id : number;
    name : string;
}
export interface SubModules {
    id : number;
    name : string;
    moduleid: number;
}
export interface COCmodules {
    id : number;
    name : string;
}

export interface COCssubmodules {
    id : number;
    name : string;
}
export interface COCsubmodules {
    id : number;
    name : string;
    Description : string;
    moduleid: number;
}