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
    this.aprFormlist=new FormGroup(
      {
        'APR_From_Date':new FormControl('',Validators.required),
        'APR_tO_Date':new FormControl('',Validators.required),
        'Unique_Identification_Number':new FormControl('',Validators.required),
        'Indian_Amount':new FormControl('',Validators.required),
        'Indian_Share':new FormControl('',Validators.required),
        'Foreign_Amount':new FormControl('',Validators.required),             
        'Foreign_Share':new FormControl('',Validators.required),
        'IndianEntityResidentIndividualTrust':new FormControl('',Validators.required),
        'Person_resident_India_1':new FormControl('',Validators.required),
        'Indian_Stake_1':new FormControl('',Validators.required),       
        'Foreign_partner_1':new FormControl('',Validators.required),
        'Foreign_Stake_1':new FormControl('',Validators.required),
        'Person_resident_India_2':new FormControl('',Validators.required),
        'India_Stake_2':new FormControl('',Validators.required),
        'Foreign_partner_2':new FormControl('',Validators.required),
        'Foreign_Stake_2':new FormControl('',Validators.required),
        'Person_resident_India_3':new FormControl('',Validators.required),
        'India_Stake_3':new FormControl('',Validators.required),
        'Foreign_partner_3':new FormControl('',Validators.required),
        'Foreign_Stake_3':new FormControl('',Validators.required),
        'FP_NetProfit_Previous_Year':new FormControl('',Validators.required),
        'FP_NetProfit_Current_Year':new FormControl('',Validators.required),
        'FP_Dividend_Previous_Year':new FormControl('',Validators.required),
        'FP_Dividend_Current_Year':new FormControl('',Validators.required),
        'Authorized_Place_Date':new FormControl('',Validators.required),
        'FP_Networth_Previous_Year':new FormControl('',Validators.required),
        'FP_Networth_Current_Year':new FormControl('',Validators.required),
        'Repat_Dividend_CurYear':new FormControl('',Validators.required),
        'Repat_Dividend_commencement':new FormControl('',Validators.required),
        'Repat_Repayment_CurYear':new FormControl('',Validators.required),
        'Repat_Repayment_commencement':new FormControl('',Validators.required),
        'Repat_EquityExport_CurYear':new FormControl('',Validators.required),
        'Repat_EquityExport_commencement':new FormControl('',Validators.required),
        'Repat_Royalties_CurYear':new FormControl('',Validators.required),
        'Repat_Royalties_commencement':new FormControl('',Validators.required),
        'Repat_Technical_CurYear':new FormControl('',Validators.required),
        'Repat_Technical_commencement':new FormControl('',Validators.required),
        'Repat_Consultancyfee_CurYear':new FormControl('',Validators.required),

        'Repat_Consultancyfee_commencement':new FormControl('',Validators.required),
        'Repat_Others_CurYear':new FormControl('',Validators.required),
        'Repat_Others_commencement':new FormControl('',Validators.required),
        'Repat_Profit_CurYear':new FormControl('',Validators.required),
        'Repat_Profit_commencement':new FormControl('',Validators.required),
        'Repat_Retained_CurYear':new FormControl('',Validators.required),
        'Repat_Retained_commencement':new FormControl('',Validators.required),
        'Repat_FDIforeign_CurYear':new FormControl('',Validators.required),
        'Repat_FDIforeign_commencement':new FormControl('',Validators.required),
        'Repat_exces_sshare_CurYear':new FormControl('',Validators.required),
        'Repat_exces_sshare_commencement':new FormControl('',Validators.required),
        'Furnish_jurisdiction_SDS':new FormControl('',Validators.required),
        'Furnish_jurisdiction_ParentSDS':new FormControl('',Validators.required),

        'Furnish_Investment_Amount':new FormControl('',Validators.required),
        'Furnish_Investment_Date':new FormControl('',Validators.required),
        'Furnish_ActivityCd_1987':new FormControl('',Validators.required),
        'Furnish_ActivityCd_2008':new FormControl('',Validators.required),
        'Furnish_Stake_SDS':new FormControl('',Validators.required),
        'SDS_financial_services':new FormControl('',Validators.required),
        'Furnish_jurisdiction_SDSwoundup':new FormControl('',Validators.required),
        'authorized_official_Signature':new FormControl('',Validators.required),
        'authorized_official_NameDesign':new FormControl('',Validators.required),
        'authorized_official_Place':new FormControl('',Validators.required),
        'authorized_official_To_Date':new FormControl('',Validators.required),
        'authorized_official_Telephone':new FormControl('',Validators.required),
        'authorized_official_Email':new FormControl('',Validators.required),
        'authorized_official_Stamp':new FormControl('',Validators.required),
        'Signature_Statutory_Auditors':new FormControl('',Validators.required),
        'Name_Audit_Firm_UDIN':new FormControl('',Validators.required),
        'Statutory_Auditors_Place':new FormControl('',Validators.required),
        'Statutory_Auditors_Date':new FormControl('',Validators.required),
        'Statutory_Auditors_Email':new FormControl('',Validators.required),
        'Statutory_Auditors_Stamp':new FormControl('',Validators.required),
        'Authorized_Signature_ADBank':new FormControl('',Validators.required),
        'Authorized_designation_ADBank':new FormControl('',Validators.required),
        'Authorized_Place_ADBank':new FormControl('',Validators.required),
        'Authorized_Stamp_ADBank':new FormControl('',Validators.required)   
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
    debugger;
    if (this.aprFormlist.invalid) {
      for (const control of Object.keys(this.aprFormlist.controls)) {
        this.aprFormlist.controls[control].markAsTouched();
      }
      return;
    } 
    else{
      return this.apiService.createFormAPR(this.aprFormlist.value).subscribe({
        complete: () => {
          console.log('FromAPR successfully created!');
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
