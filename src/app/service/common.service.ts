import { Injectable } from '@angular/core';
import { DisinvetmentType } from "src/app/model/common.model";

@Injectable()
export class CommonService {
  disinvestmenttypes : DisinvetmentType[] = [
    {id : 1, name : "Investigation"},
    {id : 2, name : "Wilful Defaulter"},
    {id : 3, name : "NPA Account"}
  ];

  constructor() { }
  getAllDisinvestmentTypes() : DisinvetmentType[]{
    return this.disinvestmenttypes;
  }
}