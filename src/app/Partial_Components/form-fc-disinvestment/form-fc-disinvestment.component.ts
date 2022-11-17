import { Component, OnInit } from '@angular/core';
import { FinancialCommitmentGrid } from 'src/app/model/gridmodel';

@Component({
  selector: 'app-form-fc-disinvestment',
  templateUrl: './form-fc-disinvestment.component.html',
  styleUrls: ['./form-fc-disinvestment.component.css']
})
export class FormFcDisinvestmentComponent implements OnInit {

  FinancialCommitmentArray: Array<FinancialCommitmentGrid> = [];
  FinancialCommitment: any = {};
  FinancialCommitmentlength: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
