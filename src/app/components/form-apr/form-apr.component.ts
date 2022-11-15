import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-form-apr',
  templateUrl: './form-apr.component.html',
  styleUrls: ['./form-apr.component.css']
})
export class FormAprComponent implements OnInit {

  aprFormlist:FormGroup
 CountryList: any=[];
  constructor(private readonly route: ActivatedRoute,private apiService: ApiService) {
    this.readCountry();
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
    this.aprFormlist=new FormGroup(
      {
        'From_Date':new FormControl('',Validators.required),
        'To_Date':new FormControl('',Validators.required),
        'Unique_Identification_Number':new FormControl('',Validators.required),
        'Indian_Amount':new FormControl('',Validators.required),
        'Indian_Share':new FormControl('',Validators.required),
        'Foreign_Amount':new FormControl('',Validators.required),             
        'Foreign_Share':new FormControl('',Validators.required),
        'IndianEntityResidentIndividualTrust':new FormControl('',Validators.required),
        'Person_resident_India_1':new FormControl('',Validators.required),
        'Indian_Stake_1':new FormControl('',Validators.required),
        
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
        'Non_Debt_Instruments':new FormControl('false'),
        'sectoral_cap_statutory':new FormControl('false'),
        'Indian_companies_reconstruction':new FormControl('false'),
        'PMLA_UAPA':new FormControl('false'),
        'enclose_documents':new FormControl('false'),
        'certificate_Company_Secretary':new FormControl('false'),
        'SEBI_registered':new FormControl('false'),
        'necessary_documents':new FormControl('false')
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
     if(this.aprFormlist.value.Number_ESOP_Granted !='' && this.aprFormlist.value.Conversion_ratio !='')
     {
      var Number_ESOP=this.aprFormlist.value.Number_ESOP_Granted;
      var Conversion_ratio=this.aprFormlist.value.Conversion_ratio;
      var result=Number_ESOP*Conversion_ratio;
      
      setTimeout(()=>{  
      this.aprFormlist
      .valueChanges
      .subscribe( _ => {
          this.aprFormlist.get( 'Equivalent_equity_shares' ).patchValue( result, {emitEvent: false} );
      } );
    }, 1000);
      
    }

    //this.CountValueofShares();
  }

  CountValueofShares()
  {
    if(this.aprFormlist.value.Equivalent_equity_shares !='' && this.aprFormlist.value.Facevalue_equity_shares !='')
    {
     var resultJ=this.aprFormlist.value.Equivalent_equity_shares*this.aprFormlist.value.Facevalue_equity_shares;
     /* this.aprFormlist.patchValue({
       'Value_of_Shares':resultJ
     }); */
   }
  }

  onSubmitAPRFrom()
  {
    if (this.aprFormlist.invalid) {
      for (const control of Object.keys(this.aprFormlist.controls)) {
        this.aprFormlist.controls[control].markAsTouched();
      }
      return;
    } 
    else{
      return this.apiService.createFormEsop(this.aprFormlist.value).subscribe({
        complete: () => {
          console.log('FromEsop successfully created!');
            //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
    
    console.log(this.aprFormlist);
    
  }

}
