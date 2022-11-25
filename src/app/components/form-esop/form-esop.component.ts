import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray,FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
import { GrantDetailsList} from 'src/app/model/Fdi.model';


@Component({
  selector: 'app-form-esop',
  templateUrl: './form-esop.component.html',
  styleUrls: ['./form-esop.component.css']
})
export class FormEsopComponent implements OnInit {
  @ViewChild('tabset') tabset: any;
  public esopFormlist: FormGroup;
  CountryList: any = [];
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService,private fb: FormBuilder) {
    // this.readCountry();
  }
  foreigninvestmentProject = [
    { id: '1', Type: 'Yes' },
    { id: '2', Type: 'No' }
  ]
  Shareholding = [
    { id: '1', Type: 'Yes' },
    { id: '2', Type: 'No' }
  ]
  GrantDetailsArray: Array<GrantDetailsList> = [];
  GrantDetailsdata:any={};
  
  ngOnInit(): void {

    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "",Number_ESOP_Granted:"",Country:"",ResidentialStatus: "",SubsidiarySDS:"",Pre_determined_issue_price:"",Conversion_ratio1: "1:",Conversion_ratio:"",Equivalent_equity_shares:"",Facevalue_equity_shares:"",Value_of_Shares:""}
    this.GrantDetailsArray.push(this.GrantDetailsdata);
   
    this.esopFormlist = this.fb.group(
      {
        NameofinvesteeCompany: new FormControl('', Validators.required),
        CIN_LIP: new FormControl('', Validators.required),
        PanNo: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
        ESOP_Scheme_Name: new FormControl('', Validators.required),
        BR_EGM_Circular: new FormControl('', Validators.required),
        Date_Resolution: new FormControl('', Validators.required),
        Entry_Route: new FormControl('Automatic Route', Validators.required),
        Applicable_Sectoral_Cap: new FormControl('100', Validators.required),
        foreigninvestmentproject: new FormControl('No', Validators.required),
        Shareholdingpattern: new FormControl('Yes', Validators.required),
        Non_Debt_Instruments: new FormControl(''),
        sectoral_cap_statutory: new FormControl(''),
        Indian_companies_reconstruction: new FormControl(''),
        PMLA_UAPA: new FormControl(''),
        enclose_documents: new FormControl(''),
        certificate_Company_Secretary: new FormControl(''),
        SEBI_registered: new FormControl(''),
        necessary_documents: new FormControl(''),
        GrantDetails: new FormArray([])
        
      }
    )
  }

  addGrantData() {
    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "",Number_ESOP_Granted:"",Country:"",ResidentialStatus: "",SubsidiarySDS:"",Pre_determined_issue_price:"",Conversion_ratio1: "1:",Conversion_ratio:"",Equivalent_equity_shares:"",Facevalue_equity_shares:"",Value_of_Shares:""}
    this.GrantDetailsArray.push(this.GrantDetailsdata);
    return true;
  }

  deleteGrantData(index) {
    if (this.GrantDetailsArray.length == 1) {
      return false;
    } else {
      this.GrantDetailsArray.splice(index, 1);  
      return true;
    }
    
  }

  get Non_Debt_Instruments()
  {
    return this.esopFormlist.get('Non_Debt_Instruments');
  }
  get sectoral_cap_statutory()
  {
    return this.esopFormlist.get('sectoral_cap_statutory');
  }
  get Indian_companies_reconstruction()
  {
    return this.esopFormlist.get('Indian_companies_reconstruction');
  }
  get PMLA_UAPA()
  {
    return this.esopFormlist.get('PMLA_UAPA');
  }
  get enclose_documents()
  {
    return this.esopFormlist.get('enclose_documents');
  }
  get certificate_Company_Secretary()
  {
    return this.esopFormlist.get('certificate_Company_Secretary');
  }
  get SEBI_registered()
  {
    return this.esopFormlist.get('SEBI_registered');
  }
  get necessary_documents()
  {
    return this.esopFormlist.get('necessary_documents');
  }

  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
    });
  }
  CounEquivalentEquityShares(i) {
    if (this.GrantDetailsArray[i].Number_ESOP_Granted != null && this.GrantDetailsArray[i].Conversion_ratio != null) {
      this.GrantDetailsArray[i].Equivalent_equity_shares=this.GrantDetailsArray[i].Number_ESOP_Granted*this.GrantDetailsArray[i].Conversion_ratio;

    }
    this.CountValueofShares(i)
  }

  CountValueofShares(i) {
    if (this.GrantDetailsArray[i].Equivalent_equity_shares != null && this.GrantDetailsArray[i].Facevalue_equity_shares != null) {
      this.GrantDetailsArray[i].Value_of_Shares=this.GrantDetailsArray[i].Equivalent_equity_shares*this.GrantDetailsArray[i].Facevalue_equity_shares;
    }
    
  }
  
  onSubmitESOPFrom() {
    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    this.esopFormlist.setControl('GrantDetails', grantFormArray);
    console.log(this.esopFormlist.value);
    if (this.esopFormlist.invalid) {
      for (const control of Object.keys(this.esopFormlist.controls)) {
        this.esopFormlist.controls[control].markAsTouched();
      }
      return;
    }
    else {
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
 
  Tabindexc:number=0;
  confirmTabSwitch(event) {
    debugger
    this.tabset.tabs.forEach((item, index) => {
      if (item.heading == event.target.innerText) {
        localStorage.setItem("tabIndex", JSON.stringify(index));
        this.Tabindexc=index;
        if(this.Tabindexc>0)
        {
          if(this.Tabindexc==4)
          {
            this.btnNext=false;
            this.btnBack=true;
          }
          else{
          this.btnNext=true;
          }
        }
        else{
          this.btnBack=true;
          this.btnNext=false;
        }
        
      }

    });

  }
  btnNext:boolean=true;
  btnBack:boolean=false;
  changeTab() {
    debugger
    if(this.Tabindexc==0)
    {
      this.tabset.tabs[1].active = true;
      this.Tabindexc=1;
      this.btnBack=true;
    }
    else
    {
      if(this.Tabindexc<4){
        this.Tabindexc=this.Tabindexc+1;
        this.tabset.tabs[this.Tabindexc].active = true;
        this.btnBack=true;
        if(this.Tabindexc==4)
        {
          this.btnNext=false;
        }
        
      }
    }   
 }
 btnBackchange()
 {
    if(this.Tabindexc==0)
    {
      this.tabset.tabs[1].active = true;
      this.Tabindexc=1;
    }
    else
    {
      if(this.Tabindexc<=4){
        this.btnNext=true;
        this.Tabindexc=this.Tabindexc-1;
        this.tabset.tabs[this.Tabindexc].active = true;
        if(this.Tabindexc==0)
        {
          this.btnBack=false;
          this.btnNext=true;
        }
      }
    } 
 }

}
