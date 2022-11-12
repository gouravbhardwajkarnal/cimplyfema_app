import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-esop',
  templateUrl: './form-esop.component.html',
  styleUrls: ['./form-esop.component.css']
})
export class FormEsopComponent implements OnInit {
 esopFormlist:FormGroup
  constructor(private readonly route: ActivatedRoute) { }
  foreigninvestmentProject=[
    {id:'1',Type:'Yes'},
    {id:'2',Type:'No'}
  ]
  Shareholding=[
    {id:'1',Type:'Yes'},
    {id:'2',Type:'No'}
  ]
  submitted=false;
  ngOnInit(): void {
    this.esopFormlist=new FormGroup(
      {
        'NameofinvesteeCompany':new FormControl('',Validators.required),
        'CIN_LIP':new FormControl('',Validators.required),
        'PanNo':new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        'ESOP_Scheme_Name':new FormControl('',Validators.required),
        'BR_EGM_Circular':new FormControl('',Validators.required),
        'Date_Resolution':new FormControl('',Validators.required),
        'Entry_Route':new FormControl('Automatic Route',Validators.required),
        'Applicable_Sectoral_Cap':new FormControl('20',Validators.required),
        'foreigninvestmentproject':new FormControl('',Validators.required),
        'Shareholdingpattern':new FormControl('',Validators.required),
        'Full_Name_Grantee':new FormControl('',Validators.required),
        'Date_of_Issue':new FormControl('',Validators.required),
        'Number_ESOP_Granted':new FormControl('',Validators.required),
        'Country':new FormControl('',Validators.required),
        'ResidentialStatus':new FormControl('',Validators.required),
        'SubsidiarySDS':new FormControl('',Validators.required),
        'Pre_determined_issue_price':new FormControl('',Validators.required),
        'Conversion_ratio':new FormControl('',Validators.required),
        'Equivalent_equity_shares':new FormControl('',Validators.required),
        'Facevalue_equity_shares':new FormControl('',Validators.required),
        'Value_of_Shares':new FormControl('',Validators.required),
        'Non_Debt_Instruments':new FormControl(''),
        'sectoral_cap_statutory':new FormControl(''),
        'Indian_companies_reconstruction':new FormControl(''),
        'PMLA_UAPA':new FormControl(''),
        'enclose_documents':new FormControl(''),
        'certificate_Company_Secretary':new FormControl(''),
        'SEBI_registered':new FormControl(''),
        'necessary_documents':new FormControl('')
      }
    )
  }

  CounEquivalentEquityShares()
  {
     if(this.esopFormlist.value.Number_ESOP_Granted !='' && this.esopFormlist.value.Conversion_ratio !='')
     {
      
      //document.getElementById('txt3').value = result;
      var result=this.esopFormlist.value.Number_ESOP_Granted*this.esopFormlist.value.Conversion_ratio;
      /* this.esopFormlist.setValue({
        'Equivalent_equity_shares':'30'
      }) */
      
      
      //document.getElementById('Equivalent_equity_shares').value =result;
      //this.esopFormlist.controls('Equivalent_equity_shares').value=result;
      console.log(result); 
    }
  }

  onSubmitESOPFrom()
  {
    /* if (this.esopFormlist.invalid) {
      for (const control of Object.keys(this.esopFormlist.controls)) {
        this.esopFormlist.controls[control].markAsTouched();
      }
      return;
    } */
    
    console.log(this.esopFormlist);
    
  }

}
