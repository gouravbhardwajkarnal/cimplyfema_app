import { Component, OnInit ,ViewChild} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-form-opi',
  templateUrl: './form-opi.component.html',
  styleUrls: ['./form-opi.component.css']
})
export class FormOpiComponent implements OnInit {
  OpiFormlist:FormGroup
  @ViewChild('tabset') tabset: TabsetComponent;
  constructor(private readonly route: ActivatedRoute,private apiService: ApiService) {

   }

  ngOnInit(): void {
    this.OpiFormlist=new FormGroup(
      {
        'OPI_Sec_A_Name':new FormControl('',Validators.required),
        'OPI_Sec_A_LEI':new FormControl('',Validators.required),
        'OPI_Sec_A_PAN':new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        'OPI_Sec_A_Address':new FormControl('',Validators.required),
        'OPI_Sec_A_City':new FormControl('',Validators.required),
        'OPI_Sec_A_State':new FormControl('',Validators.required),
        'OPI_Sec_A_PIN':new FormControl('',Validators.required),
        'OPI_Sec_A_NetINR':new FormControl('',Validators.required),
        'WhetherIElist':new FormControl('',Validators.required),
        'OPI_Sec_A_ContactPerson':new FormControl('',Validators.required),
        'OPI_Sec_A_Mobile':new FormControl('',Validators.required),
        'OPI_Sec_A_EmailId':new FormControl('',Validators.required),
        'OPI_Sec_A_NetAmount_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_NetAmount_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Investments_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Investments_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Sale_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Sale_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_NetAmountClosing_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_NetAmountClosing_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_RemittanceAmt_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_RemittanceAmt_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Repatriation_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Repatriation_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_NetAmt_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_NetAmt_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_Investments_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_Investments_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_Disinvestment_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_Disinvestment_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_NetAmtClose_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_NetAmtClose_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_RemittanceAmt_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_RemittanceAmt_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_RepatriationAmt_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_EBS_RepatriationAmt_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Equity12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_DebtInstrument12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ADR_GDR12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_ETF12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Mutual12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Others11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Others12_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total1_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total2_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total3_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total4_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total5_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total6_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total7_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total8_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total9_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total10_INR':new FormControl('',Validators.required),
        'OPI_Sec_A_Total11_USD':new FormControl('',Validators.required),
        'OPI_Sec_A_Total12_INR':new FormControl('',Validators.required),

        'OPI_Sec_B_Name':new FormControl('',Validators.required),
        'OPI_Sec_B_LEI':new FormControl('',Validators.required),
        'OPI_Sec_B_PAN':new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        'OPI_Sec_B_Group':new FormControl('',Validators.required),
        'OPI_Sec_B_Activity':new FormControl('',Validators.required),
        'OPI_Sec_B_Address':new FormControl('',Validators.required),
        'OPI_Sec_B_City':new FormControl('',Validators.required),
        'OPI_Sec_B_State':new FormControl('',Validators.required),
        'OPI_Sec_B_PINCode':new FormControl('',Validators.required),
        'OPI_Sec_B_ContactPerson':new FormControl('',Validators.required),
        'OPI_Sec_B_Designation':new FormControl('',Validators.required),
        'OPI_Sec_B_Telephone':new FormControl('',Validators.required),
        'OPI_Sec_B_MobileCP':new FormControl('',Validators.required),
        'OPI_Sec_B_FaxNo':new FormControl('',Validators.required),
        'OPI_Sec_B_Email':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Name':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_PAN':new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        'OPI_Sec_B_VCF_Group':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Activity':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Address':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_City':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_State':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_PINCode':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_ContactPerson':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Designation':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Telephone':new FormControl('',Validators.required),
        'OPI_Sec_B_VCF_Email':new FormControl('',Validators.required),
        'OPI_Sec_B_AIF_Name':new FormControl('',Validators.required),
        'OPI_Sec_B_AIF_Date':new FormControl('',Validators.required),
        'OPI_Sec_B_AIF_SEBILimit':new FormControl('',Validators.required),

        'OPI_Sec_B_Equity1_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity2_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity3_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity4_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity5_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity6_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity7_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity8_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity9_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity10_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity11_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Equity12_INR':new FormControl('',Validators.required),
        
        'OPI_Sec_B_EquityLinked1_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked2_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked3_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked4_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked5_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked6_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked7_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked8_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked9_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked10_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked11_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_EquityLinked12_INR':new FormControl('',Validators.required),

        'OPI_Sec_B_Permissible1_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible2_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible3_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible4_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible5_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible6_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible7_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible8_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible9_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible10_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible11_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Permissible12_INR':new FormControl('',Validators.required),

        'OPI_Sec_B_Total1_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total2_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Total3_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total4_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Total5_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total6_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Total7_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total8_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Total9_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total10_INR':new FormControl('',Validators.required),
        'OPI_Sec_B_Total11_USD':new FormControl('',Validators.required),
        'OPI_Sec_B_Total12_INR':new FormControl('',Validators.required),

        'OPI_Sec_C_Signature':new FormControl('',Validators.required),
        'OPI_Sec_C_Name':new FormControl('',Validators.required),
        'OPI_Sec_C_Stamp':new FormControl(''),
        'OPI_Sec_C_Place':new FormControl('',Validators.required),
        'OPI_Sec_C_Date':new FormControl('',Validators.required),
        'OPI_Sec_C_Telephone':new FormControl('',Validators.required),
        'OPI_Sec_C_EmailId':new FormControl('',Validators.required),
        
      }
    )
  }
  WhetherIElist=[
    {id:'1',Type:'Yes'},
    {id:'2',Type:'No'}
  ]

  onSubmitOPIFrom()
  {
    if (this.OpiFormlist.invalid) {
      for (const control of Object.keys(this.OpiFormlist.controls)) {
        this.OpiFormlist.controls[control].markAsTouched();
      }
      return;
    } 
    else{
      console.log('Fromopi successfully created!');
      /* return this.apiService.createFormEsop(this.OpiFormlist.value).subscribe({
        complete: () => {
          alert('FromEsop successfully created!');
          //console.log('FromEsop successfully created!');
            //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      }); */
    }
    
  }

  ngAfterViewInit(){
    console.log(this.tabset.tabs);
  }

  NextTab(id)
  {
    this.tabset.tabs[id].active = true;
  } 
 
    
}
