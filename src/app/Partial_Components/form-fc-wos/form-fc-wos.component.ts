import { Component,Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CodeClassGrid, FinancialCommitmentGrid, PEFEntityGrid } from 'src/app/model/gridmodel';
import { IinvestmentWOS } from 'src/app/model/iinvestment';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-form-fc-wos',
  templateUrl: './form-fc-wos.component.html',
  styleUrls: ['./form-fc-wos.component.css']
})
export class FormFcWosComponent implements OnInit {
  //reactiveForm!: FormGroup;
  @Input() reactiveForm: FormGroup;
  investment_model: IinvestmentWOS;
  Jurisdictiontypes: DisinvetmentType[];
  accountingtypes: DisinvetmentType[];
  invetmentsCategorytypes: DisinvetmentType[];
  CodeClassArray: Array<CodeClassGrid> = [];
  codeClass: any = {};
  codeClasslength: number = 0;
  FinancialCommitmentArray: Array<FinancialCommitmentGrid> = [];
  FinancialCommitment: any = {};
  FinancialCommitmentlength: number = 0;

  constructor(private commonservice: CommonService,) {
    this.investment_model = {} as IinvestmentWOS;
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.accountingtypes=commonservice.getAllaccountingtypes();
    this.invetmentsCategorytypes=commonservice.getAllinvetmentsCategorytypes();
   }

  ngOnInit(): void {
    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    this.codeClasslength = this.CodeClassArray.length;
    this.FinancialCommitment = { InvestSource: "", CategoryType: "",Date:"",AmountFCY:"",AmountINR: ""}
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
    // this.reactiveForm = new FormGroup({
    //   investment_ForeignEntity: new FormControl(this.investment_model.investment_ForeignEntity, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_Jurisdiction: new FormControl(this.investment_model.investment_Jurisdiction, [
    //     Validators.required,
    //     Validators.maxLength(10),
    //     Validators.minLength(1),
    //   ]),
    //   investment_DateIncorpation: new FormControl(this.investment_model.investment_DateIncorpation, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //     // emailValidator(),
    //   ]),
    //   investment_LEI: new FormControl(this.investment_model.investment_LEI, [
    //     Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(6),
    //   ]),
    //   investment_ControlFE: new FormControl(this.investment_model.investment_ControlFE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_AccountingYear: new FormControl(this.investment_model.investment_AccountingYear, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_Email: new FormControl(this.investment_model.investment_Email, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    // });
  }
  //  get investment_ForeignEntity() {
  //   return this.reactiveForm.get('investment_ForeignEntity')!;
  // }
  // get investment_Jurisdiction() {
  //   return this.reactiveForm.get('investment_Jurisdiction')!;
  // }
  // get investment_DateIncorpation() {
  //   return this.reactiveForm.get('investment_DateIncorpation');
  // }
  // get investment_LEI() {
  //   return this.reactiveForm.get('investment_LEI');
  // }
  // get investment_ControlFE() {
  //   return this.reactiveForm.get('investment_ControlFE');
  // }
  // get investment_AccountingYear  () {
  //   return this.reactiveForm.get('investment_AccountingYear');
  // }
  // get investment_Email() {
  //   return this.reactiveForm.get('investment_Email');
  // }
  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.investment_model = this.reactiveForm.value;
    this.investment_model.investment_WOS_ActivityCode=this.CodeClassArray;
    this.investment_model.investment_WOS_FinancialCommitment=this.FinancialCommitmentArray;
    console.log(this.investment_model);
  }
  addCodeClassRow() {
    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    console.log(this.CodeClassArray);
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
  addFinancialCommitment() {
    this.FinancialCommitment = { InvestSource: "", CategoryType: "",Date:"",AmountFCY:"",AmountINR: ""}
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    console.log(this.FinancialCommitmentArray);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
    return true;
  }
  deleteFinancialCommitment(index) {
    if (this.FinancialCommitmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FinancialCommitmentArray.splice(index, 1);
      this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
    
  }
}
