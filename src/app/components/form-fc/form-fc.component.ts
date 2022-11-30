import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iinvestment } from 'src/app/model/iinvestment';
import { ApiService } from 'src/app/service/api.service';
import { CodeClassGrid, DynamicGrid, FCDisinvestmentGrid, PEFEntityGrid, ShareHoldingFEGrid, SumFCGrid } from 'src/app/model/gridmodel';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CommonService } from "src/app/service/common.service";

@Component({
  selector: 'app-form-fc',
  templateUrl: './form-fc.component.html',
  styleUrls: ['./form-fc.component.css']
})
export class FormFcComponent implements OnInit {
  disinvetmenttype: DisinvetmentType[];
  CityList: any = [];
  // reactiveForm!: FormGroup;
  public reactiveForm: FormGroup;

  investment_model: Iinvestment;
  @Input() name: string;

  dynamicArray: Array<DynamicGrid> = [];
  sumFCArray: Array<SumFCGrid> = [];
  FCDisinvestmentArray: Array<FCDisinvestmentGrid> = [];
  PEFEntityArray: Array<PEFEntityGrid> = [];
  CodeClassArray: Array<CodeClassGrid> = [];
  ShareHoldingFEArray: Array<ShareHoldingFEGrid> = [];
  ShareHoldingFE: any = {};
  ShareHoldingFElength: number = 0;

  codeClass: any = {};
  codeClasslength: number = 0;
  TotalPstake: number = 0;
  TotalFPstake: number = 0;
  Totalstake: number = 0;

  sumFC: any = {};
  sumFClength: number = 0;
  FCDisinvestment: any = {};
  FCDisinvestmentlength: number = 0;
  PEFEntity: any = {};
  PEFEntitylength: number = 0;
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService, private commonservice: CommonService, private fb: FormBuilder) {
    this.reactiveForm = this.fb.group({
      investment_name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_pan: ['', Validators.required, Validators.maxLength(10), Validators.minLength(1)],
      investment_LEI: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_GroupIE: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_Address: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_City: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_pin: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_ContactPerson: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_CPDesignation: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_TelephoneNumber: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_MobileNumber: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_Email: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_NetWorth: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_AmountINR: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_NetWorthDate: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
      investment_ForeignEntity: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Jurisdiction: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_DateIncorpation: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_WOS_LEI: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_ControlFE: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_AccountingYear: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_WOS_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Individual_Place: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Individual_Date: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Individual_Stamp: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Individual_Telephone: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Individual_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Signature: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Place: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Date: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Stamp: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Telephone: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_Group_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      investment_individual_A: ['',Validators.required],
      investment_individual_B:['',Validators.required],
      investment_individual_C: ['',Validators.required],
      investment_individual_D:['',Validators.required],
      investment_individual_E: ['',Validators.required],
      investment_individual_F:['',Validators.required],
      investment_individual_G: ['',Validators.required],

      disinvestment_UIN: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],

    });
    this.disinvetmenttype = commonservice.getAllDisinvestmentTypes();
    console.log(this.disinvetmenttype);
    this.investment_model = {} as Iinvestment;
    this.readCity();
  }

  ngOnInit(): void {
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;

    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    this.codeClasslength = this.CodeClassArray.length;
    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    this.sumFClength = this.sumFCArray.length;
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    this.PEFEntitylength = this.PEFEntityArray.length;
    // this.reactiveForm = new FormGroup({

    //   investment_LEI: new FormControl(this.investment_model.investment_LEI, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //     // emailValidator(),
    //   ]),
    //   investment_pin: new FormControl(this.investment_model.investment_pin, [
    //     Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(6),
    //   ]),
    //   investment_Address: new FormControl(this.investment_model.investment_Address, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_City: new FormControl(this.investment_model.investment_City, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_GroupIE: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_ContactPerson: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_CPDesignation: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_TelephoneNumber: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_MobileNumber: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_Email: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_NetWorth: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_AmountINR: new FormControl(this.investment_model.investment_AmountINR, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_NetWorthDate: new FormControl(this.investment_model.investment_NetWorthDate, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),


    // });
  }

  addPEFEntity() {
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    console.log(this.PEFEntityArray);
    this.PEFEntitylength = this.PEFEntityArray.length;
    return true;
  }
  deletePEFEntity(index) {
    if (this.PEFEntityArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.PEFEntityArray.splice(index, 1);
      this.PEFEntitylength = this.PEFEntityArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addFCDisinvestment() {
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    console.log(this.FCDisinvestmentArray);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    return true;
  }
  deleteFCDisinvestment(index) {
    if (this.FCDisinvestmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FCDisinvestmentArray.splice(index, 1);
      this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addsumFC() {
    debugger;
    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    console.log(this.sumFCArray);
    this.sumFClength = this.sumFCArray.length;
    return true;
  }
  deletesumFC(index) {
    if (this.sumFCArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.sumFCArray.splice(index, 1);
      this.sumFClength = this.sumFCArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addCodeClassRow() {
    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    this.codeClasslength = this.CodeClassArray.length;

    return true;
  }
  deleteCodeClassRow(index) {
    if (this.CodeClassArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.CodeClassArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
  }
  addShareHoldingFE() {
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;
    this.TotalPstake=0;
    this.TotalFPstake=0;
    this.Totalstake =0;
    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake +=  element.FPstake;
      this.Totalstake +=  element.Total;

    });
    return true;
  }

  deleteShareHoldingFE(index) {
    if (this.ShareHoldingFEArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.ShareHoldingFEArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row'); 
      this.TotalPstake=0;
      this.TotalFPstake=0;
      this.Totalstake =0; 
      this.ShareHoldingFEArray.forEach(element => {
        this.TotalPstake += element.Pstake;
        this.TotalFPstake +=  element.FPstake;
        this.Totalstake +=  element.Total;
      });
      return true;
    }
  }
  public validate(): void {
    debugger;
    this.investment_model = this.reactiveForm.value;
    this.investment_model.investment_SumFC = this.sumFCArray;
    this.investment_model.investment_FCDisinvestment = this.FCDisinvestmentArray;
    this.investment_model.investment_PEFEntity = this.PEFEntityArray;
    this.investment_model.investment_ActivityCode = this.CodeClassArray;
    this.investment_model.investment_ShareHoldingFE=this.ShareHoldingFEArray;
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }


    console.log(this.investment_model);
  }

  get investment_name() {
    return this.reactiveForm.get('investment_name')!;
  }
  get investment_pan() {
    return this.reactiveForm.get('investment_pan')!;
  }
  get investment_LEI() {
    return this.reactiveForm.get('investment_LEI')!;
  }
  get investment_pin() {
    return this.reactiveForm.get('investment_pin')!;
  }
  get investment_Address() {
    return this.reactiveForm.get('investment_Address')!;
  }
  get investment_City() {
    return this.reactiveForm.get('investment_City')!;
  }
  get investment_CPDesignation() {
    return this.reactiveForm.get('investment_CPDesignation')!;
  }
  get investment_ContactPerson() {
    return this.reactiveForm.get('investment_ContactPerson')!;
  }
  get investment_TelephoneNumber() {
    return this.reactiveForm.get('investment_GroupIE')!;
  }
  get investment_MobileNumber() {
    return this.reactiveForm.get('investment_MobileNumber')!;
  }
  get investment_Email() {
    return this.reactiveForm.get('investment_Email')!;
  }
  get investment_GroupIE() {
    return this.reactiveForm.get('investment_GroupIE')!;
  }
  get investment_NetWorth() {
    return this.reactiveForm.get('investment_NetWorth');
  }
  get investment_AmountINR() {
    return this.reactiveForm.get('investment_AmountINR');
  }
  get investment_NetWorthDate() {
    return this.reactiveForm.get('investment_NetWorthDate');
  }
  get investment_Individual_Place() {
    return this.reactiveForm.get('investment_Individual_Place');
  }
  get investment_Individual_Date() {
    return this.reactiveForm.get('investment_Individual_Date');
  }
  get investment_Individual_Stamp() {
    return this.reactiveForm.get('investment_Individual_Stamp');
  }
  get investment_Individual_Telephone() {
    return this.reactiveForm.get('investment_Individual_Telephone');
  }
  get investment_Individual_Email() {
    return this.reactiveForm.get('investment_Individual_Email');
  }
  get investment_Group_Signature() {
    return this.reactiveForm.get('investment_Group_Signature');
  }
  get investment_Group_Name() {
    return this.reactiveForm.get('investment_Group_Name');
  }
  get investment_Group_Place() {
    return this.reactiveForm.get('investment_Group_Place');
  }
  get investment_Group_Date() {
    return this.reactiveForm.get('investment_Group_Date');
  }
  get investment_Group_Stamp() {
    return this.reactiveForm.get('investment_Group_Stamp');
  }
  get investment_Group_Telephone() {
    return this.reactiveForm.get('investment_Group_Telephone');
  }
  get investment_Group_Email() {
    return this.reactiveForm.get('investment_Group_Email');
  }
  get investment_individual_A()
  {
    return this.reactiveForm.get('investment_individual_A');
  }
  get investment_individual_B()
  {
    return this.reactiveForm.get('investment_individual_B');
  }
  get investment_individual_C()
  {
    return this.reactiveForm.get('investment_individual_C');
  }
  get investment_individual_D()
  {
    return this.reactiveForm.get('investment_individual_D');
  }
  get investment_individual_E()
  {
    return this.reactiveForm.get('investment_individual_E');
  }
  get investment_individual_F()
  {
    return this.reactiveForm.get('investment_individual_F');
  }
  get investment_individual_G()
  {
    return this.reactiveForm.get('investment_individual_G');
  }
get disinvestment_UIN()
{
  return this.reactiveForm.get('disinvestment_UIN');
}
  readCity() {
    debugger;
    this.apiService.getCity().subscribe((data) => {

      this.CityList = data;
    });
  }
  public submit() {
    console.log('value: ', this.reactiveForm.value);
    console.log('the whole form and its controls: ', this.reactiveForm)
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
  }
  onBlur(values) {
    console.log(values);
    values.Total = values.FPstake + values.Pstake;
    this.TotalPstake=0;
    this.TotalFPstake=0;
    this.Totalstake =0; 
    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake +=  element.FPstake;
      this.Totalstake +=  element.Total;
    });
  }


}
