import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { GrantDetailsList } from 'src/app/model/Fdi.model';
import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { asBlob } from 'html-docx-js-typescript';
// if you want to save the docx file, you need import 'file-saver'
// @ts-ignore
import { saveAs } from 'file-saver';



type AOA = any[][];
@Component({
  selector: 'app-form-esop',
  templateUrl: './form-esop.component.html',
  styleUrls: ['./form-esop.component.css']
})
export class FormEsopComponent implements OnInit {
  dateresolution: any;
  @ViewChild('country') country: ElementRef
  @ViewChild('selectpicker') selectPicker: ElementRef;
  CountrySettings: IDropdownSettings;
  @ViewChild('tabset') tabset: any;
  public esopFormlist: FormGroup;
  CountryList: any = [];
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) {
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
  GrantDetailsArray: Array<GrantDetailsList> = [];
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
    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "", Number_ESOP_Granted: "", Country: "", ResidentialStatus: "", SubsidiarySDS: "", Pre_determined_issue_price: "", Conversion_ratio1: "1:", Conversion_ratio: "", Equivalent_equity_shares: "", Facevalue_equity_shares: "", Value_of_Shares: "" }
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
        Non_Debt_Instruments: new FormControl(false),
        sectoral_cap_statutory: new FormControl(false),
        Indian_companies_reconstruction: new FormControl(false),
        PMLA_UAPA: new FormControl(false),
        enclose_documents: new FormControl(false),
        certificate_Company_Secretary: new FormControl(false),
        SEBI_registered: new FormControl(false),
        necessary_documents: new FormControl(false),
        GrantDetails: new FormArray([])

      }
    )
  }

  addGrantData() {
    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "", Number_ESOP_Granted: "", Country: "", ResidentialStatus: "", SubsidiarySDS: "", Pre_determined_issue_price: "", Conversion_ratio1: "1:", Conversion_ratio: "", Equivalent_equity_shares: "", Facevalue_equity_shares: "", Value_of_Shares: "" }
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

  get Non_Debt_Instruments() {
    return this.esopFormlist.get('Non_Debt_Instruments');
  }
  get sectoral_cap_statutory() {
    return this.esopFormlist.get('sectoral_cap_statutory');
  }
  get Indian_companies_reconstruction() {
    return this.esopFormlist.get('Indian_companies_reconstruction');
  }
  get PMLA_UAPA() {
    return this.esopFormlist.get('PMLA_UAPA');
  }
  get enclose_documents() {
    return this.esopFormlist.get('enclose_documents');
  }
  get certificate_Company_Secretary() {
    return this.esopFormlist.get('certificate_Company_Secretary');
  }
  get SEBI_registered() {
    return this.esopFormlist.get('SEBI_registered');
  }
  get necessary_documents() {
    return this.esopFormlist.get('necessary_documents');
  }

  readCountry() {
    debugger
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
      console.log(this.CountryList);
    });
  }
  CounEquivalentEquityShares(i) {
    if (this.GrantDetailsArray[i].Number_ESOP_Granted != null && this.GrantDetailsArray[i].Conversion_ratio != null) {
      this.GrantDetailsArray[i].Equivalent_equity_shares = this.GrantDetailsArray[i].Number_ESOP_Granted * this.GrantDetailsArray[i].Conversion_ratio;

    }
    this.CountValueofShares(i)
  }

  CountValueofShares(i) {
    if (this.GrantDetailsArray[i].Equivalent_equity_shares != null && this.GrantDetailsArray[i].Facevalue_equity_shares != null) {
      this.GrantDetailsArray[i].Value_of_Shares = this.GrantDetailsArray[i].Equivalent_equity_shares * this.GrantDetailsArray[i].Facevalue_equity_shares;
    }

  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
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

  Tabindexc: number = 0;
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
      if (this.esopFormlist.invalid) {
        for (const control of Object.keys(this.esopFormlist.controls)) {
          this.esopFormlist.controls[control].markAsTouched();
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
    debugger
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

  downloadAsPDF1() {
    debugger;
    const doc = new jsPDF();
    const pdfTable = this.pdfTable1.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF2() {
    debugger;
    const doc = new jsPDF();
    const pdfTable = this.pdfTable2.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF3() {
    debugger;
    const doc = new jsPDF();
    const pdfTable = this.pdfTable3.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF4() {
    debugger;
    const doc = new jsPDF();
    const pdfTable = this.pdfTable4.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }

  Exdata: AOA = [[1, 2], [3, 4]];
  onFileChange(evt: any) {
    debugger
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
      // this.GrantDetailsArray=this.Exdata;
      console.log("data:", this.Exdata);
      for (var i = 1; i < this.Exdata.length; i++) {
        if (i > 1) {
          this.addGrantData();
        }
        this.GrantDetailsArray[i - 1].Full_Name_Grantee = this.Exdata[i][0];
        this.GrantDetailsArray[i - 1].Date_of_Issue = this.Exdata[i][1];

        this.GrantDetailsArray[i - 1].Number_ESOP_Granted = this.Exdata[i][2];
        this.GrantDetailsArray[i - 1].Country = this.Exdata[i][3];
        this.GrantDetailsArray[i - 1].ResidentialStatus = this.Exdata[i][4];
        this.GrantDetailsArray[i - 1].SubsidiarySDS = this.Exdata[i][5];
        this.GrantDetailsArray[i - 1].Pre_determined_issue_price = this.Exdata[i][6];
        /*              this.GrantDetailsArray[i].Conversion_ratio1= this.Exdata[i+1][7]; */
        this.GrantDetailsArray[i - 1].Conversion_ratio = this.Exdata[i][7];
        this.GrantDetailsArray[i - 1].Equivalent_equity_shares = this.Exdata[i][8];
        this.GrantDetailsArray[i - 1].Facevalue_equity_shares = this.Exdata[i][9];
        this.GrantDetailsArray[i - 1].Value_of_Shares = this.Exdata[i][10];
        //this.esopFormlist.get('grantFormArra').get('Date_of_Issue').patchValue(this.formatDate(new Date()));
      }
    };
    reader.readAsBinaryString(target.files[0]);
    evt.target.value = null;
  }
  async ExportWord1() {
    const pdfTable = this.pdfTable1.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'Covering.docx');
  }

  async ExportWord2() {
    const pdfTable = this.pdfTable2.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'CSCertificate.docx');
  }
  async ExportWord3() {
    const pdfTable = this.pdfTable3.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'landscape',
      margins: { top: 720 },
    });
    saveAs(converted, 'Declaration.docx');
  }

  get GrantDetails(): FormArray {
    debugger
    return this.esopFormlist.get('GrantDetails') as FormArray;
  }

  DateResolutionChange(e) {
    debugger
    const grantFormArray: FormArray = this.fb.array(this.GrantDetailsArray);
    grantFormArray.value[0].Date_of_Issue=e.target.value;

  }

}


