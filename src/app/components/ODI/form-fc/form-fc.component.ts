import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iinvestment, IinvestmentSDS, IinvestmentWOS } from 'src/app/model/iinvestment';
import { ApiService } from 'src/app/service/api.service';
import { CodeClassGrid, DisinvestmentMethodGrid, DynamicGrid, FCDisinvestmentGrid, FinancialCommitmentGrid, PEFEntityGrid, ShareHoldingFEGrid, SumFCGrid } from 'src/app/model/gridmodel';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CommonService } from "src/app/service/common.service";
import { BehaviorSubject, Subscription } from 'rxjs';
import { FCFormService } from 'src/app/service/formfc.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { MatTable } from '@angular/material/table';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export interface TableData {
  from: Date;
  to: Date;
}
@Component({
  selector: 'app-form-fc',
  templateUrl: './form-fc.component.html',
  styleUrls: ['./form-fc.component.css'],
  providers: [DatePipe]
})
export class FormFcComponent implements OnInit {

  data: TableData[] = [ { from: new Date(), to: new Date() } ];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['from', 'to', 'Actions'];
  rows: FormArray = this.fb.array([]);
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  CountryList: any = [];
  disinvetmenttype: DisinvetmentType[];
  id: string = '0';
  typeshow: string = '0';
  CityList: any = [];
  fctypes: DisinvetmentType[];
  basicCityList: any = [];
  basicStateList: any = [];
  // reactiveForm!: FormGroup;
  public reactiveForm: FormGroup;
  btnShow: boolean;
  btnShowNext: boolean;
  investment_model: Iinvestment;
  @Input() name: string;
  @ViewChild('tabset') tabset: TabsetComponent;
  @ViewChild('tabset') tabsetsubmenu: TabsetComponent;
  @ViewChild('tabset') tabsetrestructuring: TabsetComponent;
  @ViewChild('tabset') tabsetdisinvestment: TabsetComponent;

  dynamicArray: Array<DynamicGrid> = [];
  sumFCArray: Array<SumFCGrid> = [];
  FCDisinvestmentArray: Array<FCDisinvestmentGrid> = [];
  PEFEntityArray: Array<PEFEntityGrid> = [];
  CodeClassArray: Array<CodeClassGrid> = [];
  ShareHoldingFEArray: Array<ShareHoldingFEGrid> = [];
  ShareHoldingFE: any = {};
  ShareHoldingFElength: number = 0;
  BankList: any = [];
  codeClass: any = {};
  codeClasslength: number = 0;
  TotalPstake: number = 0;
  TotalFPstake: number = 0;
  Totalstake: number = 0;
  tabactive: boolean = true;

  DisinvestmentMethodArray: Array<DisinvestmentMethodGrid> = [];
  DisinvestmentMethod: any = {};
  DisinvestmentMethodlength: number = 0;

  sumFC: any = {};
  sumFClength: number = 0;
  FCDisinvestment: any = {};
  FCDisinvestmentlength: number = 0;
  PEFEntity: any = {};
  PEFEntitylength: number = 0;
  fcFormlist: FormGroup
  investorForm: FormGroup
  fcFormlistSub: Subscription
  formInvalid: boolean = false;
  investordetails: FormArray
  dataModel: any = {};
  NICCodeListShow: any = [];
  NICCodeListShowWOS: any = [];
  cityListShow: any = [];
  NICCodeList: any = [];
  NICCodeListWOS: any = [];
  SelectFC_FDINICCodeDesArray: any = [];
  WOSFC_FDINICCodeDesArray: any = [];
  ActiveTab: number = 1987;
  emailPattern: string;
  // investment_model: IinvestmentWOS;
  Jurisdictiontypes: DisinvetmentType[];
  accountingtypes: DisinvetmentType[];
  invetmentsCategorytypes: DisinvetmentType[];
  model: IinvestmentSDS;
  sdstypes: DisinvetmentType[];
  sdsleveltypes: DisinvetmentType[];
  SDSArray: Array<IinvestmentSDS> = [];
  SDS: any = {};
  SDSlength: number = 0;
  FinancialCommitmentArray: Array<FinancialCommitmentGrid> = [];
  FinancialCommitment: any = {};
  FinancialCommitmentlength: number = 0; Today: Date;
  Disinvestmentroutetypes: DisinvetmentType[];
  disinvestmentmaintypes: DisinvetmentType[];
  disinvestmentmethodtypes: DisinvetmentType[];
  
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService,
    private commonservice: CommonService, private fb: FormBuilder, public datepipe: DatePipe, private fcformService: FCFormService, private toastr: ToastrService) {
    this.fctypes = commonservice.getAllfctypes();
    this.Disinvestmentroutetypes = commonservice.getDisinvestmentroutetypes();
    this.disinvestmentmaintypes = commonservice.getdisinvestmentmaintypes();
    this.disinvestmentmethodtypes = commonservice.getdisinvestmentmethodtypes();

    this.Today = new Date();
    this.btnShowNext = true;
    this.readBank();
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.readNICCodeDes();
    this.readCountry();
    this.sdstypes = commonservice.getAllsdstypes();
    this.sdsleveltypes = commonservice.getAllsdsleveltypes();
    var today = new Date();
    this.fcFormlist = this.fb.group({
      investment_UIN: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]{5}[0-9]{8}"), Validators.maxLength(13)]),
      investment_Route: ['', Validators.required],
      investment_USD: ['', Validators.required],
      investment_INR: ['', Validators.required],
      investment_Type: ['', Validators.required],
      FC_SDS_Control: new FormControl('', Validators.required),
      investorForm: new FormGroup({
        'investor_CIN': new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]{1}[0-9]{5}[A-Za-z]{2}[0-9]{4}[A-Za-z]{3}[0-9]{6}"), Validators.maxLength(21)]),
        'investor_name': new FormControl('', Validators.required),
        'investor_pan': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'), Validators.maxLength(10)]),
        'investor_LEI': new FormControl('', Validators.required),
        'investor_GroupIE': new FormControl('', Validators.required),
        'investor_Address': new FormControl('', Validators.required),
        'investor_State': new FormControl('', Validators.required),
        'investor_City': new FormControl('', Validators.required),
        'investor_Pin': new FormControl('', [Validators.required, Validators.pattern("[0-9]{6}"), Validators.minLength(6),
        Validators.maxLength(6)]),
        'investor_ContactPerson': new FormControl('', Validators.required),
        'investor_CPDesignation': new FormControl('', Validators.required),
        'investor_TelephoneNumber': new FormControl('', Validators.required),
        'investor_Mobile': new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}"), Validators.minLength(10),
        Validators.maxLength(10)]),
        'investor_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'investor_NetworthAmount': new FormControl('', Validators.required),
        'investor_NetworthDate': new FormControl('', Validators.required),
      }),
      JVWOSform: new FormGroup({
        'investment_ForeignEntity': new FormControl('', Validators.required),
        'investment_Jurisdiction': new FormControl('', Validators.required),
        'investment_DateIncorpation': new FormControl('', Validators.required),
        'investment_WOS_LEI': new FormControl('', Validators.required),
        'investment_ControlFE': new FormControl('', Validators.required),
        'investment_AccountingYear': new FormControl('', Validators.required),
        'investment_WOS_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      }),
      Declarationform: new FormGroup({
        'investment_Individual_Place': new FormControl('', Validators.required),
        'investment_Individual_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'investment_Individual_Stamp': new FormControl(''),
        'investment_Individual_Telephone': new FormControl(''),
        'investment_Individual_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'investment_individual_A': new FormControl(''),
        'investment_individual_B': new FormControl(''),
        'investment_individual_C': new FormControl(''),
        'investment_individual_D': new FormControl(''),
        'investment_individual_E': new FormControl(''),
        'investment_individual_F': new FormControl(''),
        'investment_individual_G': new FormControl(''),
      }),
      Certificateform: new FormGroup({
        'investment_Group_Signature': new FormControl(''),
        'investment_Group_NameAudit': new FormControl('', Validators.required),
        'investment_Group_UDIN': new FormControl('', Validators.required),
        'investment_Group_RegistrationNo': new FormControl('', Validators.required),
        'investment_Group_Place': new FormControl('', Validators.required),
        'investment_Group_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'investment_Group_Stamp': new FormControl(''),
        'investment_Group_Telephone': new FormControl(''),
        'investment_Group_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      }),
      Restructingform: new FormGroup({
        'restructing_Name_IE': new FormControl('', Validators.required),
        'restructing_PAN_IE': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'), Validators.maxLength(10)]),
        'restructing_Name_FE': new FormControl('', Validators.required),
        'restructing_Date': new FormControl('', Validators.required),
        'restructing_Valuation_Date': new FormControl('', Validators.required),
        'restructing_Stake_FE': new FormControl('', Validators.required),
        'restructing_Stake_PostRestructing': new FormControl(''),
        'restructing_Total_ALosses': new FormControl(''),
        'restructing_Proportionate_Amount': new FormControl(''),
        'restructing_Total_Outstanding': new FormControl(''),

        'restructing_Equity_FC': new FormControl(''),
        'restructing_Equity_AD': new FormControl(''),
        'restructing_Equity_TotalFC': new FormControl(''),
        'restructing_Debt_FC': new FormControl(''),
        'restructing_Debt_AD': new FormControl(''),
        'restructing_Debt_TotalFC': new FormControl(''),
        'restructing_Guarantee_FC': new FormControl(''),
        'restructing_Guarantee_AD': new FormControl(''),
        'restructing_Guarantee_TotalFC': new FormControl(''),
        'restructing_Receivables_FC': new FormControl(''),
        'restructing_Receivables_AD': new FormControl(''),
        'restructing_Receivables_TotalFC': new FormControl(''),
        'restructing_Ainterest_FC': new FormControl(''),
        'restructing_Ainterest_AD': new FormControl(''),
        'restructing_Ainterest_TotalFC': new FormControl(''),
        'restructing_BDividend_FC': new FormControl(''),
        'restructing_BDividend_AD': new FormControl(''),
        'restructing_BDividend_TotalFC': new FormControl(''),
        'restructing_COther_FC': new FormControl(''),
        'restructing_COther_AD': new FormControl(''),
        'restructing_COther_TotalFC': new FormControl(''),

        'restructing_IE_Place': new FormControl('', Validators.required),
        'restructing_AD_Place': new FormControl('', Validators.required),
        'restructing_IE_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'restructing_AD_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'restructing_IE_Signature': new FormControl(''),
        'restructing_AD_Signature': new FormControl(''),
        'restructing_IE_Name': new FormControl(''),
        'restructing_AD_Name': new FormControl(''),
        'restructing_IE_Designation': new FormControl(''),
        'restructing_AD_Designation': new FormControl(''),
        'restructing_IE_Telephone': new FormControl(''),
        'restructing_AD_Telephone': new FormControl(''),
        'restructing_IE_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'restructing_AD_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'restructing_IE_A': new FormControl(''),
        'restructing_IE_B': new FormControl(''),
        'restructing_IE_B1': new FormControl(''),
        'restructing_IE_C': new FormControl(''),
        'restructing_IE_C1': new FormControl(''),
      }),
      Disinvestmentform: new FormGroup({
        'disinvestment_Name_IE': new FormControl('', Validators.required),
        'disinvestment_PAN_IE': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'), Validators.maxLength(10)]),
        'disinvestment_Date': new FormControl('', Validators.required),
        'disinvestment_Route': new FormControl('', Validators.required),
        'disinvestment_Type': new FormControl('', Validators.required),
        'disinvestment_Stake_Time': new FormControl('', Validators.required),
        'disinvestment_Stake_Partial': new FormControl('', Validators.required),
        'disinvestment_Total_Fair': new FormControl('', Validators.required),
        'disinvestment_ValuationDate': new FormControl('', Validators.required),
        'disinvestment_SubmissionDate': new FormControl('', Validators.required),
        'disinvestment_APRPeriod': new FormControl('', Validators.required),

        'disinvestment_Equity_FC': new FormControl(''),
        'disinvestment_Equity_AD': new FormControl(''),
        'disinvestment_Equity_TotalFC': new FormControl(''),
        'disinvestment_Debt_FC': new FormControl(''),
        'disinvestment_Debt_AD': new FormControl(''),
        'disinvestment_Debt_TotalFC': new FormControl(''),
        'disinvestment_Guarantee_FC': new FormControl(''),
        'disinvestment_Guarantee_AD': new FormControl(''),
        'disinvestment_Guarantee_TotalFC': new FormControl(''),
        'disinvestment_Receivables_FC': new FormControl(''),
        'disinvestment_Receivables_AD': new FormControl(''),
        'disinvestment_Receivables_TotalFC': new FormControl(''),
        'disinvestment_Ainterest_FC': new FormControl(''),
        'disinvestment_Ainterest_AD': new FormControl(''),
        'disinvestment_Ainterest_TotalFC': new FormControl(''),
        'disinvestment_BDividend_FC': new FormControl(''),
        'disinvestment_BDividend_AD': new FormControl(''),
        'disinvestment_BDividend_TotalFC': new FormControl(''),
        'disinvestment_COther_FC': new FormControl(''),
        'disinvestment_COther_AD': new FormControl(''),
        'disinvestment_COther_TotalFC': new FormControl(''),

        'disinvestment_IE_Place': new FormControl('', Validators.required),
        'disinvestment_AD_Place': new FormControl('', Validators.required),
        'disinvestment_IE_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'disinvestment_AD_Date': new FormControl(this.datepipe.transform(today, 'yyyy-MM-dd'), Validators.required),
        'disinvestment_IE_Signature': new FormControl(''),
        'disinvestment_AD_Signature': new FormControl(''),
        'disinvestment_IE_Name': new FormControl(''),
        'disinvestment_AD_Name': new FormControl(''),
        'disinvestment_IE_Designation': new FormControl(''),
        'disinvestment_AD_Designation': new FormControl(''),
        'disinvestment_IE_Telephone': new FormControl(''),
        'disinvestment_AD_Telephone': new FormControl(''),
        'disinvestment_IE_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'disinvestment_AD_Email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
        'disinvestment_IE_A': new FormControl(''),
        'disinvestment_IE_B': new FormControl(''),
        'disinvestment_IE_B1': new FormControl(''),
        'disinvestment_IE_C': new FormControl(''),
        'disinvestment_IE_C1': new FormControl(''),
      })
    });
    this.readCity();
    this.readState();
    // this.investment_model = {} as IinvestmentWOS;
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.accountingtypes = commonservice.getAllaccountingtypes();
    this.invetmentsCategorytypes = commonservice.getAllinvetmentsCategorytypes();
    this.setForm();
    this.disinvetmenttype = commonservice.getAllDisinvestmentTypes();
    console.log(this.disinvetmenttype);
    this.investment_model = {} as Iinvestment;

  }

  ngOnInit(): void {
    this.data.forEach((d: TableData) => this.addRow(d, false));
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
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;

    debugger;
    this.DisinvestmentMethod = { Method: "test", Details: "test" };
    this.DisinvestmentMethodArray.push(this.DisinvestmentMethod);

    

    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    this.codeClasslength = this.CodeClassArray.length;
    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    this.sumFClength = this.sumFCArray.length;
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    this.PEFEntitylength = this.PEFEntityArray.length;
    this.FinancialCommitment = { InvestSource: "", CategoryType: "", Date: "", AmountFCY: "", AmountINR: "" }
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
  }
  updateView() {
    this.dataSource.next(this.rows.controls);
  }
  addRow(d?: TableData, noUpdate?: boolean) {
    const row = this.fb.group({
      'from'   : [d && d.from ? d.from : null, []],
      'to'     : [d && d.to   ? d.to   : null, []]
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }
  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
      console.log(this.CountryList);
    });
  }
  
  // data = [
  //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // ];


  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  SelectFC_FDINICCodeDes(item: any) {
    debugger;
    console.log(item)
    let itemExist = this.SelectFC_FDINICCodeDesArray.findIndex(nicCode => nicCode.Class === item.Class);
    if (item.SelectedValue == true) {
      this.NICCodeListShow.forEach(function (checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
          item.SelectedValue = false
        }
      })
      this.SelectFC_FDINICCodeDesArray.splice(itemExist, 1)
    }
    else {
      this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass, SelectedValue: true })
      this.NICCodeListShow.forEach(function (checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
        }

      })
    }
  }
  SelectWOSFC_FDINICCodeDes(item: any) {
    debugger;
    console.log(item)
    let itemExist = this.WOSFC_FDINICCodeDesArray.findIndex(nicCode => nicCode.Class === item.Class);
    if (item.SelectedValue == true) {
      this.NICCodeListShowWOS.forEach(function (checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
          item.SelectedValue = false
        }
      })
      this.WOSFC_FDINICCodeDesArray.splice(itemExist, 1)
    }
    else {
      this.WOSFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass, SelectedValue: true })
      this.NICCodeListShowWOS.forEach(function (checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
        }

      })
    }
  }
  readNICCodeDes() {
    this.apiService.getNICCodeDes().subscribe((Nicdata) => { this.NICCodeList = Nicdata; });
    this.apiService.getNICCodeDes().subscribe((Nicdata) => { this.NICCodeListWOS = Nicdata; });
  }
  OnModuleTabClick(year: any) {
    debugger;
    console.log(this.NICCodeList)
    this.NICCodeListShow = this.NICCodeList.filter(x => x.Year == year)
    this.ActiveTab = year
  }
  OnModuleTabClickWOS(year: any) {
    debugger;
    console.log(this.NICCodeList)
    this.NICCodeListShowWOS = this.NICCodeListWOS.filter(x => x.Year == year)
    this.ActiveTab = year
  }
  searchNicCode(event: any, code?: any) {
    debugger;
    console.log(typeof event.target.value)
    this.NICCodeListShow = this.NICCodeList.filter((x) => {
      if (x.Year == this.ActiveTab && String(x.Class).includes(event.target.value)) {
        return x
      }
    })
  }
  searchNicCodeWOS(event: any, code?: any) {
    debugger;
    console.log(typeof event.target.value)
    this.NICCodeListShowWOS = this.NICCodeListWOS.filter((x) => {
      if (x.Year == this.ActiveTab && String(x.Class).includes(event.target.value)) {
        return x
      }
    })
  }
  SelectAllNicCodes(event: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.NICCodeListShow.map((item) => {
        item.status = true
        this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass })
      })
    }
    else {
      this.SelectFC_FDINICCodeDesArray = []
    }
  }
  SelectAllNicCodesWOS(event: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.NICCodeListShowWOS.map((item) => {
        item.status = true
        this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass })
      })
    }
    else {
      this.SelectFC_FDINICCodeDesArray = []
    }
  }
  readState() {
    this.apiService.getState().subscribe((data) => {
      this.basicStateList = data;
    });
  }
  readCity() {
    this.apiService.getCity().subscribe((data) => {
      this.basicCityList = data;
    });
  }
  readBank() {
    this.apiService.getBank().subscribe((data) => {
      this.BankList = data;
      console.log(this.BankList);
    });
  }
  ngOnDestroy() {
    this.fcFormlistSub.unsubscribe()
  }
  updatePrev() {
    debugger;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    let count = this.tabset.tabs.length;
    if (Number(this.id) >= 0 && (Number(this.typeshow) == 4 || Number(this.typeshow) == 1)) {
      this.tabset.tabs[(Number(this.id)) - 1].disabled = false;
      this.tabset.tabs[(Number(this.id)) - 1].active = true;
      this.btnShow = true;
    }
    else {
      this.btnShow = false;
    }
  }
  updateNext() {
    debugger;
    if (Number(this.typeshow) == 0) {
      if (this.fcFormlist.invalid) {
        for (const control of Object.keys(this.fcFormlist.controls)) {
          this.fcFormlist.controls[control].markAsTouched();
        }
        return;
      }
      // this.toastr.warning("Please select investment type", 'Warning', {
      //   closeButton: true,
      //   positionClass: 'toast-top-right'
      // });
    } else {
      this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
      let count = this.tabset.tabs.length;
      if (Number(this.typeshow) == 1 || Number(this.typeshow) == 2 || Number(this.typeshow) == 5) {
        if (this.fcFormlist.controls["FC_SDS_Control"].value == "" && this.fcFormlist.controls["investment_Type"].value == "") {
          if (this.fcFormlist.invalid) {
            for (const control of Object.keys(this.fcFormlist.controls)) {
              this.fcFormlist.controls[control].markAsTouched();
            }
            return;
          }
        }
        if (Number(this.typeshow) == 1 || Number(this.typeshow) == 5) {
          if (this.fcFormlist.controls["investorForm"].invalid) {
            this.fcFormlist.controls["investorForm"].markAllAsTouched();
            this.tabactive = true;
            return;
          }
          else {
            this.tabactive = false;
          }
          if (this.sumFCArray.length == 1 && (this.sumFCArray[0].EntityName == "" || this.sumFCArray[0].FCY == "" || this.sumFCArray[0].INR == "")) {
            this.toastr.warning("Please add Sum of the Financial Commitment Details", 'Warning', {
              closeButton: true,
              positionClass: 'toast-top-right'
            });
            this.tabactive = true;
            return;
          }
          else if (this.FCDisinvestmentArray.length == 1 &&
            (this.FCDisinvestmentArray[0].DisinvestmentType == "" ||
              String(this.FCDisinvestmentArray[0].FromDate) == "" ||
              String(this.FCDisinvestmentArray[0].ToDate) == "" || this.FCDisinvestmentArray[0].Name == "")) {
            this.toastr.warning("Please add IE/ RI/ group company/ Trust/ Society making FC", 'Warning', {
              closeButton: true,
              positionClass: 'toast-top-right'
            });
            this.tabactive = true;
            return;
          }
          else if (this.PEFEntityArray.length == 1 && (this.PEFEntityArray[0].NameFE == ""
            || this.PEFEntityArray[0].UIN == "" || this.PEFEntityArray[0].BankName == "")) {
            this.toastr.warning("Please add Particulars of existing foreign entities", 'Warning', {
              closeButton: true,
              positionClass: 'toast-top-right'
            });
            this.tabactive = true;
            return;
          }
          else if (this.SelectFC_FDINICCodeDesArray.length == 0) {
            this.toastr.warning("Please add Activity Code", 'Warning', {
              closeButton: true,
              positionClass: 'toast-top-right'
            });
            this.tabactive = true;
            return;
          }
        }
        if (Number(this.typeshow) == 1 || Number(this.typeshow) == 2 || Number(this.typeshow) == 5) {
          if (Number(this.id) == 2) {
            if (this.fcFormlist.controls["JVWOSform"].invalid) {
              this.fcFormlist.controls["JVWOSform"].markAllAsTouched();
              this.tabactive = true;
              return;
            }
            if (this.WOSFC_FDINICCodeDesArray.length == 0) {
              this.toastr.warning("Please add Activity Code", 'Warning', {
                closeButton: true,
                positionClass: 'toast-top-right'
              });
              this.tabactive = true;
              return;
            }
            if (this.fcFormlist.controls['FC_SDS_Control'].value == 'Yes') {
              if (this.SDSArray.length == 0) {
                this.toastr.warning("Please add SDS Details", 'Warning', {
                  closeButton: true,
                  positionClass: 'toast-top-right'
                });
                this.tabactive = true;
                return;
              }
            }
            else {
              if (this.fcFormlist.controls['FC_SDS_Control'].value == '') {
                this.toastr.warning("Please select SDS Details", 'Warning', {
                  closeButton: true,
                  positionClass: 'toast-top-right'
                });
                this.tabactive = true;
                return;
              }
            }
            if (Number(this.Totalstake) < 100) {
              this.toastr.warning("Please add Shareholding details", 'Warning', {
                closeButton: true,
                positionClass: 'toast-top-right'
              });
              this.tabactive = true;
              return;
            }
          }
          else if (Number(this.id) == 3) {
            if (this.FinancialCommitmentArray.length == 1 &&
              (String(this.FinancialCommitmentArray[0].AmountFCY) == "" ||
                String(this.FinancialCommitmentArray[0].AmountINR) == "" ||
                String(this.FinancialCommitmentArray[0].Date) == "" ||
                String(this.FinancialCommitmentArray[0].CategoryType) == "" ||
                String(this.FinancialCommitmentArray[0].InvestSource) == "")) {
              this.toastr.warning("Please add Financial Commitment details", 'Warning', {
                closeButton: true,
                positionClass: 'toast-top-right'
              });
              this.tabactive = true;
              return;
            }
          }
          else if (Number(this.id) == 4) {
            if (this.fcFormlist.controls["Declarationform"].invalid) {
              this.fcFormlist.controls["Declarationform"].markAllAsTouched();
              this.tabactive = true;
              return;
            }
            else {
              this.tabactive = false;
            }

          }
          else if (Number(this.id) == 5) {
            if (this.fcFormlist.controls["Certificateform"].invalid) {
              this.fcFormlist.controls["Certificateform"].markAllAsTouched();
              this.tabactive = true;
              return;
            }
            else {
              this.tabactive = false;
            }
          }
          else if (Number(this.id) == 6) {

          }
          else if (Number(this.id) == 7) {

          }
          debugger;
          if ((Number(this.typeshow) == 1 || Number(this.typeshow) == 2) && Number(this.id) == 5) {
            this.btnShowNext = false;
            this.tabactive = false;
          }


        }
        if (Number(this.typeshow) == 1 || Number(this.typeshow) == 2 || Number(this.typeshow) == 5) {
          this.tabset.tabs[2].disabled = false;
          this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
          this.tabset.tabs[(Number(this.id)) + 1].active = true;
          if (Number(this.typeshow) != 5) {
            if (Number(this.id) + 1 == 5) {
              this.btnShowNext = false;
            }
            else {
              this.btnShow = true;
            }
          }
          else {
            if (Number(this.id) == 5) {
              this.tabset.tabs[(Number(6))].disabled = true;
              this.tabset.tabs[(Number(7))].disabled = false;
              this.tabset.tabs[(Number(7))].active = true;
            }
          }
        }
      }
      else if (Number(this.typeshow) == 3) {
        if (this.fcFormlist.controls["Restructingform"].invalid) {
          this.fcFormlist.controls["Restructingform"].markAllAsTouched();
          return;
        }
      }
      // if (Number(this.id) >= 0 && Number(this.typeshow) == 4) {

      //   if ((Number(this.id)) + 1 == 7 && Number(this.typeshow) == 1) {
      //     this.btnShowNext = false;
      //     this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
      //     this.tabset.tabs[(Number(this.id)) + 1].active = true;
      //   }
      //   else {
      //     this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
      //     this.tabset.tabs[(Number(this.id)) + 1].active = true;
      //     this.btnShow = true;
      //   }
      // }
      // if (Number(this.id) >= 0) {
      //   if (this.fcFormlist.controls["investorForm"].invalid) {
      //     this.fcFormlist.controls["investorForm"].markAllAsTouched();
      //     return;
      //     //}
      //   }
      // }
    }
  }
  setForm() {
    // var today = new Date();
    // this.fcFormlist = this.fb.group({
    //   basicform: new FormGroup({
    //     'investment_UIN': new FormControl('', Validators.required),
    //     'investment_Route': new FormControl('', Validators.required),
    //     'investment_USD': new FormControl('', Validators.required),
    //     'investment_INR': new FormControl('', Validators.required)
    //   }),
    //   investorform: new FormGroup({
    //     'investment_UIN': new FormControl('', Validators.required),
    //     'investment_Route': new FormControl('', Validators.required),
    //     'investment_USD': new FormControl('', Validators.required),
    //     'investment_INR': new FormControl('', Validators.required),
    //     'OPI_Sec_A_LEI': new FormControl('', Validators.required),
    //     'OPI_Sec_A_PAN': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
    //     'OPI_Sec_A_Address': new FormControl('', Validators.required),
    //     'OPI_Sec_A_City': new FormControl('', Validators.required),
    //     'OPI_Sec_A_State': new FormControl('', Validators.required),
    //     'OPI_Sec_A_PIN': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{6}"), Validators.minLength(6),
    //     Validators.maxLength(6)]),
    //     'OPI_Sec_A_NetINR': new FormControl('', Validators.required),
    //     'OPI_Sec_A_AsOn_Date': new FormControl('', Validators.required),
    //     'WhetherIElist': new FormControl('', Validators.required),
    //     'OPI_Sec_A_ContactPersonName': new FormControl('', Validators.required),
    //     'OPI_Sec_A_ContactPersonDesignation': new FormControl('', Validators.required),
    //     'OPI_Sec_A_Mobile': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}"), Validators.minLength(10),
    //     Validators.maxLength(10)])
    //   //   'OPI_Sec_A_EmailId': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    //   }),
    // })
  }
  addPEFEntity() {
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    console.log(this.PEFEntityArray);
    this.PEFEntitylength = this.PEFEntityArray.length;
    return true;
  }
  deletePEFEntity(index) {
    if (this.PEFEntityArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.PEFEntityArray.splice(index, 1);
      this.PEFEntitylength = this.PEFEntityArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addFCDisinvestment() {
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    console.log(this.FCDisinvestmentArray);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    return true;
  }
  deleteFCDisinvestment(index) {
    if (this.FCDisinvestmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FCDisinvestmentArray.splice(index, 1);
      this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addsumFC() {

    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    console.log(this.sumFCArray);
    this.sumFClength = this.sumFCArray.length;
    return true;
  }
  deletesumFC(index) {
    if (this.sumFCArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.sumFCArray.splice(index, 1);
      this.sumFClength = this.sumFCArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addShareHoldingFE() {
    if (this.Totalstake == 100) {
      this.toastr.warning("Already entered the 100% stake", 'Warning', {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
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
      this.toastr.warning("Can't delete the row when there is only one row", 'Warning', {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return false;
    } else {
      this.ShareHoldingFEArray.splice(index, 1);
      this.toastr.warning("Row deleted successfully", 'Warning', {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
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

  public validate(): void {
    this.investment_model = this.reactiveForm.value;
    this.investment_model.investment_SumFC = this.sumFCArray;
    this.investment_model.investment_FCDisinvestment = this.FCDisinvestmentArray;
    this.investment_model.investment_PEFEntity = this.PEFEntityArray;
    this.investment_model.investment_ActivityCode = this.CodeClassArray;
    this.investment_model.investment_ShareHoldingFE = this.ShareHoldingFEArray;
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }


    console.log(this.investment_model);
  }

  datalist: {
    OPI_Sec_A_ForeignName: "",
    OPI_Sec_A_SharesRepurchased: "",
    OPI_Sec_A_SharesIssued: "",
    UserId: "",
    OPI_Sec_A_Name: "",
    OPI_Sec_A_LEI: "",
    OPI_Sec_A_PAN: "",
    OPI_Sec_A_Address: "",
    OPI_Sec_A_City: "",
    OPI_Sec_A_State: "",
    OPI_Sec_A_PIN: "",
    OPI_Sec_A_NetINR: "",
    WhetherIElist: "",
    OPI_Sec_A_ContactPersonName: "",
    OPI_Sec_A_ContactPersonDesignation: "",
    OPI_Sec_A_Mobile: "",
    OPI_Sec_A_EmailId: "",
    OPI_Sec_A_NetAmount_USD: "",
    OPI_Sec_A_NetAmount_INR: "",
    OPI_Sec_A_Investments_USD: "",
    OPI_Sec_A_Investments_INR: "",
    OPI_Sec_A_Sale_USD: "",
    OPI_Sec_A_Sale_INR: "",
    OPI_Sec_A_NetAmountClosing_USD: "",
    OPI_Sec_A_NetAmountClosing_INR: "",
    OPI_Sec_A_RemittanceAmt_USD: "",
    OPI_Sec_A_RemittanceAmt_INR: "",
    OPI_Sec_A_Repatriation_USD: "",
    OPI_Sec_A_Repatriation_INR: "",
    OPI_Sec_A_EBS_NetAmt_USD: "",
    OPI_Sec_A_EBS_NetAmt_INR: "",
    OPI_Sec_A_EBS_Investments_USD: "",
    OPI_Sec_A_EBS_Investments_INR: "",
    OPI_Sec_A_EBS_Disinvestment_USD: "",
    OPI_Sec_A_EBS_Disinvestment_INR: "",
    OPI_Sec_A_EBS_NetAmtClose_USD: "",
    OPI_Sec_A_EBS_NetAmtClose_INR: "",
    OPI_Sec_A_EBS_RemittanceAmt_USD: "",
    OPI_Sec_A_EBS_RemittanceAmt_INR: "",
    OPI_Sec_A_EBS_RepatriationAmt_USD: "",
    OPI_Sec_A_EBS_RepatriationAmt_INR: "",
    OPI_Sec_A_Equity1_USD: "",
    OPI_Sec_A_Equity2_INR: "",
    OPI_Sec_A_Equity3_USD: "",
    OPI_Sec_A_Equity4_INR: "",
    OPI_Sec_A_Equity5_USD: "",
    OPI_Sec_A_Equity6_INR: "",
    OPI_Sec_A_Equity7_USD: "",
    OPI_Sec_A_Equity8_INR: "",
    OPI_Sec_A_Equity9_USD: "",
    OPI_Sec_A_Equity10_INR: "",
    OPI_Sec_A_Equity11_USD: "",
    OPI_Sec_A_Equity12_INR: "",
    OPI_Sec_A_DebtInstrument1_USD: "",
    OPI_Sec_A_DebtInstrument2_INR: "",
    OPI_Sec_A_DebtInstrument3_USD: "",
    OPI_Sec_A_DebtInstrument4_INR: "",
    OPI_Sec_A_DebtInstrument5_USD: "",
    OPI_Sec_A_DebtInstrument6_INR: "",
    OPI_Sec_A_DebtInstrument7_USD: "",
    OPI_Sec_A_DebtInstrument8_INR: "",
    OPI_Sec_A_DebtInstrument9_USD: "",
    OPI_Sec_A_DebtInstrument10_INR: "",
    OPI_Sec_A_DebtInstrument11_USD: "",
    OPI_Sec_A_DebtInstrument12_INR: "",
    OPI_Sec_A_ADR_GDR1_USD: "",
    OPI_Sec_A_ADR_GDR2_INR: "",
    OPI_Sec_A_ADR_GDR3_USD: "",
    OPI_Sec_A_ADR_GDR4_INR: "",
    OPI_Sec_A_ADR_GDR5_USD: "",
    OPI_Sec_A_ADR_GDR6_INR: "",
    OPI_Sec_A_ADR_GDR7_USD: "",
    OPI_Sec_A_ADR_GDR8_INR: "",
    OPI_Sec_A_ADR_GDR9_USD: "",
    OPI_Sec_A_ADR_GDR10_INR: "",
    OPI_Sec_A_ADR_GDR11_USD: "",
    OPI_Sec_A_ADR_GDR12_INR: "",
    OPI_Sec_A_ETF1_USD: "",
    OPI_Sec_A_ETF2_INR: "",
    OPI_Sec_A_ETF3_USD: "",
    OPI_Sec_A_ETF4_INR: "",
    OPI_Sec_A_ETF5_USD: "",
    OPI_Sec_A_ETF6_INR: "",
    OPI_Sec_A_ETF7_USD: "",
    OPI_Sec_A_ETF8_INR: "",
    OPI_Sec_A_ETF9_USD: "",
    OPI_Sec_A_ETF10_INR: "",
    OPI_Sec_A_ETF11_USD: "",
    OPI_Sec_A_ETF12_INR: "",
    OPI_Sec_A_Mutual1_USD: "",
    OPI_Sec_A_Mutual2_INR: "",
    OPI_Sec_A_Mutual3_USD: "",
    OPI_Sec_A_Mutual4_INR: "",
    OPI_Sec_A_Mutual5_USD: "",
    OPI_Sec_A_Mutual6_INR: "",
    OPI_Sec_A_Mutual7_USD: "",
    OPI_Sec_A_Mutual8_INR: "",
    OPI_Sec_A_Mutual9_USD: "",
    OPI_Sec_A_Mutual10_INR: "",
    OPI_Sec_A_Mutual11_USD: "",
    OPI_Sec_A_Mutual12_INR: "",
    OPI_Sec_A_Others1_USD: "",
    OPI_Sec_A_Others2_INR: "",
    OPI_Sec_A_Others3_USD: "",
    OPI_Sec_A_Others4_INR: "",
    OPI_Sec_A_Others5_USD: "",
    OPI_Sec_A_Others6_INR: "",
    OPI_Sec_A_Others7_USD: "",
    OPI_Sec_A_Others8_INR: "",
    OPI_Sec_A_Others9_USD: "",
    OPI_Sec_A_Others10_INR: "",
    OPI_Sec_A_Others11_USD: "",
    OPI_Sec_A_Others12_INR: "",
    OPI_Sec_A_Total1_USD: "",
    OPI_Sec_A_Total2_INR: "",
    OPI_Sec_A_Total3_USD: "",
    OPI_Sec_A_Total4_INR: "",
    OPI_Sec_A_Total5_USD: "",
    OPI_Sec_A_Total6_INR: "",
    OPI_Sec_A_Total7_USD: "",
    OPI_Sec_A_Total8_INR: "",
    OPI_Sec_A_Total9_USD: "",
    OPI_Sec_A_Total10_INR: "",
    OPI_Sec_A_Total11_USD: "",
    OPI_Sec_A_Total12_INR: "",
    OPI_Sec_B_Name: "",
    OPI_Sec_B_LEI: "",
    OPI_Sec_B_PAN: "",
    OPI_Sec_B_Activity: "",
    OPI_Sec_B_Address: "",
    OPI_Sec_B_City: "",
    OPI_Sec_B_State: "",
    OPI_Sec_B_PINCode: "",
    OPI_Sec_B_ContactPerson: "",
    OPI_Sec_B_Designation: "",
    OPI_Sec_B_Telephone: "",
    OPI_Sec_B_MobileCP: "",
    OPI_Sec_B_FaxNo: "",
    OPI_Sec_B_Email: "",
    OPI_Sec_B_VCF_Name: "",
    OPI_Sec_B_VCF_PAN: "",
    OPI_Sec_B_VCF_Group: "",
    OPI_Sec_B_VCF_Activity: "",
    OPI_Sec_B_VCF_Address: "",
    OPI_Sec_B_VCF_City: "",
    OPI_Sec_B_VCF_State: "",
    OPI_Sec_B_VCF_PINCode: "",
    OPI_Sec_B_VCF_ContactPerson: "",
    OPI_Sec_B_VCF_Designation: "",
    OPI_Sec_B_VCF_Telephone: "",
    OPI_Sec_B_VCF_Email: "",
    OPI_Sec_B_AIF_Name: "",
    OPI_Sec_B_AIF_Date: "",
    OPI_Sec_B_AIF_SEBILimit: "",
    OPI_Sec_B_Equity1_USD: "",
    OPI_Sec_B_Equity2_INR: "",
    OPI_Sec_B_Equity3_USD: "",
    OPI_Sec_B_Equity4_INR: "",
    OPI_Sec_B_Equity5_USD: "",
    OPI_Sec_B_Equity6_INR: "",
    OPI_Sec_B_Equity7_USD: "",
    OPI_Sec_B_Equity8_INR: "",
    OPI_Sec_B_Equity9_USD: "",
    OPI_Sec_B_Equity10_INR: "",
    OPI_Sec_B_Equity11_USD: "",
    OPI_Sec_B_Equity12_INR: "",
    OPI_Sec_B_EquityLinked1_USD: "",
    OPI_Sec_B_EquityLinked2_INR: "",
    OPI_Sec_B_EquityLinked3_USD: "",
    OPI_Sec_B_EquityLinked4_INR: "",
    OPI_Sec_B_EquityLinked5_USD: "",
    OPI_Sec_B_EquityLinked6_INR: "",
    OPI_Sec_B_EquityLinked7_USD: "",
    OPI_Sec_B_EquityLinked8_INR: "",
    OPI_Sec_B_EquityLinked9_USD: "",
    OPI_Sec_B_EquityLinked10_INR: "",
    OPI_Sec_B_EquityLinked11_USD: "",
    OPI_Sec_B_EquityLinked12_INR: "",
    OPI_Sec_B_Permissible1_USD: "",
    OPI_Sec_B_Permissible2_INR: "",
    OPI_Sec_B_Permissible3_USD: "",
    OPI_Sec_B_Permissible4_INR: "",
    OPI_Sec_B_Permissible5_USD: "",
    OPI_Sec_B_Permissible6_INR: "",
    OPI_Sec_B_Permissible7_USD: "",
    OPI_Sec_B_Permissible8_INR: "",
    OPI_Sec_B_Permissible9_USD: "",
    OPI_Sec_B_Permissible10_INR: "",
    OPI_Sec_B_Permissible11_USD: "",
    OPI_Sec_B_Permissible12_INR: "",
    OPI_Sec_B_Total1_USD: "",
    OPI_Sec_B_Total2_INR: "",
    OPI_Sec_B_Total3_USD: "",
    OPI_Sec_B_Total4_INR: "",
    OPI_Sec_B_Total5_USD: "",
    OPI_Sec_B_Total6_INR: "",
    OPI_Sec_B_Total7_USD: "",
    OPI_Sec_B_Total8_INR: "",
    OPI_Sec_B_Total9_USD: "",
    OPI_Sec_B_Total10_INR: "",
    OPI_Sec_B_Total11_USD: "",
    OPI_Sec_B_Total12_INR: "",
    OPI_Sec_C_Signature: "",
    OPI_Sec_C_Name: "",
    OPI_Sec_C_Stamp: "",
    OPI_Sec_C_Place: "",
    OPI_Sec_C_Date: "",
    OPI_Sec_C_Telephone: "",
    OPI_Sec_C_EmailId: ""

  }
  onSelected(event) {
    // this.fcFormlist.controls['BankName'].setValue(event.BankName);
  }
  submit() {
    debugger;
    if (this.tabactive == false) {

      if (Number(this.typeshow) == 3) {
        if (this.fcFormlist.controls["Restructingform"].invalid) {
          this.fcFormlist.controls["Restructingform"].markAllAsTouched();
          return;
        }
      }
      this.fcFormlist.value.investorForm.investor_City = this.fcFormlist.value.investorForm.investor_City.city;
      this.fcFormlist.value.investorForm.investor_State = this.fcFormlist.value.investorForm.investor_State.State;
      this.fcFormlist.value.JVWOSform.investment_Jurisdiction = this.fcFormlist.value.JVWOSform.investment_Jurisdiction.BankName;

      const sumFCArray: FormArray = this.fb.array(this.sumFCArray);
      this.fcFormlist.setControl('FCDetails', sumFCArray);

      const FCDisinvestmentArray: FormArray = this.fb.array(this.FCDisinvestmentArray);
      this.fcFormlist.setControl('InvestmentDetails', FCDisinvestmentArray);

      const PEFEntityArray: FormArray = this.fb.array(this.PEFEntityArray);
      this.fcFormlist.setControl('PEFEntityDetails', PEFEntityArray);

      const FC_FDINICCodeDesArray: FormArray = this.fb.array(this.SelectFC_FDINICCodeDesArray);
      this.fcFormlist.setControl('FC_FDINICCodeDesDetails', FC_FDINICCodeDesArray);

      const WOSFC_FDINICCodeDesArray: FormArray = this.fb.array(this.WOSFC_FDINICCodeDesArray);
      this.fcFormlist.setControl('WOSFC_FDINICCodeDesDetails', WOSFC_FDINICCodeDesArray);

      const SDSArray: FormArray = this.fb.array(this.SDSArray);
      this.fcFormlist.setControl('SDSDetails', SDSArray);

      const ShareHoldingFEArray: FormArray = this.fb.array(this.ShareHoldingFEArray);
      this.fcFormlist.setControl('ShareHoldingDetails', ShareHoldingFEArray);

      const FinancialCommitmentArray: FormArray = this.fb.array(this.FinancialCommitmentArray);
      this.fcFormlist.setControl('FinancialCommitmentDetails', FinancialCommitmentArray);

      this.dataModel['investorDetails'] = this.fcFormlist.value.investorForm;
      this.dataModel['JVWOSDetails'] = this.fcFormlist.value.JVWOSform;
      this.dataModel['DeclarationDetails'] = this.fcFormlist.value.Declarationform;
      this.dataModel['CertificateDetails'] = this.fcFormlist.value.Certificateform;
      this.dataModel['RestructuringDetails'] = this.fcFormlist.value.Restructingform;
      this.dataModel = this.fcFormlist.value;
      console.log(this.dataModel);

      return this.apiService.createFormFC(this.dataModel).subscribe({
        complete: () => {
          this.datalist = this.fcFormlist.value;
          console.log(this.datalist);
          this.toastr.success("Data Save Successfully", 'Success', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
          this.btnShowNext = false;
          if (Number(this.typeshow) == 1 || Number(this.typeshow) == 2) {
            this.tabset.tabs[8].disabled = false;
            this.tabset.tabs[8].active = true;
            this.tabactive = true;
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

  }
  GetCityStateValue(value, field) {
    debugger;
    if (value != undefined) {
      if (value) {
        this.cityListShow = this.basicCityList.filter(x => x.State == value.State)
      }
      else {
        this.cityListShow = [];
      }
      if (field == 'investor_City') {
        this.fcFormlist.value.investorForm.investor_City = value.city;

        (<FormGroup>this.fcFormlist.controls['Declarationform']).controls['investment_Individual_Place'].patchValue(value.city);
        (<FormGroup>this.fcFormlist.controls['Certificateform']).controls['investment_Group_Place'].patchValue(value.city);

      }
    }
  }

  addCodeClassRow() {
    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    console.log(this.CodeClassArray);
    this.codeClasslength = this.CodeClassArray.length;
    return true;
  }

  deleteCodeClassRow(index) {
    if (this.CodeClassArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.CodeClassArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
  }
  addFinancialCommitment() {
    this.FinancialCommitment = { InvestSource: "", CategoryType: "", Date: "", AmountFCY: "", AmountINR: "" }
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    console.log(this.FinancialCommitmentArray);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
    return true;
  }
  deleteFinancialCommitment(index) {
    if (this.FinancialCommitmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FinancialCommitmentArray.splice(index, 1);
      this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

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
  InvestorChange(type) {
    debugger;
    this.typeshow = type;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    this.tabset.tabs[0].disabled = false;
    if (type == 1 || type == 5) {
      this.tabset.tabs[1].disabled = false;
      this.tabset.tabs[1].active = true;
    }
    else if (type == 2) {
      this.tabset.tabs[2].disabled = false;
      this.tabset.tabs[2].active = true;
    }
    else if (type == 3) {
      this.tabset.tabs[6].disabled = false;
      this.tabset.tabs[6].active = true;
      this.tabactive = false;
    }
    else if (type == 4) {
      this.tabset.tabs[7].disabled = false;
      this.tabset.tabs[7].active = true;
    }
    else {
      this.tabset.tabs[0].disabled = false;
      this.tabset.tabs[0].active = true;
    }
    this.tabset.tabs.forEach(function (item) {
      if (type == 1 || type == 4) {
        if (Number(item.id) != 1 && Number(item.id) != 0) {
          item.disabled = true;
        }
      }
      else if (type == 2) {
        if (Number(item.id) != 8 && Number(item.id) != 0) {
          item.disabled = true;
        }
      }
      else if (type == 3) {
        if (Number(item.id) != 9 && Number(item.id) != 0) {
          item.disabled = true;
        }
      }
      else {
        if (Number(item.id) != 0) {
          item.disabled = true;
        }
      }
    });


  }
  @ViewChild('pdfCovering') pdfCovering: ElementRef;
  @ViewChild('pdfFormFC') pdfFormFC: ElementRef;
  @ViewChild('pdfDeclarationIE') pdfDeclarationIE: ElementRef;
  @ViewChild('pdfDeclarationRI') pdfDeclarationRI: ElementRef;
  @ViewChild('pdfDebitAL') pdfDebitAL: ElementRef;
  @ViewChild('pdfSACertificate') pdfSACertificate: ElementRef;

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
  DownloadFormFC() {
    const doc = new jsPDF();
    const pdfTable = this.pdfFormFC.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordFormFC() {
    const pdfTable = this.pdfFormFC.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'FormFC.docx');
  }
  DownloadDeclarationIE() {
    const doc = new jsPDF();
    const pdfTable = this.pdfDeclarationIE.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordDeclarationIE() {
    const pdfTable = this.pdfDeclarationIE.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'DeclarationIE.docx');
  }
  DownloadDeclarationRI() {
    const doc = new jsPDF();
    const pdfTable = this.pdfDeclarationRI.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordDeclarationRI() {
    const pdfTable = this.pdfDeclarationRI.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'DeclarationRI.docx');
  }
  DownloadDebitAL() {
    const doc = new jsPDF();
    const pdfTable = this.pdfDebitAL.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordDebitAL() {
    const pdfTable = this.pdfDebitAL.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'DebitAuthorityLetter.docx');
  }
  DownloadSACertificate() {
    const doc = new jsPDF();
    const pdfTable = this.pdfSACertificate.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordSACertificate() {
    const pdfTable = this.pdfSACertificate.nativeElement;
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'SACertificate.docx');
  }
  onBlur(values) {
    var restructing_Equity_FC = this.fcFormlist.value.Restructingform.restructing_Equity_FC;
    var restructing_Equity_AD = this.fcFormlist.value.Restructingform.restructing_Equity_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_Equity_TotalFC").patchValue(restructing_Equity_FC - restructing_Equity_AD);

    var restructing_Debt_FC = this.fcFormlist.value.Restructingform.restructing_Debt_FC;
    var restructing_Debt_AD = this.fcFormlist.value.Restructingform.restructing_Debt_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_Debt_TotalFC").patchValue(restructing_Debt_FC - restructing_Debt_AD);

    var restructing_Guarantee_FC = this.fcFormlist.value.Restructingform.restructing_Guarantee_FC;
    var restructing_Guarantee_AD = this.fcFormlist.value.Restructingform.restructing_Guarantee_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_Guarantee_TotalFC").patchValue(restructing_Guarantee_FC - restructing_Guarantee_AD);

    var restructing_Receivables_FC = this.fcFormlist.value.Restructingform.restructing_Receivables_FC;
    var restructing_Receivables_AD = this.fcFormlist.value.Restructingform.restructing_Receivables_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_Receivables_TotalFC").patchValue(restructing_Receivables_FC - restructing_Receivables_AD);

    var restructing_Ainterest_FC = this.fcFormlist.value.Restructingform.restructing_Ainterest_FC;
    var restructing_Ainterest_AD = this.fcFormlist.value.Restructingform.restructing_Ainterest_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_Ainterest_TotalFC").patchValue(restructing_Ainterest_FC - restructing_Ainterest_AD);

    var restructing_BDividend_FC = this.fcFormlist.value.Restructingform.restructing_BDividend_FC;
    var restructing_BDividend_AD = this.fcFormlist.value.Restructingform.restructing_BDividend_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_BDividend_TotalFC").patchValue(restructing_BDividend_FC - restructing_BDividend_AD);

    var restructing_COther_FC = this.fcFormlist.value.Restructingform.restructing_COther_FC;
    var restructing_COther_AD = this.fcFormlist.value.Restructingform.restructing_COther_AD;
    this.fcFormlist.controls["Restructingform"].get("restructing_COther_TotalFC").patchValue(restructing_COther_FC - restructing_COther_AD);


  }

}
