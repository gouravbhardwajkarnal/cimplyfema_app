import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FinancialCommitmentGrid } from 'src/app/model/gridmodel';
import { Disinvestment } from 'src/app/model/iinvestment';

@Component({
  selector: 'app-form-fc-disinvestment',
  templateUrl: './form-fc-disinvestment.component.html',
  styleUrls: ['./form-fc-disinvestment.component.css']
})
export class FormFcDisinvestmentComponent implements OnInit {
  @Input() reactiveForm: FormGroup;
  investment_model: Disinvestment;
  FinancialCommitmentArray: Array<FinancialCommitmentGrid> = [];
  FinancialCommitment: any = {};
  FinancialCommitmentlength: number = 0;
  constructor() { }

  ngOnInit(): void {
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
