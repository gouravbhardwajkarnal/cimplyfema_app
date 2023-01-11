import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iinvestment, IinvestmentSDS, IinvestmentWOS } from 'src/app/model/iinvestment';
import { ApiService } from 'src/app/service/api.service';
import { CodeClassGrid, DisinvestmentMethodGrid, DisinvestmentRemittanceGrid, DynamicGrid, FCDisinvestmentGrid, FinancialCommitmentGrid, PEFEntityGrid, ShareHoldingFEGrid, SumFCGrid } from 'src/app/model/gridmodel';
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

  public sectionfData: {};
  rows: FormArray = this.fb.array([]);
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

  DisinvestmentRemittanceArray: Array<DisinvestmentRemittanceGrid> = [];
  DisinvestmentRemittance: any = {};
  DisinvestmentRemittancelength: number = 0;

  sumFC: any = {};
  sumFClength: number = 0;
  FCDisinvestment: any = {};
  FCDisinvestmentlength: number = 0;
  PEFEntity: any = {};
  PEFEntitylength: number = 0;
  public fcFormlist: FormGroup
  investorForm: FormGroup
  fcFormlistSub: Subscription
  formInvalid: boolean = false;
  investordetails: FormArray
  public dataModel: any = {};
  public dataList: any = {};
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

        'disinvestment_Equity_FC': new FormControl('', Validators.required),
        'disinvestment_Equity_AD': new FormControl('', Validators.required),
        'disinvestment_Equity_ADAPR': new FormControl('', Validators.required),
        'disinvestment_Equity_WriteOff': new FormControl('', Validators.required),
        'disinvestment_Loan_FC': new FormControl('', Validators.required),
        'disinvestment_Loan_AD': new FormControl('', Validators.required),
        'disinvestment_Loan_ADAPR': new FormControl('', Validators.required),
        'disinvestment_Loan_WriteOff': new FormControl('', Validators.required),
        'disinvestment_Issued_FC': new FormControl('', Validators.required),
        'disinvestment_Issued_AD': new FormControl('', Validators.required),
        'disinvestment_Issued_ADAPR': new FormControl('', Validators.required),
        'disinvestment_Issued_WriteOff': new FormControl('', Validators.required),
        'disinvestment_Invoked_FC': new FormControl('', Validators.required),
        'disinvestment_Invoked_AD': new FormControl('', Validators.required),
        'disinvestment_Invoked_ADAPR': new FormControl('', Validators.required),
        'disinvestment_Invoked_WriteOff': new FormControl('', Validators.required),


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
        'disinvestment_IE_C': new FormControl(''),
        'disinvestment_IE_D': new FormControl(''),
        'disinvestment_IE_E': new FormControl(''),
        'disinvestment_IE_F': new FormControl(''),
        'disinvestment_IE_G': new FormControl(''),
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

    this.DisinvestmentMethod = { Method: "", Details: "" };
    this.DisinvestmentMethodArray.push(this.DisinvestmentMethod);
    this.DisinvestmentMethodlength = this.DisinvestmentMethodArray.length;

    this.DisinvestmentRemittance = { RemittanceDate: "", InvestmentMethod: "", InvestmentCategory: "", Amount: "" };
    this.DisinvestmentRemittanceArray.push(this.DisinvestmentRemittance);
    this.DisinvestmentRemittancelength = this.DisinvestmentRemittanceArray.length;

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
    this.dataList =
    {
      disinvestment_Name_IE: "",
      disinvestment_PAN_IE: "",
      disinvestment_Date: "",
      disinvestment_Route: "",
      disinvestment_Type: "",
      disinvestment_Stake_Time: "",
      disinvestment_Stake_Partial: "",
      disinvestment_Total_Fair: "",
      disinvestment_ValuationDate: "",
      disinvestment_SubmissionDate: "",
      disinvestment_APRPeriod: "",
      disinvestment_Equity_FC: "",
      disinvestment_Equity_AD: "",
      disinvestment_Equity_ADAPR: "",
      disinvestment_Equity_WriteOff: "",
      disinvestment_Loan_FC: "",
      disinvestment_Loan_AD: "",
      disinvestment_Loan_ADAPR: "",
      disinvestment_Loan_WriteOff: "",
      disinvestment_Issued_FC: "",
      disinvestment_Issued_AD: "",
      disinvestment_Issued_ADAPR: "",
      disinvestment_Issued_WriteOff: "",
      disinvestment_Invoked_FC: "",
      disinvestment_Invoked_AD: "",
      disinvestment_Invoked_ADAPR: "",
      disinvestment_Invoked_WriteOff: "",
      disinvestment_IE_Place: "",
      disinvestment_AD_Place: "",
      disinvestment_IE_Date: "",
      disinvestment_AD_Date: "",
      disinvestment_IE_Signature: "",
      disinvestment_AD_Signature: "",
      disinvestment_IE_Name: "",
      disinvestment_AD_Name: "",
      disinvestment_IE_Designation: "",
      disinvestment_AD_Designation: "",
      disinvestment_IE_Telephone: "",
      disinvestment_AD_Telephone: "",
      disinvestment_IE_Email: "",
      disinvestment_AD_Email: "",
      disinvestment_IE_A: "",
      disinvestment_IE_B: "",
      disinvestment_IE_C: "",
      disinvestment_IE_D: "",
      disinvestment_IE_E: "",
      disinvestment_IE_F: "",
      disinvestment_IE_G: "",
    }
  }
  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
      console.log(this.CountryList);
    });
  }
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
      if (Number(this.typeshow) == 4) {
        if (this.fcFormlist.controls["Disinvestmentform"].invalid) {
          this.fcFormlist.controls["Disinvestmentform"].markAllAsTouched();
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

      const DisinvestmentMethodArray: FormArray = this.fb.array(this.DisinvestmentMethodArray);
      this.fcFormlist.setControl('DisinvestmentMethodDetails', DisinvestmentMethodArray);
      debugger

      this.dataModel['investorDetails'] = this.fcFormlist.value.investorForm;
      this.dataModel['JVWOSDetails'] = this.fcFormlist.value.JVWOSform;
      this.dataModel['DeclarationDetails'] = this.fcFormlist.value.Declarationform;
      this.dataModel['CertificateDetails'] = this.fcFormlist.value.Certificateform;
      this.dataModel['RestructuringDetails'] = this.fcFormlist.value.Restructingform;
      this.dataModel['DisinvestmentDetails'] = this.fcFormlist.value.Disinvestmentform;
      this.dataModel = this.fcFormlist.value;
      console.log(this.dataModel);

      return this.apiService.createFormFC(this.dataModel).subscribe({
        complete: () => {
          this.sectionfData = this.fcFormlist.value.Restructingform;
          this.dataList = this.fcFormlist.value.Restructingform;
          this.toastr.success("Data Save Successfully", 'Success', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
          this.btnShowNext = false;

          this.tabset.tabs[8].disabled = false;
          this.tabset.tabs[8].active = true;
          this.tabactive = true;

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
      this.tabactive = false;
      this.btnShowNext = false;
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
    var html = htmlToPdfmake(pdfTable);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordSACertificate() {
    debugger;
    console.log(this.dataList.restructing_AD_Email);
    const pdfTable = this.pdfSACertificate.nativeElement;
    var converted = await asBlob( `<div _ngcontent-pqb-c541="" id="printMe" style="margin: 0px 0px;">

    <!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <title></title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" />
       </head>
       <body>
          <div class="container">
             <section>
                <table width="640" style="border:1px solid #000;font-size: 15px;" cellpadding="5">
                   <tbody>
                   <tr style="text-align: center;">  <td colspan="18" width="640" style="border:1px solid #000;">
                   <p style="margin:0;"><strong>Form FC - Section F</strong>
                </td></tr>
                      <tr style="text-align: center;">
                         <td colspan="18" width="640" style="border:1px solid #000;">
                            <p style="margin:0;"><strong>Reporting of restructuring of the balance sheet of the foreign entity involving diminution in the total value of the outstanding dues towards person resident in India on account of investment in equity and debt</strong>
                         </td>
                      </tr>
                      <tr>
                         <td colspan="18" width="640" style="border:1px solid #000;">
                            <p style="margin:0;">Note: All amounts should be in a single foreign currency and in actuals</p>
                         </td>
                      </tr>
                      <tr>
                         <td colspan="18" width="640" style="border:1px solid #000;">
                            <p style="margin:0;">13 digit Unique Identification Number allotted by the Reserve Bank</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="14" width="450" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Name, AD Code and branch of the designated AD bank</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;">S. No.</p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Particulars</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>I</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">PAN and Name of the Indian Entity (IE)</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_PAN_IE + this.dataList.restructing_Name_IE + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>II</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Name of the foreign entity</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Name_FE + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>III&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">% Stake held by IE in the foreign entity</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Stake_FE + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>IV</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Total amount of Financial Commitment undertaken by IE in this UIN till date</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Total_Outstanding + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">a) Equity</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Equity_FC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">b) Debt</p>
                         </td>
                         <td colspan="4" width="191" style="border-right: 1px solid #000;">
                            <p style="margin:0;">`+ this.dataList.restructing_Debt_FC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">c) Guarantee/ other non-fund based commitment</p>
                         </td>
                         <td colspan="4" width="191" style="border-right: 1px solid #000;">
                            <p style="margin:0;">`+ this.dataList.restructing_Guarantee_FC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>V</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Total accumulated losses (based on latest audited financial statements)</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Total_ALosses + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>VI</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Proportionate amount of accumulated losses based on share of the IE</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Proportionate_Amount + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>VII</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Date of restructuring</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Date + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>VIII</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Total outstanding dues towards the IE as on date of restructuring</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Total_Outstanding + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>IX</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Amount of diminution in the total value of the outstanding dues</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;"></p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">a) Equity</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Equity_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">&nbsp;</td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">b) Debt</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Debt_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">&nbsp;</td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">c) Receivables</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Receivables_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">&nbsp;</td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">(i) Interest</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_BDividend_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">&nbsp;</td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">(ii) Dividend</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">.`+ this.dataList.restructing_BDividend_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">&nbsp;</td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">(iii) Others (Specify)</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_COther_AD + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>X</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Date of the valuation certificate</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Valuation_Date + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>XI</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Total amount of financial commitment post restructuring</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">a) Equity</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Equity_TotalFC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">b) Debt</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Debt_FC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>&nbsp;</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">c) Guarantee/ other non-fund based commitment</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">`+ this.dataList.restructing_Guarantee_TotalFC + `</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="2" width="64" style="border-right: 1px solid #000;">
                            <p style="margin:0;"><strong>XII</strong></p>
                         </td>
                         <td colspan="12" width="386" style="border-right: 1px solid #000;">
                            <p style="margin:0;">% stake held by IE post restructuring</p>
                         </td>
                         <td colspan="4" width="191">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="18" width="640">
                            <p style="margin:0;text-align: center;"><strong>Declaration by the Indian Entity (IE)</strong></p>
                            <p style="margin:0;text-align: center;">(Strike out whichever is not applicable)</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">a.&nbsp;&nbsp;&nbsp;&nbsp; The foreign entity has been incurring losses for last 2 years</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">b.&nbsp;&nbsp;&nbsp;&nbsp; The amount of original investment is less than USD 10 million</p>
                            <p style="margin:0;text-align: center;">OR</p>
                            <p style="margin:0;">The amount of original investment is more than USD 10 million and the diminution in value has been duly certified on an arm&rsquo;s length basis by a registered valuer as per the Companies Act, 2013 (18 of 2013) or corresponding valuer registered with the regulatory authority or certified public accountant in the host jurisdiction and the certificate is dated not more than six months before the date of restructuring</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">c.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; The amount of diminution in value of the outstanding dues is less than twenty per cent of the total value of the outstanding dues towards the IE</p>
                            <p style="margin:0;text-align: center;">OR</p>
                            <p style="margin:0;">The amount of diminution in value of the outstanding dues is more than twenty per cent. of the total value of the outstanding dues towards the IE and the diminution in value has been duly certified on an arm&rsquo;s length basis by a registered valuer as per the Companies Act, 2013 (18 of 2013) or corresponding valuer registered with the regulatory authority or certified public accountant in the host jurisdiction and the certificate is dated not more than six months before the date of restructuring</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="18" width="640">
                            <p style="margin:0;">I/ We hereby certify that the information furnished above are true and correct. <strong><u>I/We also duly acknowledge that if any information furnished by me/us is found to be false and/or incorrect, it shall be construed that the reporting requirements under FEMA, 1999, have not been complied with.</u></strong></p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Place&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Place&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Date</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Date</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="9" width="302" style="border-right: 1px solid #000;">
                            <p style="margin:0;">(Signature and seal of authorised official of the IE/ RI)</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="9" width="338">
                            <p style="margin:0;">(Signature and seal of authorised official of the AD)</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Name</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Name</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Designation</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Designation</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Tel. No.</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Tel. No.</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                      <tr style="border-bottom: 1px solid #000;">
                         <td colspan="4" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Email</p>
                         </td>
                         <td colspan="5" width="208" style="border-right: 1px solid #000;">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                         <td colspan="3" width="94" style="border-right: 1px solid #000;">
                            <p style="margin:0;">Email</p>
                         </td>
                         <td colspan="6" width="244">
                            <p style="margin:0;">&nbsp;</p>
                         </td>
                      </tr>
                   </tbody>
                </table>
                <p style="margin:0;">&nbsp;</p>
                <p style="margin:0;">Note: AD bank may ensure that the certificate furnished is in accordance with Para 14 of FEM (Overseas Investment) Directions.&nbsp;</p>
             </section>
          </div>
       </body>
    </html>
      `, {
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
  addDisinvestmentMethod() {
    this.DisinvestmentMethod = { Method: "", Details: "" };
    this.DisinvestmentMethodArray.push(this.DisinvestmentMethod);
    console.log(this.DisinvestmentMethodArray);
    this.DisinvestmentMethodlength = this.DisinvestmentMethodArray.length;
    return true;
  }
  deleteDisinvestmentMethod(index) {
    if (this.DisinvestmentMethodArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.DisinvestmentMethodArray.splice(index, 1);
      this.DisinvestmentMethodlength = this.DisinvestmentMethodArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addDisinvestmentRemittance() {
    this.DisinvestmentRemittance = { RemittanceDate: "", InvestmentMethod: "", InvestmentCategory: "", Amount: "" };
    this.DisinvestmentRemittanceArray.push(this.DisinvestmentRemittance);
    this.DisinvestmentRemittancelength = this.DisinvestmentRemittanceArray.length;
    return true;
  }
  deleteDisinvestmentRemittance(index) {
    if (this.DisinvestmentRemittanceArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.DisinvestmentRemittanceArray.splice(index, 1);
      this.DisinvestmentRemittancelength = this.DisinvestmentRemittanceArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
  }
  onBlurDI(values) {
    var disinvestment_Equity_FC = this.fcFormlist.value.Disinvestmentform.disinvestment_Equity_FC;
    var disinvestment_Equity_AD = this.fcFormlist.value.Disinvestmentform.disinvestment_Equity_AD;
    var disinvestment_Equity_ADAPR = this.fcFormlist.value.Disinvestmentform.disinvestment_Equity_ADAPR;
    this.fcFormlist.controls["Disinvestmentform"].get("disinvestment_Equity_WriteOff").patchValue(disinvestment_Equity_FC - disinvestment_Equity_AD - disinvestment_Equity_ADAPR);

    var disinvestment_Loan_FC = this.fcFormlist.value.Disinvestmentform.disinvestment_Loan_FC;
    var disinvestment_Loan_AD = this.fcFormlist.value.Disinvestmentform.disinvestment_Loan_AD;
    var disinvestment_Loan_ADAPR = this.fcFormlist.value.Disinvestmentform.disinvestment_Loan_ADAPR;
    this.fcFormlist.controls["Disinvestmentform"].get("disinvestment_Loan_WriteOff").patchValue(disinvestment_Loan_FC - disinvestment_Loan_AD - disinvestment_Loan_ADAPR);

    var disinvestment_Issued_FC = this.fcFormlist.value.Disinvestmentform.disinvestment_Issued_FC;
    var disinvestment_Issued_AD = this.fcFormlist.value.Disinvestmentform.disinvestment_Issued_AD;
    var disinvestment_Issued_ADAPR = this.fcFormlist.value.Disinvestmentform.disinvestment_Issued_ADAPR;
    this.fcFormlist.controls["Disinvestmentform"].get("disinvestment_Issued_WriteOff").patchValue(disinvestment_Issued_FC - disinvestment_Issued_AD - disinvestment_Issued_ADAPR);

    var disinvestment_Invoked_FC = this.fcFormlist.value.Disinvestmentform.disinvestment_Invoked_FC;
    var disinvestment_Invoked_AD = this.fcFormlist.value.Disinvestmentform.disinvestment_Invoked_AD;
    var disinvestment_Invoked_ADAPR = this.fcFormlist.value.Disinvestmentform.disinvestment_Invoked_ADAPR;
    this.fcFormlist.controls["Disinvestmentform"].get("disinvestment_Invoked_WriteOff").patchValue(disinvestment_Invoked_FC - disinvestment_Invoked_AD - disinvestment_Invoked_ADAPR);
  }

}
