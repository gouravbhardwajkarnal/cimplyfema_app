import { Component, OnInit } from '@angular/core';
import { DisinvetmentType } from 'src/app/model/common.model';
import { IinvestmentSDS } from 'src/app/model/iinvestment';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-form-fc-sds',
  templateUrl: './form-fc-sds.component.html',
  styleUrls: ['./form-fc-sds.component.css']
})
export class FormFcSdsComponent implements OnInit {
  investment_model: IinvestmentSDS;
  sdstypes: DisinvetmentType[];
  Jurisdictiontypes: DisinvetmentType[];
  sdsleveltypes: DisinvetmentType[];
  SDSArray: Array<IinvestmentSDS> = [];
  SDS: any = {};
  SDSlength: number = 0;
  constructor(private commonservice: CommonService,) {
    this.sdstypes = commonservice.getAllsdstypes();
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.sdsleveltypes = commonservice.getAllsdsleveltypes();
   }

  ngOnInit(): void {
    this.SDS = {  investment_SDS_Name: "",
      investment_SDS_Level: "",
      investment_SDS_Jurisdiction: "",
      investment_SDS_ParentName: "",
      investment_SDS_ParentLevel: "",
      investment_SDS_ParentJurisdiction: "",
      investment_SDS_InvestmentAmount: "",
      investment_SDS_InvestmentDate: "", 
      investment_SDS_LEI: "",
      investment_SDS_Type: "", 
      investment_SDS_1987NIC: "", 
      investment_SDS_2008NIC: "", 
      investment_SDS_Stake: ""}
    this.SDSArray.push(this.SDS);
    this.SDSlength = this.SDSArray.length;
  }
  addSDS() {
    this.SDS = {  
      investment_SDS_Name: "",
      investment_SDS_Level: "",
      investment_SDS_Jurisdiction: "",
      investment_SDS_ParentName: "",
      investment_SDS_ParentLevel: "",
      investment_SDS_ParentJurisdiction: "",
      investment_SDS_InvestmentAmount: "",
      investment_SDS_InvestmentDate: "", 
      investment_SDS_LEI: "",
      investment_SDS_Type: "", 
      investment_SDS_1987NIC: "", 
      investment_SDS_2008NIC: "", 
      investment_SDS_Stake: ""};
    this.SDSArray.push(this.SDS)
    console.log(this.SDSArray);
    this.SDSlength = this.SDSArray.length;
    return true;
  }
  deleteSDS(index) {
    if (this.SDSArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.SDSArray.splice(index, 1);
      this.SDSlength = this.SDSArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
    
  }

}
