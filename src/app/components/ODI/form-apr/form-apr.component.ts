import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ShareHoldingFEGrid } from 'src/app/model/gridmodel';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Iinvestment, IinvestmentSDS } from 'src/app/model/iinvestment';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CommonService } from 'src/app/service/common.service';
import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-form-apr',
  templateUrl: './form-apr.component.html',
  styleUrls: ['./form-apr.component.css'],
  providers: [DatePipe]
})

export class FormAprComponent implements OnInit {
  public aprFormList: FormGroup;
  public aprForm: FormGroup;
  public declaration: FormGroup;
  public CAform: FormGroup;
  public sdsform: FormGroup;
  public mainform: FormGroup;
  dataModel: any = {};
  investment_model: Iinvestment;
  @ViewChild('tabset') tabset: TabsetComponent;
  ShareHoldingFEArray: Array<ShareHoldingFEGrid> = [];
  ShareHoldingFE: any = {};
  ShareHoldingFElength: number = 0;
  selectedcurrency: string = 'USD';
  TotalPstake: number = 0;
  TotalFPstake: number = 0;
  Totalstake: number = 0;
  id: string = '0';
  BankName: string;
  CurrencyCode: string;
  BankList: any = [];
  CurrencyCodeList: any = [];
  btnShow: boolean;
  btnShowNext: boolean;
  emailPattern: string;
  phoneNumber: string;
  Today: Date;
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder,
    private commonservice: CommonService, public datepipe: DatePipe,private toastr: ToastrService) {

    this.investment_model = {} as Iinvestment;
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    // this.phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
    // var dd = String(today. getDate()). padStart(2, '0');
    // var mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
    // console.log('01-04-' + lastyear);
    // console.log('31-03-' + currentyear);
    var today = new Date();
    this.Today = new Date();
    var currentyear = today.getFullYear();
    var lastyear = today.getFullYear() - 1;
    // var fromdate= new Date('01-04-' + lastyear);
    // var todate= new Date('31-03-' + currentyear);
    var fromdate = new Date(lastyear + '-04-01');
    var todate = new Date(currentyear + '-03-31');


    //  this.datepipe.transform('01-04-' + lastyear, 'dd-MM-yyy');
    //   this.datepipe.transform('31-03-' + currentyear, 'dd-MM-yyy');
    this.readBank();
    this.readcurrency();
    this.sdstypes = commonservice.getAllsdstypes();
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.sdsleveltypes = commonservice.getAllsdsleveltypes();
    this.mainform = this.fb.group({
      APR_From_Date: new FormControl(this.datepipe.transform(fromdate, 'yyyy-MM-dd'), Validators.required),
      APR_To_Date: new FormControl(this.datepipe.transform(todate, 'yyyy-MM-dd'), Validators.required),
      APR_UIN: new FormControl('', Validators.required),
      APR_NameIE: new FormControl('', Validators.required),
      APR_NameJV: new FormControl('', Validators.required),
      APR_Currency: new FormControl('', Validators.required),
      APR_Bank: new FormControl('', Validators.required),
    });

    this.aprForm = this.fb.group({
      APR_Indian_Amount: new FormControl('', Validators.required),
      APR_Indian_Share: new FormControl('', Validators.required),
      APR_Foreign_Amount: new FormControl('', Validators.required),
      APR_Foreign_Share: new FormControl('', Validators.required),
      APR_FE_Control: new FormControl('', Validators.required),
      APR_Profit_Current: new FormControl('', Validators.required),
      APR_Profit_Last: new FormControl('', Validators.required),
      APR_Dividend_Current: new FormControl('', Validators.required),
      APR_Dividend_Last: new FormControl('', Validators.required),
      APR_Worth_Current: new FormControl('', Validators.required),
      APR_Worth_Last: new FormControl('', Validators.required),
      APR_Dividend_CurYear: new FormControl(0, Validators.required),
      APR_Dividend_commencement: new FormControl(0, Validators.required),
      APR_Repayment_CurYear: new FormControl(0, Validators.required),
      APR_Repayment_commencement: new FormControl(0, Validators.required),
      APR_EquityExport_CurYear: new FormControl(0, Validators.required),
      APR_EquityExport_commencement: new FormControl(0, Validators.required),
      APR_Royalties_CurYear: new FormControl(0, Validators.required),
      APR_Royalties_commencement: new FormControl(0, Validators.required),
      APR_Technical_CurYear: new FormControl(0, Validators.required),
      APR_Technical_commencement: new FormControl(0, Validators.required),
      APR_Consultancyfee_CurYear: new FormControl(0, Validators.required),
      APR_Consultancyfee_commencement: new FormControl(0, Validators.required),
      APR_Others_CurYear: new FormControl(0, Validators.required),
      APR_Others_commencement: new FormControl(0, Validators.required),
      APR_Profit_CurYear: new FormControl(0, Validators.required),
      APR_Profit_commencement: new FormControl(0, Validators.required),
      APR_Retained_CurYear: new FormControl(0, Validators.required),
      APR_Retained_commencement: new FormControl(0, Validators.required),
      APR_FDIforeign_CurYear: new FormControl(0, Validators.required),
      APR_FDIforeign_commencement: new FormControl(0, Validators.required),
      APR_exces_sshare_CurYear: new FormControl(0, Validators.required),
      APR_exces_sshare_commencement: new FormControl(0, Validators.required),
    });
    this.sdsform = this.fb.group({
      APR_SDS_Control: new FormControl('', Validators.required),
    });
    this.declaration = this.fb.group({
      APR_Dec_A: new FormControl(false),
      APR_Dec_B: new FormControl(false),
      APR_Dec_C: new FormControl(false),
      APR_Dec_D: new FormControl(false),
      APR_Dec_E: new FormControl(false),
      APR_Authorized_Signature: new FormControl(''),
      APR_Authorized_Name: new FormControl('', Validators.required),
      APR_Authorized_Designation: new FormControl('', Validators.required),
      APR_Dec_Place: new FormControl('', Validators.required),
      APR_Dec_Date: new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
      APR_Dec_Telephone: new FormControl('', Validators.required),
      APR_Dec_Email: new FormControl('', Validators.pattern(this.emailPattern)),
      APR_Dec_Stamp: new FormControl(''),
      SDSDetails: new FormArray([]),
      ShareHoldingFE: new FormArray([]),
    });
    this.CAform = this.fb.group({
      APR_CA_A: new FormControl(false),
      APR_CA_B: new FormControl(false),
      APR_CA_C: new FormControl(false),
      APR_CA_Signature: new FormControl(''),
      APR_CA_FirmName: new FormControl(''),
      APR_CA_RegNo: new FormControl(''),
      APR_CA_UDIN: new FormControl(''),
      APR_CA_Date: new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd')),
      APR_CA_Place: new FormControl(''),
      APR_CA_Email: new FormControl('', Validators.pattern(this.emailPattern)),
      APR_CA_Stamp: new FormControl(''),
      SDSDetails: new FormArray([]),
      ShareHoldingFE: new FormArray([]),
    });

  }
  Indianshare: number = 0;
  Foreignshare: number = 0;
  sdstypes: DisinvetmentType[];
  Jurisdictiontypes: DisinvetmentType[];
  sdsleveltypes: DisinvetmentType[];
  SDSArray: Array<IinvestmentSDS> = [];
  SDS: any = {};
  SDSlength: number = 0;
  CapitalstructureFE() {

    let indian = this.aprForm.value.APR_Indian_Amount;
    let foreign = this.aprForm.value.APR_Foreign_Amount;
    let total = indian + foreign;
    this.Indianshare = indian * 100 / total;
    this.Foreignshare = foreign * 100 / total;
    this.aprForm.get("APR_Indian_Share").patchValue(this.Indianshare.toFixed(2));
    this.aprForm.get("APR_Foreign_Share").patchValue(this.Foreignshare.toFixed(2));
    if (this.Indianshare >= 10) {
      this.aprForm.get("APR_FE_Control").patchValue('Yes');
      this.CAform.get("APR_CA_B").patchValue(true);
    }
    else {

      if (indian > 0) {
        if (confirm("Whether the Indian Entity (IE)/ ResidentIndividual (RI)/Trust/ Society has control in the foreign entity")) {
          this.aprForm.get("APR_FE_Control").patchValue('No');
          this.CAform.get("APR_CA_A").patchValue(true);
        }
      }
    }
  }

  ngOnInit(): void {
    this.SDS = {
      investment_SDS_Name: "",
      investment_SDS_Level: "",
      investment_SDS_Jurisdiction: "",
      investment_SDS_ParentName: "",
      investment_SDS_ParentLevel: "",
      investment_SDS_ParentJurisdiction: "",
      investment_SDS_InvestmentAmount: "",
      investment_SDS_InvestmentDate: "",
      investment_SDS_LEI: "",
      investment_SDS_Type: "",
      investment_SDS_1987NIC: "",
      investment_SDS_2008NIC: "",
      investment_SDS_Stake: ""
    }
    this.SDSArray.push(this.SDS);
    this.SDSlength = this.SDSArray.length;
    this.btnShow = false;
    this.btnShowNext = true;
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;
    // this.aprFormlist=new FormGroup(
    //   {
    //     'APR_From_Date':new FormControl('',Validators.required),
    //     'APR_tO_Date':new FormControl('',Validators.required),
    //     'Unique_Identification_Number':new FormControl('',Validators.required),
    //     'Cap_Struct_Indian_Amount':new FormControl('',Validators.required),
    //     'Cap_Struct_Indian_Share':new FormControl('0',Validators.required),
    //     'Cap_Struct_Foreign_Amount':new FormControl('',Validators.required),             
    //     'Cap_Struct_Foreign_Share':new FormControl('0',Validators.required),
    //     'IndianEntityResidentIndividualTrust':new FormControl('',Validators.required),
    //     'Person_resident_India_1':new FormControl('',Validators.required),
    //     'Indian_Stake_1':new FormControl('',Validators.required),       
    //     'Foreign_partner_1':new FormControl('',Validators.required),
    //     'Foreign_Stake_1':new FormControl('',Validators.required),
    //     'Person_resident_India_2':new FormControl('',Validators.required),
    //     'India_Stake_2':new FormControl('',Validators.required),
    //     'Foreign_partner_2':new FormControl('',Validators.required),
    //     'Foreign_Stake_2':new FormControl('',Validators.required),
    //     'Person_resident_India_3':new FormControl('',Validators.required),
    //     'India_Stake_3':new FormControl('',Validators.required),
    //     'Foreign_partner_3':new FormControl('',Validators.required),
    //     'Foreign_Stake_3':new FormControl('',Validators.required),
    //     'FP_NetProfit_Previous_Year':new FormControl('',Validators.required),
    //     'FP_NetProfit_Current_Year':new FormControl('',Validators.required),
    //     'FP_Dividend_Previous_Year':new FormControl('',Validators.required),
    //     'FP_Dividend_Current_Year':new FormControl('',Validators.required),
    //     'FP_Networth_Previous_Year':new FormControl('',Validators.required),
    //     'FP_Networth_Current_Year':new FormControl('',Validators.required),
    //     'Repat_Dividend_CurYear':new FormControl('',Validators.required),
    //     'Repat_Dividend_commencement':new FormControl('',Validators.required),
    //     'Repat_Repayment_CurYear':new FormControl('',Validators.required),
    //     'Repat_Repayment_commencement':new FormControl('',Validators.required),
    //     'Repat_EquityExport_CurYear':new FormControl('',Validators.required),
    //     'Repat_EquityExport_commencement':new FormControl('',Validators.required),
    //     'Repat_Royalties_CurYear':new FormControl('',Validators.required),
    //     'Repat_Royalties_commencement':new FormControl('',Validators.required),
    //     'Repat_Technical_CurYear':new FormControl('',Validators.required),
    //     'Repat_Technical_commencement':new FormControl('',Validators.required),
    //     'Repat_Consultancyfee_CurYear':new FormControl('',Validators.required),
    //     'Repat_Consultancyfee_commencement':new FormControl('',Validators.required),
    //     'Repat_Others_CurYear':new FormControl('',Validators.required),
    //     'Repat_Others_commencement':new FormControl('',Validators.required),
    //     'Repat_Profit_CurYear':new FormControl('',Validators.required),
    //     'Repat_Profit_commencement':new FormControl('',Validators.required),
    //     'Repat_Retained_CurYear':new FormControl('',Validators.required),
    //     'Repat_Retained_commencement':new FormControl('',Validators.required),
    //     'Repat_FDIforeign_CurYear':new FormControl('',Validators.required),
    //     'Repat_FDIforeign_commencement':new FormControl('',Validators.required),
    //     'Repat_exces_sshare_CurYear':new FormControl('',Validators.required),
    //     'Repat_exces_sshare_commencement':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_SDS':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_ParentSDS':new FormControl('',Validators.required),
    //     'Furnish_Investment_Amount':new FormControl('',Validators.required),
    //     'Furnish_Investment_Date':new FormControl('',Validators.required),
    //     'Furnish_ActivityCd_1987':new FormControl('',Validators.required),
    //     'Furnish_ActivityCd_2008':new FormControl('',Validators.required),
    //     'Furnish_Stake_SDS':new FormControl('',Validators.required),
    //     'SDS_financial_services':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_SDSwoundup':new FormControl('',Validators.required),
    //     'authorized_official_Signature':new FormControl('',Validators.required),
    //     'authorized_official_NameDesignation':new FormControl('',Validators.required),
    //     'authorized_official_Place':new FormControl('',Validators.required),
    //     'authorized_official_To_Date':new FormControl('',Validators.required),
    //     'authorized_official_Telephone':new FormControl('',Validators.required),
    //     'authorized_official_Email':new FormControl('',Validators.required,),
    //     'authorized_official_Stamp':new FormControl('',Validators.required),
    //     'Signature_Statutory_Auditors':new FormControl('',Validators.required),
    //     'Name_Audit_Firm_UDIN':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Place':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Date':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Email':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Stamp':new FormControl('',Validators.required),  
    //     'APR_A':new FormControl('',Validators.required),
    //     'APR_B': new FormControl('',Validators.required),
    //     'APR_C':new FormControl('',Validators.required),
    //     'APR_D':new FormControl('',Validators.required),
    //     'APR_E':new FormControl('',Validators.required),
    //     'APR_F':new FormControl('',Validators.required),
    //     'APR_G':new FormControl('',Validators.required),   
    //   }
    // )
  }
  readBank() {
    this.apiService.getBank().subscribe((data) => {
      this.BankList = data;
      console.log(this.BankList);
    });
  }
  readcurrency() {
    this.apiService.getCurrency().subscribe((data) => {
      this.CurrencyCodeList = data;
      console.log(this.CurrencyCodeList);
    });
  }
  addShareHoldingFE() {
    if (this.Totalstake == 100) {
      return false;
    }
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;
    this.TotalPstake = 0;
    this.TotalFPstake = 0;
    this.Totalstake = 0;

    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake += element.FPstake;
      this.Totalstake += element.Total;
      if (this.Totalstake > 100) {
        element.Pstake = 0;
        element.FPstake = 0;
        return false;
      }


    });
    return true;
  }

  deleteShareHoldingFE(index) {
    if (this.ShareHoldingFEArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.ShareHoldingFEArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row'); 
      this.TotalPstake = 0;
      this.TotalFPstake = 0;
      this.Totalstake = 0;
      this.ShareHoldingFEArray.forEach(element => {
        this.TotalPstake += element.Pstake;
        this.TotalFPstake += element.FPstake;
        this.Totalstake += element.Total;
      });
      return true;
    }
  }
  onBlur(values) {
    console.log(values);
    values.Total = values.FPstake + values.Pstake;
    if (values.Total > 100) {
      values.FPstake = 0;
      values.Pstake = 0;
      values.Total = 0;
      return false;
    }
    this.TotalPstake = 0;
    this.TotalFPstake = 0;
    this.Totalstake = 0;
    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake += element.FPstake;
      this.Totalstake += element.Total;
    });
    if (this.Totalstake > 100) {
      values.FPstake = 0;
      values.Pstake = 0;
      values.Total = 0;
      return false;
    }
  }
  onSelected(event){
    this.mainform.controls['APR_Bank'].setValue(event.BankName);
 
    // this.form1.controls['test'].value =  {code: 'A',description: 'TEST A'}
 }
  onSubmitAPRFrom() {

    console.log(this.aprForm);

    if (this.mainform.invalid) {
      for (const control of Object.keys(this.mainform.controls)) {
        this.mainform.controls[control].markAsTouched();
      }
      return;
    }
    else {
      debugger;
      for (const control of Object.keys(this.mainform.controls)) {
        this.dataModel[control] = this.mainform.controls[control].value;
      }
    }
    if (this.aprForm.invalid) {
      for (const control of Object.keys(this.aprForm.controls)) {
        this.aprForm.controls[control].markAsTouched();
      }
      return;
    }
    else {
      for (const control of Object.keys(this.aprForm.controls)) {
        this.dataModel[control] = this.aprForm.controls[control].value;
      }
    }
    if (this.declaration.invalid) {
      for (const control of Object.keys(this.declaration.controls)) {
        this.declaration.controls[control].markAsTouched();
      }
      return;
    }
    else {
      // const ShareHoldingFE: FormArray = this.fb.array(this.ShareHoldingFEArray);
      // this.declaration.setControl('ShareHoldingFE', ShareHoldingFE);
      // const SDSArray: FormArray = this.fb.array(this.SDSArray);
      // this.declaration.setControl('SDSDetails', SDSArray);
      for (const control of Object.keys(this.declaration.controls)) {
        this.dataModel[control] = this.declaration.controls[control].value;
      }
    }
    if (this.CAform.invalid) {
      for (const control of Object.keys(this.CAform.controls)) {
        this.CAform.controls[control].markAsTouched();
      }
      return;
    }
    else {
      for (const control of Object.keys(this.CAform.controls)) {
        this.dataModel[control] = this.CAform.controls[control].value;
      }
    }
    for (const control of Object.keys(this.sdsform.controls)) {
      this.dataModel[control] = this.sdsform.controls[control].value;
    }
    this.dataModel['SDSDetails'] = this.SDSArray;
    this.dataModel['ShareHoldingFE'] = this.ShareHoldingFEArray;

    // this.aprForm.setControl('SDSDetails', this.fb.array(this.investment_model.investment_SDSModel || []));
    console.log(this.dataModel);
    return this.apiService.createFormAPR(this.dataModel).subscribe({
      complete: () => {
        //alert('FromAPR successfully created!');
        // this.generatePDF();
        console.log('FromAPR successfully created!');
        //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        this.tabset.tabs[(Number(6))].disabled = false;
        this.tabset.tabs[(Number(6))].active = true;
        if (Number(6) == 6) {
          this.btnShowNext = false;
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  // console.log(this.aprFormlist);


  get APR_From_Date() {
    return this.mainform.get('APR_From_Date')!;
  }
  get APR_To_Date() {
    return this.mainform.get('APR_To_Date')!;
  }
  get APR_UIN() {
    return this.mainform.get('APR_UIN')!;
  }
  get APR_NameIE() {
    return this.mainform.get('APR_NameIE')!;
  }
  get APR_NameJV() {
    return this.mainform.get('APR_NameJV')!;
  }
  get APR_Currency() {
    return this.mainform.get('APR_Currency')!;
  }
  get APR_Bank() {
    return this.mainform.get('APR_Bank')!;
  }



  get APR_Indian_Amount() {
    return this.aprForm.get('APR_Indian_Amount')!;
  }
  get APR_Indian_Share() {
    return this.aprForm.get('APR_Indian_Share')!;
  }
  get APR_Foreign_Amount() {
    return this.aprForm.get('APR_Foreign_Amount')!;
  }
  get APR_Foreign_Share() {
    return this.aprForm.get('APR_Foreign_Share')!;
  }
  get APR_FE_Control() {
    return this.aprForm.get('APR_FE_Control')!;
  }
  get APR_Profit_Current() {
    return this.aprForm.get('APR_Profit_Current')!;
  }
  get APR_Profit_Last() {
    return this.aprForm.get('APR_Profit_Last')!;
  }

  get APR_Dividend_Current() {
    return this.aprForm.get('APR_Dividend_Current')!;
  }
  get APR_Dividend_Last() {
    return this.aprForm.get('APR_Dividend_Last')!;
  }

  get APR_Worth_Current() {
    return this.aprForm.get('APR_Worth_Current')!;
  }
  get APR_Worth_Last() {
    return this.aprForm.get('APR_Worth_Last')!;
  }
  get APR_Dividend_CurYear() {
    return this.aprForm.get('APR_Dividend_CurYear')!;
  }
  get APR_Dividend_commencement() {
    return this.aprForm.get('APR_Dividend_commencement')!;
  }
  get APR_Repayment_CurYear() {
    return this.aprForm.get('APR_Repayment_CurYear')!;
  }
  get APR_Repayment_commencement() {
    return this.aprForm.get('APR_Repayment_commencement')!;
  }
  get APR_EquityExport_CurYear() {
    return this.aprForm.get('APR_EquityExport_CurYear')!;
  }
  get APR_EquityExport_commencement() {
    return this.aprForm.get('APR_EquityExport_commencement')!;
  }
  get APR_Royalties_CurYear() {
    return this.aprForm.get('APR_Royalties_CurYear')!;
  }
  get APR_Royalties_commencement() {
    return this.aprForm.get('APR_Royalties_commencement')!;
  }
  get APR_Technical_CurYear() {
    return this.aprForm.get('APR_Technical_CurYear')!;
  }
  get APR_Technical_commencement() {
    return this.aprForm.get('APR_Technical_commencement')!;
  }
  get APR_Consultancyfee_CurYear() {
    return this.aprForm.get('APR_Consultancyfee_CurYear')!;
  }
  get APR_Consultancyfee_commencement() {
    return this.aprForm.get('APR_Consultancyfee_commencement')!;
  }
  get APR_Others_CurYear() {
    return this.aprForm.get('APR_Others_CurYear')!;
  }
  get APR_Others_commencement() {
    return this.aprForm.get('APR_Others_commencement')!;
  }
  get APR_Profit_CurYear() {
    return this.aprForm.get('APR_Profit_CurYear')!;
  }
  get APR_Profit_commencement() {
    return this.aprForm.get('APR_Profit_commencement')!;
  }
  get APR_Retained_CurYear() {
    return this.aprForm.get('APR_Retained_CurYear')!;
  }
  get APR_Retained_commencement() {
    return this.aprForm.get('APR_Retained_commencement')!;
  }
  get APR_FDIforeign_CurYear() {
    return this.aprForm.get('APR_FDIforeign_CurYear')!;
  }
  get APR_FDIforeign_commencement() {
    return this.aprForm.get('APR_FDIforeign_commencement')!;
  }
  get APR_exces_sshare_CurYear() {
    return this.aprForm.get('APR_exces_sshare_CurYear')!;
  }
  get APR_exces_sshare_commencement() {
    return this.aprForm.get('APR_exces_sshare_commencement')!;
  }

  get APR_SDS_Control() {
    return this.sdsform.get('APR_SDS_Control');
  }

  get APR_Dec_A() {
    return this.declaration.get('APR_Dec_A')!;
  }
  get APR_Dec_B() {
    return this.declaration.get('APR_Dec_B')!;
  }
  get APR_Dec_C() {
    return this.declaration.get('APR_Dec_C')!;
  }
  get APR_Dec_D() {
    return this.declaration.get('APR_Dec_D')!;
  }
  get APR_Dec_E() {
    return this.declaration.get('APR_Dec_E')!;
  }

  get APR_Authorized_Signature() {
    return this.declaration.get('APR_Authorized_Signature')!;
  }
  get APR_Authorized_Name() {
    return this.declaration.get('APR_Authorized_Name')!;
  }
  get APR_Authorized_Designation() {
    return this.declaration.get('APR_Authorized_Designation')!;
  }
  get APR_Dec_Place() {
    return this.declaration.get('APR_Dec_Place')!;
  }
  get APR_Dec_Date() {
    return this.declaration.get('APR_Dec_Date')!;
  }
  get APR_Dec_Telephone() {
    return this.declaration.get('APR_Dec_Telephone')!;
  }
  get APR_Dec_Email() {
    return this.declaration.get('APR_Dec_Email')!;
  }
  get APR_Dec_Stamp() {
    return this.declaration.get('APR_Dec_Stamp')!;
  }

  get APR_CA_A() {
    return this.CAform.get('APR_CA_A')!;
  }
  get APR_CA_B() {
    return this.CAform.get('APR_CA_B')!;
  }
  get APR_CA_C() {
    return this.CAform.get('APR_CA_C')!;
  }
  get APR_CA_Signature() {
    return this.CAform.get('APR_CA_Signature')!;
  }
  get APR_CA_FirmName() {
    return this.CAform.get('APR_CA_FirmName')!;
  }
  get APR_CA_RegNo() {
    return this.CAform.get('APR_CA_RegNo')!;
  }
  get APR_CA_UDIN() {
    return this.CAform.get('APR_CA_UDIN')!;
  }
  get APR_CA_Stamp() {
    return this.CAform.get('APR_CA_Stamp')!;
  }
  get APR_CA_Place() {
    return this.CAform.get('APR_CA_Place')!;
  }
  get APR_CA_Date() {
    return this.CAform.get('APR_CA_Date')!;
  }
  get APR_CA_Email() {
    return this.CAform.get('APR_CA_Email')!;
  }
  addSDS() {
    this.SDS = {
      investment_SDS_Name: "",
      investment_SDS_Level: "",
      investment_SDS_Jurisdiction: "",
      investment_SDS_ParentName: "",
      investment_SDS_ParentLevel: "",
      investment_SDS_ParentJurisdiction: "",
      investment_SDS_InvestmentAmount: "",
      investment_SDS_InvestmentDate: "",
      investment_SDS_LEI: "",
      investment_SDS_Type: "",
      investment_SDS_1987NIC: "",
      investment_SDS_2008NIC: "",
      investment_SDS_Stake: ""
    };
    this.SDSArray.push(this.SDS)
    console.log(this.SDSArray);
    this.SDSlength = this.SDSArray.length;
    return true;
  }
  deleteSDS(index) {
    if (this.SDSArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.SDSArray.splice(index, 1);
      this.SDSlength = this.SDSArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  updatePrev() {

    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    if (Number(this.id) - 1 >= 0) {
      this.tabset.tabs.filter(tab => Number(tab.id) == (Number(this.id)) - 1)
      this.tabset.tabs[(Number(this.id)) - 1].disabled = false;
      this.tabset.tabs[(Number(this.id)) - 1].active = true;

      if (Number(this.id) - 1 == 0) {
        this.btnShow = false;
        this.tabset.tabs[(Number(this.id))].disabled = true;
      }
    }
    if (Number(this.id) <= 5) {
      this.btnShowNext = true;
    }
  }
  updateNext() {
    debugger;
    let count = this.tabset.tabs.length;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    if (Number(this.id) == 1) {
      if (this.mainform.invalid) {

        for (const control of Object.keys(this.mainform.controls)) {
          this.mainform.controls[control].markAsTouched();
        }
        return;

      }
      if (this.aprForm.invalid) {

        for (const control of Object.keys(this.aprForm.controls)) {
          this.aprForm.controls[control].markAsTouched();
        }
        return;

      }
      else {
        debugger;
        var stakepercentage = 0;
        var indianpercentage = 0;
        var foreignpercentage = 0;
        var indianshare=this.aprForm.get("APR_Indian_Share").value;
        var foreignshare=this.aprForm.get("APR_Foreign_Share").value;
        for (const control of this.ShareHoldingFEArray) {
          stakepercentage += control.Total;
          indianpercentage += control.Pstake;
          foreignpercentage += control.FPstake
        }
        if (stakepercentage < 100 || indianpercentage!=indianshare || foreignpercentage!=foreignshare) {
          this.toastr.warning("%stake should be 100 and Capital Structure for indian and foreign share", 'Warning', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
          return;
        }
        const ShareHoldingFE: FormArray = this.fb.array(this.ShareHoldingFEArray);
        this.aprForm.setControl('ShareHoldingFE', ShareHoldingFE);

      }
    }
    else if (Number(this.id) == 2) {
      if (this.sdsform.invalid) {

        for (const control of Object.keys(this.sdsform.controls)) {
          this.sdsform.controls[control].markAsTouched();
        }
        return;

      }
      // if (this.SDSArray.length == 0) {
      //   for (const control of Object.keys(this.aprForm.controls)) {
      //     this.aprForm.controls[control].markAsTouched();
      //   }
      //   return;
      // }
      else {
        const SDSArray: FormArray = this.fb.array(this.SDSArray);
        this.aprForm.setControl('SDSDetails', SDSArray);
      }
    }
    else if (Number(this.id) == 3) {
      if (this.declaration.invalid) {

        for (const control of Object.keys(this.declaration.controls)) {
          this.declaration.controls[control].markAsTouched();
        }
        return;

      }
    }
    else if (Number(this.id) == 4) {
      if (this.CAform.invalid) {

        for (const control of Object.keys(this.CAform.controls)) {
          this.CAform.controls[control].markAsTouched();
        }
        return;

      }
    }

    if (Number(this.id) + 1 < count) {
      this.tabset.tabs.filter(tab => Number(tab.id) == (Number(this.id)) + 1)
      this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
      this.tabset.tabs[(Number(this.id)) + 1].active = true;

      this.btnShow = true;
    }
    if (Number(this.id) + 1 == 5 || Number(this.id) == 6) {
      this.btnShowNext = false;
    }
  }
  @ViewChild('pdfTableAPR') pdfTableAPR: ElementRef;
  @ViewChild('pdfCovering') pdfCovering: ElementRef;
  @ViewChild('pdfTableAPROld') pdfTableAPROld: ElementRef;
  @ViewChild('pdfCAcertificate') pdfCAcertificate: ElementRef;
  
  
  downloadAsPDFAPROld() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTableAPROld.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  async ExportWordAPROld() {
    const pdfTable = this.pdfTableAPROld.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'APRFormOld.docx');
  }
  downloadAsPDFAPR() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTableAPR.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  async ExportWordAPR() {
    const pdfTable = this.pdfTableAPR.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'APRForm.docx');
  }
  downloadCoveringLetter() {

    const doc = new jsPDF();
    const pdfTable = this.pdfCovering.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  async ExportWordCoveringLetter() {
    const pdfTable = this.pdfCovering.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'RBICoveringLetter.docx');
  }
  async ExportWordpdfCAcertificate() {
    const pdfTable = this.pdfCAcertificate.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'AuditorCertificate.docx');
  }
  downloadpdfCAcertificate  () {

    const doc = new jsPDF();
    const pdfTable = this.pdfCAcertificate.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }


}


