import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';

import { GrantDetailsList } from 'src/app/model/Fdi.model';
import jsPDF from 'jspdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { asBlob } from 'html-docx-js-typescript';
// if you want to save the docx file, you need import 'file-saver'
// @ts-ignore
import { saveAs } from 'file-saver';
import { ignoreElements } from 'rxjs';


type AOA = any[][];
@Component({
  selector: 'app-form-fcgpr',
  templateUrl: './form-fcgpr.component.html',
  styleUrls: ['./form-fcgpr.component.css'],
  providers: [DatePipe]
})
export class FormFcgprComponent implements OnInit {
  Tabindexc: number = 0;
  today = new Date();
  flagStrike: boolean = true;
  dateresolution: any;
  @ViewChild('country') country: ElementRef
  @ViewChild('selectpicker') selectPicker: ElementRef;
  CountrySettings: IDropdownSettings;
  @ViewChild('tabset') tabset: any;
  public fcgprFormlist: FormGroup;
  CountryList: any = [];
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder, public datepipe: DatePipe) {
    this.readCountry();
  }
  foreigninvestmentProject = [
    { id: '1', Type: 'Yes' },
    { id: '2', Type: 'No' }
  ]
  Shareholding = [
    { id: '1', Type: 'Yes' },
    { id: '2', Type: 'No' }
  ]
  GrantDetailsArray: Array<any> = [];
  GrantDetailsdata: any = {};

  ngOnInit(): void {
    this.CountrySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      maxHeight: 200,
      enableCheckAll: false

    };
    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "", Number_FCGPR_Granted: "", Country: "", ResidentialStatus: "", SubsidiarySDS: "", Pre_determined_issue_price: "", Conversion_ratio1: "1:", Conversion_ratio: "", Equivalent_equity_shares: "", Facevalue_equity_shares: "", Value_of_Shares: "" }
    this.GrantDetailsArray.push(this.GrantDetailsdata);

    var local = new Date();
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset());


    this.fcgprFormlist = this.fb.group(
      {
        // Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')
        CIN_LIP: new FormControl('', Validators.required),
        NameofinvesteeCompany: new FormControl('', Validators.required),
        Type_Of_Allotment: new FormControl('', Validators.required),
        PanNo: new FormControl('', Validators.required),
        Entry_Route: new FormControl('Automatic Route', Validators.required),
        Sectoral_Cap: new FormControl('', Validators.required),
        Application_Date: new FormControl(local.toJSON().slice(0, 10), Validators.required),
        Date_of_Issue: new FormControl('', Validators.required),
        Initial_FC_GPR_Reference_Number: new FormControl('', Validators.required),
        Paid_Up_Capital: new FormControl('', Validators.required),
        foreigninvestmentproject: new FormControl('No', Validators.required),
        Shareholdingpattern: new FormControl('Yes', Validators.required),

        // Registered_Office: new FormControl('', Validators.required),
        // FCGPR_Scheme_Name: new FormControl('', Validators.required),
        // BR_EGM_Circular: new FormControl('', Validators.required),

        // Applicable_Sectoral_Cap: new FormControl('100', Validators.required),

        Non_Debt_Instruments: new FormControl(false),
        sectoral_cap_statutory: new FormControl(false),
        Indian_companies_reconstruction: new FormControl(false),
        PMLA_UAPA: new FormControl(false),
        enclose_documents: new FormControl(false),
        certificate_Company_Secretary: new FormControl(false),
        SEBI_registered: new FormControl(false),
        necessary_documents: new FormControl(false),
        Authorised_Signatory_Name: new FormControl(''),
        Authorised_Signatory_Designation: new FormControl(''),
        GrantDetails: this.fb.array([]),

      }
    )
  }

  GrantDetails(): FormArray {
    return this.fcgprFormlist.get('GrantDetails') as FormArray;
  }


  addGrantData() {
    debugger
    this.GrantDetailsdata = {
      Sno:"",
      Investor_Name:"",
      Investor_Address:"",
      Town_City:"",
      State:"",
      PIN_Zip_Code:"",
      Country:"",
      Constitution_investing_entity:"",
      Type_of_Capital_instrument:"",
      No_of_Instruments_instrument:"",
      Conversion_ratio:"",
      No_of_Equity_shares:"",
      Fair_value_of_Shares:"",
      Issue_Price:"",
      Amount_of_Consideration:"",
      Consolidated_Particulars_of_Issue:"",
      AD_Bank_Name:"",
      Address:"",
      n_Town_City:"",
      n_Pin_Code:"",
      n_State:"",
      Mode_of_Payment:"",
      Based_on_Mode_of_Payment_Selection:"",
      Total_amount_of_Inflow:""
    }
    this.GrantDetailsArray.push(this.GrantDetailsdata);
    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    for (var i = 0; i < grantFormArray.length; i++) {
      grantFormArray.value[i].Date_of_Issue = this.fcgprFormlist.value.Date_of_Issue;
    }
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

  get Non_Debt_Instruments() {
    return this.fcgprFormlist.get('Non_Debt_Instruments');
  }
  get sectoral_cap_statutory() {
    return this.fcgprFormlist.get('sectoral_cap_statutory');
  }
  get Indian_companies_reconstruction() {
    return this.fcgprFormlist.get('Indian_companies_reconstruction');
  }
  get PMLA_UAPA() {
    return this.fcgprFormlist.get('PMLA_UAPA');
  }
  get enclose_documents() {
    return this.fcgprFormlist.get('enclose_documents');
  }
  get certificate_Company_Secretary() {
    return this.fcgprFormlist.get('certificate_Company_Secretary');
  }
  get SEBI_registered() {
    return this.fcgprFormlist.get('SEBI_registered');
  }
  get necessary_documents() {
    return this.fcgprFormlist.get('necessary_documents');
  }

  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
      console.log(this.CountryList);
    });
  }
  CounEquivalentEquityShares(i) {
    if (this.GrantDetailsArray[i].Number_FCGPR_Granted != null && this.GrantDetailsArray[i].Conversion_ratio != null) {
      this.GrantDetailsArray[i].Equivalent_equity_shares = this.GrantDetailsArray[i].Number_FCGPR_Granted * this.GrantDetailsArray[i].Conversion_ratio;

    }
    this.CountValueofShares(i)
  }

  CountValueofShares(i) {
    if (this.GrantDetailsArray[i].Equivalent_equity_shares != null && this.GrantDetailsArray[i].Facevalue_equity_shares != null) {
      this.GrantDetailsArray[i].Value_of_Shares = this.GrantDetailsArray[i].Equivalent_equity_shares * this.GrantDetailsArray[i].Facevalue_equity_shares;
    }

  }


  onSubmitFCGPRFrom() {
    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    this.fcgprFormlist.setControl('GrantDetails', grantFormArray);

    console.log(this.fcgprFormlist.value);
    if (this.fcgprFormlist.invalid) {
      for (const control of Object.keys(this.fcgprFormlist.controls)) {
        this.fcgprFormlist.controls[control].markAsTouched();
      }
      return;
    }
    else {
      return this.apiService.createFormEsop(this.fcgprFormlist.value).subscribe({
        complete: () => {
          this.changeTab()
          // alert('FromEsop successfully created!');
          //console.log('FromEsop successfully created!');
          //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }


  /*   confirmTabSwitch(event) {
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
  
    } */
  btnNext: boolean = true;
  btnBack: boolean = false;
  changeTab() {

    if (this.Tabindexc == 1) {
      if (this.fcgprFormlist.invalid) {
        console.log(this.fcgprFormlist, '---this.fcgprFormlist.controls');

        for (const control of Object.keys(this.fcgprFormlist.controls)) {
          this.fcgprFormlist.controls[control].markAsTouched();
        }
        return;
      }
    }

    if (this.Tabindexc == 0) {
      this.tabset.tabs[1].disabled = false;
      this.tabset.tabs[1].active = true;
      this.Tabindexc = 1;
      this.btnBack = true;
    }
    else {
      if (this.Tabindexc < 4) {
        this.Tabindexc = this.Tabindexc + 1;
        this.tabset.tabs[this.Tabindexc].disabled = false;
        this.tabset.tabs[this.Tabindexc].active = true;
        this.btnBack = true;
        if (this.Tabindexc == 4) {
          this.btnNext = false;
        }

      }
    }
  }
  btnBackchange() {

    if (this.Tabindexc == 0) {
      this.tabset.tabs[1].active = true;
      this.tabset.tabs[1].disabled = true;
      this.Tabindexc = 1;
    }
    else {
      if (this.Tabindexc <= 4) {
        this.btnNext = true;
        this.Tabindexc = this.Tabindexc - 1;
        this.tabset.tabs[this.Tabindexc].active = true;
        this.tabset.tabs[this.Tabindexc].disabled = true;
        if (this.Tabindexc == 0) {
          this.btnBack = false;
          this.btnNext = true;
          this.tabset.tabs[0].disabled = false;
          this.tabset.tabs[0].active = true;
        }
      }
    }
  }

  @ViewChild('pdfTable1') pdfTable1: ElementRef;
  @ViewChild('pdfTable2') pdfTable2: ElementRef;
  @ViewChild('pdfTable3') pdfTable3: ElementRef;
  @ViewChild('pdfTable4') pdfTable4: ElementRef;
  @ViewChild('pdfTable5', { static: false }) pdfTable5: ElementRef;

  downloadAsPDF1() {

    const doc = new jsPDF();
    const pdfTable = this.pdfTable1.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF2() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable2.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF3() {

    const doc = new jsPDF();
    const pdfTable = this.pdfTable3.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF4() {

    const doc = new jsPDF();
    const pdfTable = this.pdfTable4.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML, { tableAutoSize: false });
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF5() {

    /* let pdf = new jsPDF('p','pt','a4');
     pdf.html(this.pdfTable5.nativeElement,{
      callback:(pdf)=>{
        pdf.save("Annexure.pdf")
      }
     }) */
    const doc = new jsPDF();
    const pdfTable = this.pdfTable5.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = {
      content: html,
      pageSize: 'A4',
      pageOrientation: 'landscape',
      styles: {
        tableCenter: {
          alignment: 'center',
          absolutePosition: { x: 10, y: 35 },
          margin: [20, 5, 0, 10],
        },
      },
    };
    pdfMake.createPdf(documentDefinition).open();

  }


  Exdata: AOA = [[1, 2], [3, 4]];
  onFileChange(evt: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.Exdata = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.Exdata.length,'-=-=-=-=this.Exdata.length')
      for (var i = 1; i < this.Exdata.length; i++) {
        // let RDate = new Date(this.Exdata[i][1]);
        if(this.Exdata[i][0]){

        
        if (i > 1) {
          this.addGrantData();
        }

      

        this.GrantDetailsArray[i - 1].Sno = this.Exdata[i][0];
        this.GrantDetailsArray[i - 1].Investor_Name = this.Exdata[i][1];
        this.GrantDetailsArray[i - 1].Investor_Address = this.Exdata[i][2];
        // this.GrantDetailsArray[i - 1].Date_of_Issue = this.datepipe.transform(RDate, 'yyyy-MM-dd');

        this.GrantDetailsArray[i - 1].Town_City = this.Exdata[i][3];
        this.GrantDetailsArray[i - 1].State = this.Exdata[i][4];
        this.GrantDetailsArray[i - 1].PIN_Zip_Code = this.Exdata[i][5];
        this.CountryChange(this.Exdata[i][6]);

        this.GrantDetailsArray[i - 1].Constitution_investing_entity = this.Exdata[i][7];
        this.GrantDetailsArray[i - 1].Type_of_Capital_instrument = this.Exdata[i][8];
        this.GrantDetailsArray[i - 1].No_of_Instruments_instrument = this.Exdata[i][9];
        this.GrantDetailsArray[i - 1].Conversion_ratio = this.Exdata[i][10];
        this.GrantDetailsArray[i - 1].No_of_Equity_shares = this.Exdata[i][11];
        this.GrantDetailsArray[i - 1].Fair_value_of_Shares = this.Exdata[i][12];
        this.GrantDetailsArray[i - 1].Issue_Price = this.Exdata[i][13];

        this.GrantDetailsArray[i - 1].Amount_of_Consideration = this.Exdata[i][14];
        this.GrantDetailsArray[i - 1].Consolidated_Particulars_of_Issue = this.Exdata[i][15];
        this.GrantDetailsArray[i - 1].AD_Bank_Name = this.Exdata[i][16];

        this.GrantDetailsArray[i - 1].Address = this.Exdata[i][17];
        this.GrantDetailsArray[i - 1].n_Town_City = this.Exdata[i][18];
        this.GrantDetailsArray[i - 1].n_Pin_Code = this.Exdata[i][19];
        this.GrantDetailsArray[i - 1].n_State = this.Exdata[i][20];
        this.GrantDetailsArray[i - 1].Mode_of_Payment = this.Exdata[i][21];
        this.GrantDetailsArray[i - 1].Based_on_Mode_of_Payment_Selection = this.Exdata[i][22];
        this.GrantDetailsArray[i - 1].Total_amount_of_Inflow = this.Exdata[i][23];
        //this.fcgprFormlist.get('grantFormArra').get('Date_of_Issue').patchValue(this.formatDate(new Date()));
      }
      }
    };
    reader.readAsBinaryString(target.files[0]);
    evt.target.value = null;
  }
  async ExportWord1() {
    const pdfTable = this.pdfTable1.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },

    });
    saveAs(converted, 'RBICoveringLetter.docx');
  }

  async ExportWord2() {
    const pdfTable = this.pdfTable2.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'CompanySecretaryCertificate.docx');
  }
  async ExportWord3() {
    const pdfTable = this.pdfTable3.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'AuthorisedRepresentativeofCompany.docx');
  }
  async ExportWord4() {
    const pdfTable = this.pdfTable4.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Annexure.docx');
  }
  async ExportWord5() {
    const pdfTable = this.pdfTable5.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Annexure.docx');
  }

  DateResolutionChange(e) {

    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    grantFormArray.value[0].Date_of_Issue = e.target.value;

  }

  CountryChange(couname) {

    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    for (var i = 0; i < grantFormArray.length; i++) {
      if (couname == "India") {
        grantFormArray.value[i].ResidentialStatus = 'Resident';
      }
      else {
        grantFormArray.value[i].ResidentialStatus = 'Non-Resident';
      }
    }
  }

}


