import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-form-esop',
  templateUrl: './form-esop.component.html',
  styleUrls: ['./form-esop.component.css']
})
export class FormEsopComponent implements OnInit {
 esopFormlist:FormGroup
 CountryList: any=[];
  constructor(private readonly route: ActivatedRoute,private apiService: ApiService) {
    // this.readCountry();
  }
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
        'Non_Debt_Instruments':new FormControl('true'),
        'sectoral_cap_statutory':new FormControl('true'),
        'Indian_companies_reconstruction':new FormControl('true'),
        'PMLA_UAPA':new FormControl('true'),
        'enclose_documents':new FormControl('true'),
        'certificate_Company_Secretary':new FormControl('true'),
        'SEBI_registered':new FormControl('true'),
        'necessary_documents':new FormControl('true')
      }
    )
  }
  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
    });
  }
  CounEquivalentEquityShares()
  {
     if(this.esopFormlist.value.Number_ESOP_Granted !='' && this.esopFormlist.value.Conversion_ratio !='')
     {
      var Number_ESOP=this.esopFormlist.value.Number_ESOP_Granted;
      var Conversion_ratio=this.esopFormlist.value.Conversion_ratio;
      var result=Number_ESOP*Conversion_ratio;
      
      setTimeout(()=>{  
      this.esopFormlist
      .valueChanges
      .subscribe( _ => {
          this.esopFormlist.get( 'Equivalent_equity_shares' ).patchValue( result, {emitEvent: false} );
      } );
    }, 1000);
      
    }

    //this.CountValueofShares();
  }

  CountValueofShares()
  {
    if(this.esopFormlist.value.Equivalent_equity_shares !='' && this.esopFormlist.value.Facevalue_equity_shares !='')
    {
     var resultJ=this.esopFormlist.value.Equivalent_equity_shares*this.esopFormlist.value.Facevalue_equity_shares;
     /* this.esopFormlist.patchValue({
       'Value_of_Shares':resultJ
     }); */
   }
  }

  onSubmitESOPFrom()
  {
    if (this.esopFormlist.invalid) {
      for (const control of Object.keys(this.esopFormlist.controls)) {
        this.esopFormlist.controls[control].markAsTouched();
      }
      return;
    } 
    else{
      return this.apiService.createFormEsop(this.esopFormlist.value).subscribe({
        complete: () => {
          alert('FromEsop successfully created!');
          //console.log('FromEsop successfully created!');
            //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
    
  }

}
