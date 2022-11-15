import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IinvestmentWOS } from 'src/app/model/iinvestment';

@Component({
  selector: 'app-form-fc-wos',
  templateUrl: './form-fc-wos.component.html',
  styleUrls: ['./form-fc-wos.component.css']
})
export class FormFcWosComponent implements OnInit {
  reactiveForm: any;
  investment_model: IinvestmentWOS;

  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      investment_name: new FormControl(this.investment_model.investment_ForeignEntity, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      investment_pan: new FormControl(this.investment_model.investment_Jurisdiction, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1),
      ]),
      investment_LEI: new FormControl(this.investment_model.investment_DateIncorpation, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        // emailValidator(),
      ]),
      investment_pin: new FormControl(this.investment_model.investment_LEI, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      investment_Address: new FormControl(this.investment_model.investment_ControlFE, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      investment_City: new FormControl(this.investment_model.investment_AccountingYear, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      investment_GroupIE: new FormControl(this.investment_model.investment_Email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
    });
  }
   get investment_ForeignEntity() {
    return this.reactiveForm.get('investment_ForeignEntity')!;
  }
  get investment_Jurisdiction() {
    return this.reactiveForm.get('investment_Jurisdiction')!;
  }
  get investment_DateIncorpation() {
    return this.reactiveForm.get('investment_DateIncorpation');
  }
  get investment_LEI() {
    return this.reactiveForm.get('investment_LEI');
  }
  get investment_ControlFE() {
    return this.reactiveForm.get('investment_ControlFE');
  }
  get investment_AccountingYear  () {
    return this.reactiveForm.get('investment_AccountingYear');
  }
  get investment_Email() {
    return this.reactiveForm.get('investment_Email');
  }
}
