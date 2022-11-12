import { Component,Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Iinvestment {
  investment_name: string;
  investment_pan: string;
  investment_LEI: string;
  investment_pin: number;
  investment_Address: string;
  investment_City:string
}
@Component({
  selector: 'app-form-fc',
  templateUrl: './form-fc.component.html',
  styleUrls: ['./form-fc.component.css']
})
export class FormFcComponent implements OnInit {

reactiveForm!: FormGroup;
investment_model:Iinvestment; 
  @Input() name: string;
  activeTab: any;
IsActive: any;
div1:boolean=true;
div2:boolean=false;
div3:boolean=false;
div4:boolean=false;
div5:boolean=false;

div1Function(){
    this.div1=true;
    this.div2=false;
    this.div3=false;
    this.div4=false;
    this.div5=false;
}

div2Function(){
    this.div2=true;
    this.div1=false;
    this.div3=false;
    this.div4=false;
    this.div5=false;
}

div3Function(){
    this.div3=true;
    this.div2=false;
    this.div1=false
    this.div4=false;
    this.div5=false;
}
div4Function(){
  this.div4=true;
  this.div3=false;
  this.div2=false;
  this.div1=false
  this.div5=false;
}
div5Function(){
  this.div4=false;
  this.div3=false;
  this.div2=false;
  this.div1=false;
  this.div5=true;
}
tabOpen(id) {
  debugger
  if(id=1)
  {
  this.IsActive="tab-pane active";
  }
}


constructor(private readonly route: ActivatedRoute) {

  this.investment_model = {} as Iinvestment;
}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      investment_name: new FormControl(this.investment_model.investment_name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      investment_pan: new FormControl(this.investment_model.investment_pan, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(1),
      ]),
      investment_LEI: new FormControl(this.investment_model.investment_LEI, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        // emailValidator(),
      ]),
      investment_pin: new FormControl(this.investment_model.investment_pin, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      investment_Address: new FormControl(this.investment_model.investment_Address, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      investment_City: new FormControl(this.investment_model.investment_City, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      
    });
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
  get investment_Address()
  {
    return this.reactiveForm.get('investment_Address')!;
  }
  get investment_City()
  {
    return this.reactiveForm.get('investment_City')!;
  }
  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.investment_model = this.reactiveForm.value;
  }

}
