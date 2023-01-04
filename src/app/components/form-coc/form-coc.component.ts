import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ignoreElements } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import {
  COC_FDIODITableAList,
  COC_FDIODITableBList,
  COC_FDIODITableCList,
  COC_FDIODIAuthorisedCapitalList,
  CompoundingBackList,
  CompoundingTransactionList,
  CompoundingRegulatoryList,
  CompoundingDelayReasonsList,
  CompoundingPetitionRequestList,
  COC_ECBDetailsList,
  COC_ECBRepaymentList,
  COC_ODIRemittanceList,
  COC_ODIReceiptShareList,
  COC_ODIAprsDetailList,
  COC_LiasonOfficeDetailsList,
  COC_LiasonAnnualActivityList,
} from 'src/app/model/COCFdi.model';
import { asBlob } from 'html-docx-js-typescript';

import { ConfirmedValidator } from '../../service/gstpan.validator';

@Component({
  selector: 'app-form-coc',
  templateUrl: './form-coc.component.html',
  styleUrls: ['./form-coc.component.css'],
})
export class FormCocComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
  BackSubmissionArray: Array<CompoundingBackList> = [];
  TransactionSubmissionArray: Array<CompoundingTransactionList> = [];
  RegulatorySubmissionArray: Array<CompoundingRegulatoryList> = [];
  DelayReasonsSubmissionArray: Array<CompoundingDelayReasonsList> = [];
  PetitionRequestSubmissionArray: Array<CompoundingPetitionRequestList> = [];
  CompoundSubmissiondata: any = {};
  BackSubmissiondata: any = {};
  TransactionSubmissiondata: any = {};
  RegulatorySubmissiondata: any = {};
  DelayReasonsSubmissiondata: any = {};
  PetitionRequestSubmissiondata: any = {};
  COC_FDIODITabAArray: Array<COC_FDIODITableAList> = [];
  COC_FDIODITableAdata: any = {};
  COC_FDIODITableBArray: Array<COC_FDIODITableBList> = [];
  COC_FDIODITableBdata: any = {};
  COC_FDIODITableCArray: Array<COC_FDIODITableCList> = [];
  COC_FDIODITableCdata: any = {};
  COC_FDIODIAuthorisedCapitalArray: Array<COC_FDIODIAuthorisedCapitalList> = [];
  COC_FDIODIAuthorisedCapitaldata: any = {};
  public COC_FDIFormlist: FormGroup;
  NICCodeselectedItems = [];
  selectedItems = [];
  CityList: any = [];
  COC_FDINICCodeDescriptionList: any = [];
  StateList: any = [];
  FDIStatelist: any = [];
  SubselectedItems = [];
  SubmodulenameArray = [];
  NICCodeSettings: IDropdownSettings;
  ModuleSettings: IDropdownSettings;
  SubModuleSettings: IDropdownSettings;
  modules: any[];
  submodules: any[];
  module: string;
  Submodule: string;
  Submodulename: string;
  SubmodulenameDes: string;
  COC_FDIInstructions: boolean = true;
  COC_FDIApplicantDetails: boolean = false;
  COC_FDIInstructionsButton: boolean = true;
  COC_FDICompoundingDetails: boolean = false;
  COC_FDICompoundingSubmissions: boolean = false;
  COC_FDIODIECB: boolean = false;
  COC_FDIOtherAnnexures: boolean = false;
  COC_FDIDocPreviewg: boolean = false;
  COC_FDIFormDiv: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  NICCodeList: any = [];
  FemaRegulationsList: any = [];
  RegionalOfficeList: any = [];
  SelectCOC_FDINICCodeDesArray: any = [];
  SelectCOC_FDICenResArray: any = [];
  COC_FDIFemaRegNoArray: any = [];
  TableATotAmountData: number = 0;
  isLinear = false;

  // New fields
  ActiveTab: number = 1987;
  NICCodeListShow: any = [];
  RegionalOfficeListShow: any = [];
  rbiAuthorityCityList: any = [];
  cityListShow: any = [];

  step5FdiForm: boolean = false;
  step5OdiForm: boolean = false;
  step5ECBForm: boolean = false;
  step5LiasionForm: boolean = false;
  step5disable: boolean = false;
  step5FormName: string = '';

  COC_ECBDetailsArray: Array<COC_ECBDetailsList> = [];
  COC_ECBDetailsData: any = {};

  COC_ECBRepaymentArray: Array<COC_ECBRepaymentList> = [];
  COC_ECBRepaymentData: any = {};

  COC_ODIRemittanceArray: Array<COC_ODIRemittanceList> = [];
  COC_ODIRemittanceData: any = {};

  COC_ODIReceiptShareArray: Array<COC_ODIReceiptShareList> = [];
  COC_ODIReceiptShareData: any = {};

  COC_ODIAprsDetailArray: Array<COC_ODIAprsDetailList> = [];
  COC_ODIAprsDetailData: any = {};

  COC_LiasonOfficeDetailsArray: Array<COC_LiasonOfficeDetailsList> = [];
  COC_LiasonOfficeDetailsData: any = {};

  COC_LiasonAnnualActivityArray: Array<COC_LiasonAnnualActivityList> = [];
  COC_LiasonAnnualActivityData: any = {};

  todayDate: string = new Date()
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('/');

  constructor(
    private commonservice: CommonService,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
    this.readCity();
    this.readState();
    this.readRbiAuthorityCity();
    this.readNICCodeDes();
    this.readRBIAuthority();
    this.readFemaRegulations();
  }
  readCity() {
    this.apiService.getCity().subscribe((data) => {
      this.CityList = data;
    });
  }
  readState() {
    this.apiService.getState().subscribe((data) => {
      this.StateList = data;
      console.log(this.StateList);
    });
  }

  readRbiAuthorityCity() {
    this.apiService.getRbiAuthorityCity().subscribe((data) => {
      this.rbiAuthorityCityList = data;
      console.log(this.StateList);
    });
  }

  readFemaRegulations() {
    this.apiService.getFemaRegulations().subscribe((femadata) => {
      this.FemaRegulationsList = femadata;
    });
  }
  readNICCodeDes() {
    this.apiService.getNICCodeDes().subscribe((Nicdata) => {
      this.NICCodeList = Nicdata;
      console.log(this.NICCodeList);
    });
    // this.NICCodeList=this.NICCodeList.map((item)=>{
    //   item.status=false
    // // })
    // console.log('hiii',this.NICCodeList)
  }
  readRBIAuthority() {
    this.apiService.getRBIAuthority().subscribe((RBIData) => {
      this.RegionalOfficeList = RBIData;
      this.RegionalOfficeListShow = RBIData;
    });
    for (let i = 0; i < this.RegionalOfficeListShow.length; i++) {
      this.RegionalOfficeListShow.status = false;
    }
  }

  change() {
    console.log(this.COC_FDIFormlist.get('COC_FDICity').value);
  }

  ngOnInit(): void {
    this.BackSubmissiondata = { COC_FDI_Background: '' };
    this.BackSubmissionArray.push(this.BackSubmissiondata);
    this.TransactionSubmissiondata = { COC_FDI_Transaction: '' };
    this.TransactionSubmissionArray.push(this.TransactionSubmissiondata);
    this.RegulatorySubmissiondata = { COC_FDI_Regulatory: '' };
    this.RegulatorySubmissionArray.push(this.RegulatorySubmissiondata);
    this.DelayReasonsSubmissiondata = { COC_FDI_DelayReasons: '' };
    this.DelayReasonsSubmissionArray.push(this.DelayReasonsSubmissiondata);
    this.PetitionRequestSubmissiondata = { COC_FDI_PetitionRequest: '' };
    this.PetitionRequestSubmissionArray.push(
      this.PetitionRequestSubmissiondata
    );
    this.COC_FDIODITableAdata = {
      COC_FDIODITabARemitterName: '',
      COC_FDIODITabAAmount: '',
      COC_FDIODITabAReceiptDate: '',
      COC_FDIODITabAReportedDate: '',
      COC_FDIODITabADelay: '',
    };
    this.COC_FDIODITabAArray.push(this.COC_FDIODITableAdata);
    this.COC_FDIODITableBdata = {
      COC_FDIODITabBInvestorName: '',
      COC_FDIODITabBShareDate: '',
      COC_FDIODITabBNumofShare: '',
      COC_FDIODITabBAmtofShare: '',
      COC_FDIODITabBReportingDate: '',
      COC_FDIODITabBDelay: '',
    };
    this.COC_FDIODITableBArray.push(this.COC_FDIODITableBdata);
    this.COC_FDIODITableCdata = {
      COC_FDIODITabCRemitterName: '',
      COC_FDIODITabCAmount: '',
      COC_FDIODITabCReceiptDate: '',
      COC_FDIODITabCExcessshare: '',
      COC_FDIODITabCDateRefund: '',
      COC_FDIODITabCForexAmt: '',
      COC_FDIODITabCapprovaldate: '',
    };
    this.COC_FDIODITableCArray.push(this.COC_FDIODITableCdata);
    this.COC_FDIODIAuthorisedCapitaldata = {
      COC_FDIODIAuthorisedDate: '',
      COC_FDIODIAuthorisedCapital: '',
      COC_FDIODIAuthorisedEffect: '',
      COC_FDIODIAuthorisedMeetDate: '',
      COC_FDIODIAuthorisedROCDate: '',
    };
    this.COC_FDIODIAuthorisedCapitalArray.push(
      this.COC_FDIODIAuthorisedCapitaldata
    );
    this.NICCodeSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      closeDropDownOnSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.ModuleSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      closeDropDownOnSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.SubModuleSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.COC_FDIFormlist = this.fb.group(
      {
        COC_FDICIN: new FormControl('', Validators.required),
        COC_FDI_CompanyName: new FormControl('', Validators.required),
        COC_FDIIncorporationDate: new FormControl('', Validators.required),
        COC_FDIBusPanNo: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'),
          // this.gstpanValidator
        ]),
        COC_FDIRegOfficeAddress: new FormControl('', Validators.required),
        COC_FDICity: new FormControl('', Validators.required),
        COC_FDIState: new FormControl('', Validators.required),
        COC_FDIPincode: new FormControl('', Validators.required),
        COC_FDI_Email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        COC_FDIMobile: new FormControl('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(10),
        ]),
        COC_FDITelephone: new FormControl('', Validators.required),
        COC_FDIFAX: new FormControl('', Validators.required),
        COC_FDI_AuthPerson: new FormControl('', Validators.required),
        COC_FDI_AuthPersonAddress: new FormControl('', Validators.required),
        COC_FDI_AuthPAN: new FormControl('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'),
        ]),

        COC_FDI_AuthDesignation: new FormControl('', Validators.required),
        COC_FDI_BusinessAct: new FormControl('', Validators.required),
        SelectCOC_FDINICCodeDesDetails: new FormArray([]),
        COC_FDIFemaRegNoDetails: new FormArray([]),
        COC_FDIGSTNo: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'
          ),
          // this.gstpanValidator
        ]),
        SelectCOC_FDICenResDetails: new FormArray([]),
        COC_FDI_CompoundSubject: new FormControl('', Validators.required),
        COC_FDI_CompoundRef: new FormControl('', Validators.required),
        COC_FDI_CompoundAppFee: new FormControl(
          'INR 5000',
          Validators.required
        ),
        COC_FDI_CompoundDemandNo: new FormControl('', Validators.required),
        COC_FDI_CompoundDemandDate: new FormControl(
          formatDate(new Date(), 'yyyy-MM-dd', 'en'),
          Validators.required
        ),
        COC_FDI_CompoundCity: new FormControl('', Validators.required),
        //COC_FDI_CompSubBackground:new FormControl('', Validators.required),
        BackSubmissionDetails: new FormArray([]),
        TransactionSubmissionDetails: new FormArray([]),
        RegulatorySubmissionDetails: new FormArray([]),
        DelayReasonsSubmissionDetails: new FormArray([]),
        PetitionRequestSubmissionDetails: new FormArray([]),
        COC_FDIODITabADetails: new FormArray([]),
        TableATotAmount: new FormControl(
          this.TableATotAmountData,
          Validators.required
        ),
        COC_FDIODITableBDetails: new FormArray([]),
        COC_FDIODITableCDetails: new FormArray([]),
        COC_FDIODIAuthorisedCapitalDetails: new FormArray([]),
        COC_FDIODIName: new FormControl('', Validators.required),
        COC_FDIODIDate: new FormControl('', Validators.required),
        COC_FDIODIPAN: new FormControl('', [
          Validators.required,
          Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$'),
        ]),

        // New fields
        COC_FDIODIActivities: new FormControl('', Validators.required),
        COC_FDIODIaboutforegien: new FormControl('', Validators.required),
        COC_FDIODIDetailforeign: new FormControl('', Validators.required),
        COC_FDIODIBalanceSheetCopy: new FormControl('', Validators.required),
        COC_FDIODIContraventionNature: new FormControl('', Validators.required),
        COC_FDIODIContraventionReason: new FormControl('', Validators.required),

        //Step 5 ECB
        COC_ECBApplicantBorrower: new FormControl('', Validators.required),
        COC_ECBLenderEligible: new FormControl('', Validators.required),
        COC_ECBLenderEquityHolder: new FormControl('', Validators.required),
        COC_ECBHoldingLevel: new FormControl('', Validators.required),
        COC_ECBDetailsTable: new FormArray([]),
        COC_ECBLoanDate: new FormControl('', Validators.required),
        COC_ECBIntrestRate: new FormControl('', Validators.required),
        COC_ECBLoanPeriod: new FormControl('', Validators.required),
        COC_ECBRepaymentTable: new FormArray([]),

        // Step 5 ODI
        COC_ODIOverseasEntity: new FormControl('', Validators.required),
        COC_ODIOverseasEntityDate: new FormControl('', Validators.required),
        COC_ODIOverseasActivities: new FormControl('', Validators.required),
        COC_ODIEntityNature: new FormControl('', Validators.required),
        COC_ODIRemittanceDetailsTable: new FormArray([]),
        COC_ODIFinancialDetails: new FormControl('', Validators.required),
        COC_ODIUinDetails: new FormControl('', Validators.required),
        COC_ODIReceiptShareTable: new FormArray([]),
        COC_ODIRegulatorsApproval: new FormControl('', Validators.required),
        COC_ODIAprsDetailTable: new FormArray([]),
        COC_ODIContraventionNature: new FormControl('', Validators.required),
        COC_ODIContraventionReason: new FormControl('', Validators.required),
        COC_ODISuppDocuments: new FormControl('', Validators.required),

        // Step 5 Liason
        COC_LiasonOfficeDetailTable: new FormArray([]),
        COC_LiasonIncomeExpenditure: new FormControl('', Validators.required),
        COC_LiasonAnnualActivityTable: new FormArray([]),
        COC_LiasonContraventionNature: new FormControl('', Validators.required),
        COC_LiasonContraventionReason: new FormControl('', Validators.required),
        COC_LiasonSuppDocuments: new FormControl('', Validators.required),
      },
      { validator: ConfirmedValidator('COC_FDIBusPanNo', 'COC_FDIGSTNo') }
    );

    // Step-5 ECB Form
    this.COC_ECBDetailsData = {
      COC_ECBDetailLrn: '',
      COC_ECBDetailDescription: '',
      COC_ECBDetailLoanCurency: '',
      COC_ECBDetailAmountFcy: '',
      COC_ECBDetailAmountInr: '',
      COC_ECBDetailTransactionDate: '',
    };
    this.COC_ECBDetailsArray.push(this.COC_ECBDetailsData);

    this.COC_ECBRepaymentData = {
      COC_ECBRepaymentDrawn: '',
      COC_ECBRepaymentAmountFc: '',
      COC_ECBRepaymentAmountInr: '',
    };
    this.COC_ECBRepaymentArray.push(this.COC_ECBRepaymentData);

    // step-5 ODI Form

    this.COC_ODIRemittanceData = {
      COC_ODIRemittanceDate: '',
      COC_ODIRemittanceAmountFcy: '',
      COC_ODIRemittanceAmountInr: '',
    };
    this.COC_ODIRemittanceArray.push(this.COC_ODIRemittanceData);

    this.COC_ODIReceiptShareData = {
      COC_ODIShareNumber: '',
      COC_ODIReceiptDate: '',
    };
    this.COC_ODIReceiptShareArray.push(this.COC_ODIReceiptShareData);

    this.COC_ODIAprsDetailData = {
      COC_ODIAprTransactionNo: '',
      COC_ODIAprPeriodEnded: '',
      COC_ODIAprSubmissionDate: '',
    };
    this.COC_ODIAprsDetailArray.push(this.COC_ODIAprsDetailData);

    // step-5 LIASON Form

    this.COC_LiasonOfficeDetailsData = {
      COC_LiasonOfficeDate: '',
      COC_LiasonOfficePeriod: '',
    };
    this.COC_LiasonOfficeDetailsArray.push(this.COC_LiasonOfficeDetailsData);

    this.COC_LiasonAnnualActivityData = {
      COC_LiasonFinancialYear: '',
      COC_LiasonAnnualSubmissionDate: '',
    };
    this.COC_LiasonAnnualActivityArray.push(this.COC_LiasonAnnualActivityData);
  }

  deleteGrantData(data, index) {
    debugger;
    if (data == 'back') {
      if (this.BackSubmissionArray.length == 1) {
        return false;
      } else {
        this.BackSubmissionArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'Trans') {
      if (this.TransactionSubmissionArray.length == 1) {
        return false;
      } else {
        this.TransactionSubmissionArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'Regulatory') {
      if (this.RegulatorySubmissionArray.length == 1) {
        return false;
      } else {
        this.RegulatorySubmissionArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'Delay') {
      if (this.DelayReasonsSubmissionArray.length == 1) {
        return false;
      } else {
        this.DelayReasonsSubmissionArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'Petition') {
      if (this.PetitionRequestSubmissionArray.length == 1) {
        return false;
      } else {
        this.PetitionRequestSubmissionArray.splice(index, 1);
        return true;
      }
    }
  }

  addGrantData(data) {
    debugger;
    if (data == 'back') {
      this.BackSubmissiondata = { COC_FDI_Background: '' };
      this.BackSubmissionArray.push(this.BackSubmissiondata);
    }
    if (data == 'Trans') {
      this.TransactionSubmissiondata = { COC_FDI_Transaction: '' };
      this.TransactionSubmissionArray.push(this.TransactionSubmissiondata);
    }
    if (data == 'Regulatory') {
      this.RegulatorySubmissiondata = { COC_FDI_DelayReasons: '' };
      this.RegulatorySubmissionArray.push(this.RegulatorySubmissiondata);
    }
    if (data == 'Delay') {
      this.DelayReasonsSubmissiondata = { COC_FDI_Regulatory: '' };
      this.DelayReasonsSubmissionArray.push(this.DelayReasonsSubmissiondata);
    }
    if (data == 'Petition') {
      this.PetitionRequestSubmissiondata = { COC_FDI_PetitionRequest: '' };
      this.PetitionRequestSubmissionArray.push(
        this.PetitionRequestSubmissiondata
      );
    }
    return true;
  }

  deleteODIGrantData(data, index) {
    if (data == 'TableA') {
      if (this.COC_FDIODITabAArray.length == 1) {
        return false;
      } else {
        this.COC_FDIODITabAArray.splice(index, 1);
        this.TableATotAmountData = 0;
        this.COC_FDIODITabAArray.forEach((element) => {
          this.TableATotAmountData += parseFloat(element.COC_FDIODITabAAmount);
        });

        return true;
      }
    }
    if (data == 'TableB') {
      if (this.COC_FDIODITableBArray.length == 1) {
        return false;
      } else {
        this.COC_FDIODITableBArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'TableC') {
      if (this.COC_FDIODITableCArray.length == 1) {
        return false;
      } else {
        this.COC_FDIODITableCArray.splice(index, 1);
        return true;
      }
    }
    if (data == 'TableAuth') {
      if (this.COC_FDIODIAuthorisedCapitalArray.length == 1) {
        return false;
      } else {
        this.COC_FDIODIAuthorisedCapitalArray.splice(index, 1);
        return true;
      }
    }
  }

  addODIGrantData(data) {
    if (data == 'TableA') {
      this.COC_FDIODITableAdata = {
        COC_FDIODITabARemitterName: '',
        COC_FDIODITabAAmount: '',
        COC_FDIODITabAReceiptDate: '',
        COC_FDIODITabAReportedDate: '',
        COC_FDIODITabADelay: '',
      };
      this.COC_FDIODITabAArray.push(this.COC_FDIODITableAdata);
    }
    if (data == 'TableB') {
      this.COC_FDIODITableBdata = {
        COC_FDIODITabBInvestorName: '',
        COC_FDIODITabBShareDate: '',
        COC_FDIODITabBNumofShare: '',
        COC_FDIODITabBAmtofShare: '',
        COC_FDIODITabBReportingDate: '',
        COC_FDIODITabBDelay: '',
      };
      this.COC_FDIODITableBArray.push(this.COC_FDIODITableBdata);
    }
    if (data == 'TableC') {
      this.COC_FDIODITableCdata = {
        COC_FDIODITabCRemitterName: '',
        COC_FDIODITabCAmount: '',
        COC_FDIODITabCReceiptDate: '',
        COC_FDIODITabCExcessshare: '',
        COC_FDIODITabCDateRefund: '',
        COC_FDIODITabCForexAmt: '',
        COC_FDIODITabCapprovaldate: '',
      };
      this.COC_FDIODITableCArray.push(this.COC_FDIODITableCdata);
    }
    if (data == 'TableAuth') {
      this.COC_FDIODIAuthorisedCapitaldata = {
        COC_FDIODIAuthorisedDate: '',
        COC_FDIODIAuthorisedCapital: '',
        COC_FDIODIAuthorisedEffect: '',
        COC_FDIODIAuthorisedMeetDate: '',
        COC_FDIODIAuthorisedROCDate: '',
      };
      this.COC_FDIODIAuthorisedCapitalArray.push(
        this.COC_FDIODIAuthorisedCapitaldata
      );
    }
    return true;
  }

  // Step 5 ECB detail add rows in table
  addECBDetailsData(data) {
    if (data == 'ecbDetails') {
      this.COC_ECBDetailsData = {
        COC_ECBDetailLrn: '',
        COC_ECBDetailDescription: '',
        COC_ECBDetailLoanCurency: '',
        COC_ECBDetailAmountFcy: '',
        COC_ECBDetailAmountInr: '',
        COC_ECBDetailTransactionDate: '',
      };
      this.COC_ECBDetailsArray.push(this.COC_ECBDetailsData);
      console.log(this.COC_ECBDetailsArray);
    }
    if (data == 'repaymentParticulars') {
      this.COC_ECBRepaymentData = {
        COC_ECBRepaymentDrawn: '',
        COC_ECBRepaymentAmountFc: '',
        COC_ECBRepaymentAmountInr: '',
      };
      this.COC_ECBRepaymentArray.push(this.COC_ECBRepaymentData);
    }
    return true;
  }

  // Step 5 ECB detail delete rows in table
  deleteECBDetailsData(data, index) {
    if (data == 'ecbDetails') {
      if (this.COC_ECBDetailsArray.length == 1) {
        return false;
      } else {
        this.COC_ECBDetailsArray.splice(index, 1);
        return true;
      }
    }

    if (data == 'repaymentParticulars') {
      if (this.COC_ECBRepaymentArray.length == 1) {
        return false;
      } else {
        this.COC_ECBRepaymentArray.splice(index, 1);
        return true;
      }
    }
  }

  // Step 5 ODI detail add rows in table
  addODIDetailsData(data) {
    if (data == 'remittanceDetails') {
      this.COC_ODIRemittanceData = {
        COC_ODIRemittanceDate: '',
        COC_ODIRemittanceAmountFcy: '',
        COC_ODIRemittanceAmountInr: '',
      };
      this.COC_ODIRemittanceArray.push(this.COC_ODIRemittanceData);
    }
    if (data == 'receiptShare') {
      this.COC_ODIReceiptShareData = {
        COC_ODIShareNumber: '',
        COC_ODIReceiptDate: '',
      };
      this.COC_ODIReceiptShareArray.push(this.COC_ODIReceiptShareData);
    }
    if (data == 'aprsDetails') {
      this.COC_ODIAprsDetailData = {
        COC_ODIAprTransactionNo: '',
        COC_ODIAprPeriodEnded: '',
        COC_ODIAprSubmissionDate: '',
      };
      this.COC_ODIAprsDetailArray.push(this.COC_ODIAprsDetailData);
      return true;
    }
  }

  // Step 5 ODI detail delete rows in table
  deleteODIDetailsData(data, index) {
    if (data == 'remittanceDetails') {
      if (this.COC_ODIRemittanceArray.length == 1) {
        return false;
      } else {
        this.COC_ODIRemittanceArray.splice(index, 1);
        return true;
      }
    }

    if (data == 'receiptShare') {
      if (this.COC_ODIReceiptShareArray.length == 1) {
        return false;
      } else {
        this.COC_ODIReceiptShareArray.splice(index, 1);
        return true;
      }
    }

    if (data == 'aprsDetails') {
      if (this.COC_ODIAprsDetailArray.length == 1) {
        return false;
      } else {
        this.COC_ODIAprsDetailArray.splice(index, 1);
        return true;
      }
    }
  }

  // Step 5 Liason detail add rows in table
  addLiasonDetailsData(data) {
    if (data == 'liasonOfficeDetails') {
      this.COC_LiasonOfficeDetailsData = {
        COC_LiasonOfficeDate: '',
        COC_LiasonOfficePeriod: '',
      };
      this.COC_LiasonOfficeDetailsArray.push(this.COC_LiasonOfficeDetailsData);
    }
    if (data == 'liasonAnnualActivity') {
      this.COC_LiasonAnnualActivityData = {
        COC_LiasonFinancialYear: '',
        COC_LiasonAnnualSubmissionDate: '',
      };
      this.COC_LiasonAnnualActivityArray.push(
        this.COC_LiasonAnnualActivityData
      );
    }
  }

  // Step 5 Liason detail delete rows in table
  deleteLiasonDetailsData(data, index) {
    if (data == 'liasonOfficeDetails') {
      if (this.COC_LiasonOfficeDetailsArray.length == 1) {
        return false;
      } else {
        this.COC_LiasonOfficeDetailsArray.splice(index, 1);
        return true;
      }
    }

    if (data == 'liasonAnnualActivity') {
      if (this.COC_LiasonAnnualActivityArray.length == 1) {
        return false;
      } else {
        this.COC_LiasonAnnualActivityArray.splice(index, 1);
        return true;
      }
    }
  }

  // Step 3 select nicCode in modal
  SelectCOC_FDINICCodeDes(item: any) {
    console.log(item);
    let itemExist = this.SelectCOC_FDINICCodeDesArray.findIndex(
      (nicCode) => nicCode.Class === item.Class
    );
    if (item.status == true) {
      item.status = false;
      this.SelectCOC_FDINICCodeDesArray.splice(itemExist, 1);
    } else {
      item.status = true;
      this.SelectCOC_FDINICCodeDesArray.push({
        Year: item.Year,
        Class: item.Class,
        DescriptionClass: item.DescriptionClass,
      });
    }
  }

  SelectAllNicCodes(event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.NICCodeListShow.map((item) => {
        item.status = true;
        this.SelectCOC_FDINICCodeDesArray.push({
          Year: item.Year,
          Class: item.Class,
          DescriptionClass: item.DescriptionClass,
        });
      });
    } else {
      this.SelectCOC_FDINICCodeDesArray = [];
    }
  }

  SelectCOC_FDIResCent(item: any) {
    let itemExist = this.SelectCOC_FDICenResArray.findIndex(
      (x) => x._id === item._id
    );
    if (item.status == true) {
      item.status = false;
      this.SelectCOC_FDICenResArray.splice(itemExist, 1);
      console.log('in if');
    } else {
      item.status == true;
      this.SelectCOC_FDICenResArray.push({
        id: item._id,
        RegionalOffices: item.RegionalOffices,
        Address: item.Address,
      });
    }
  }

  searchRegionalOfficeList(event: any) {
    this.RegionalOfficeListShow = this.RegionalOfficeList.filter((x) => {
      if (
        x.RegionalOffices.toLowerCase().includes(
          event.target.value.toLowerCase()
        )
      ) {
        return x;
      }
    });
  }

  onSelectAll(items: any) {
    console.log(items);
  }
  title = 'cimplyfema';

  filteredsubmodule: any;

  NICCodeSelect(selectedSubModule, val) {
    this.Submodule = selectedSubModule;
    this.SubmodulenameDes = val.filter(
      (x) => x.id === Number(selectedSubModule.id)
    )[0].Description;
    this.Submodulename = val.filter(
      (x) => x.id === Number(selectedSubModule.id)
    )[0].name;
    this.SubmodulenameArray.push({
      Submodulename: this.Submodulename,
      SubmodulenameDes: this.SubmodulenameDes,
    });
  }

  //Change city list on state selection
  changeCityList(event: any) {
    console.log('event', event);
    if (event) {
      this.cityListShow = this.CityList.filter((x) => x.State == event.State);
    } else {
      this.cityListShow = [];
    }
  }

  TableATotAmount(data) {
    this.TableATotAmountData = 0;
    this.COC_FDIODITabAArray.forEach((element) => {
      this.TableATotAmountData += parseFloat(element.COC_FDIODITabAAmount);
    });
    //   this.TableATotAmountData == undefined &&
    //   data.COC_FDIODITabAAmount != ''
    // ) {
    //   this.TableATotAmountData = parseFloat(data.COC_FDIODITabAAmount);
    // } else if (this.TableATotAmountData != undefined) {
    //   this.TableATotAmountData =
    //     this.TableATotAmountData + parseFloat(data.COC_FDIODITabAAmount);
    // }
  }

  onModuleSelect(selectedModule) {
    console.log('in module', selectedModule);
    this.SubselectedItems = [];
    this.COC_FDIFemaRegNoArray = [];
    this.SubmodulenameArray.length = 0;

    // For step 5(form dependent on module selected)
    let selectedModuleId = selectedModule.id;
    switch (selectedModuleId) {
      case 1:
        this.step5FdiForm = true;
        this.step5OdiForm = false;
        this.step5ECBForm = false;
        this.step5LiasionForm = false;
        this.step5disable = false;
        this.step5FormName = 'FDI Annexure';
        break;
      case 2:
        this.step5OdiForm = true;
        this.step5FdiForm = false;
        this.step5ECBForm = false;
        this.step5LiasionForm = false;
        this.step5disable = false;
        this.step5FormName = 'ODI Annexure';
        break;
      case 3:
        this.step5ECBForm = true;
        this.step5FdiForm = false;
        this.step5OdiForm = false;
        this.step5LiasionForm = false;
        this.step5disable = false;
        this.step5FormName = 'ECB Annexure';
        break;
      case 4:
        this.step5LiasionForm = true;
        this.step5FdiForm = false;
        this.step5OdiForm = false;
        this.step5ECBForm = false;
        this.step5disable = false;
        this.step5FormName = 'LO/BO/PO Annexure';
        break;
      default:
        this.step5disable = true;
        this.step5FormName = '';
    }
    //this.multiSelect.toggleSelectAll();
    if (selectedModule.id == 1) {
      /* this.COC_FDIFormDiv=true; */
    } else {
      this.COC_FDIFormDiv = false;
    }
    this.filteredsubmodule = this.submodules.filter(
      (item) => item.moduleid === Number(selectedModule.id)
    );
  }

  onAllSubModuleSelect(items: any, val) {
    for (let submod of val) {
      for (let order of this.SubmodulenameArray) {
        if (order.Submodulename == submod.name) {
          this.SubmodulenameArray.splice(
            this.SubmodulenameArray.indexOf(order),
            1
          );
        }
      }
    }
    for (let i = 0; i < items.length; i++) {
      this.Submodule = items[i];
      this.SubmodulenameDes = val.filter(
        (x) => x.id === Number(items[i].id)
      )[0].Description;
      this.Submodulename = val.filter(
        (x) => x.id === Number(items[i].id)
      )[0].name;
      this.SubmodulenameArray.push({
        Submodulename: this.Submodulename,
        SubmodulenameDes: this.SubmodulenameDes,
      });
      this.COC_FDIFemaRegNoArray.push({
        COC_FDINatContname: this.Submodulename,
        COC_FDINatContDes: this.SubmodulenameDes,
      });
    }
    this.OpenFdiForm(items);
  }

  OpenFdiForm(selectedModule?: any) {
    // console.log('in openFdiForm:selectModule',selectedModule,selectedModule.id)
    if (selectedModule) {
      console.log('in if');
      this.COC_FDIFormDiv = true;
    }
    if (this.SubmodulenameArray.length == 0) {
      this.COC_FDIFormDiv = false;
    }
    // else{
    // this.COC_FDIFormDiv=false;
    // }
  }

  // Unselect single submodule in headr dropdown
  onItemDeSelect(item: any) {
    for (let order of this.SubmodulenameArray) {
      if (order.Submodulename == item.name) {
        this.SubmodulenameArray.splice(
          this.SubmodulenameArray.indexOf(order),
          1
        );
      }
    }
    this.OpenFdiForm(); // TO close the tab if nothing is selected
  }

  // Unselect all subModules in header dropdown
  onUnSelectAll() {
    this.SubmodulenameArray.length = 0;
    this.OpenFdiForm(); // To close the tab if nothing is selected
  }

  onSubModuleSelect(selectedSubModule, val) {
    this.Submodule = selectedSubModule;
    this.SubmodulenameDes = val.filter(
      (x) => x.id === Number(selectedSubModule.id)
    )[0].Description;
    this.Submodulename = val.filter(
      (x) => x.id === Number(selectedSubModule.id)
    )[0].name;
    for (let order of this.SubmodulenameArray) {
      if (order.Submodulename == selectedSubModule.name) {
        this.SubmodulenameArray.splice(
          this.SubmodulenameArray.indexOf(order),
          1
        );
      }
    }
    this.SubmodulenameArray.push({
      Submodulename: this.Submodulename,
      SubmodulenameDes: this.SubmodulenameDes,
    });
    this.COC_FDIFemaRegNoArray.push({
      COC_FDINatContname: this.Submodulename,
      COC_FDINatContDes: this.SubmodulenameDes,
    });
    //this.BackSubmissionArray.push({COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===selectedSubModule.name)[0].BackgroundB});
    this.OpenFdiForm(selectedSubModule);
  }

  // Check agree checkbox in instruction
  CheckAgreeTerm(Val) {
    if (Val.currentTarget.checked == true) {
      this.COC_FDIInstructionsButton = false;
    } else {
      this.COC_FDIInstructionsButton = true;
    }
  }

  // Stepper back/next button
  RBI_FDISubmit(Val) {
    this.COC_FDIInstructions = false;
    this.COC_FDIApplicantDetails = false;
    this.COC_FDIInstructionsButton = true;
    this.COC_FDICompoundingDetails = false;
    this.COC_FDICompoundingSubmissions = false;
    this.COC_FDIODIECB = false;
    this.COC_FDIOtherAnnexures = false;
    this.COC_FDIDocPreviewg = false;
    if (Val == '4') {
      this.BackSubmissionArray.length = 0;
      this.DelayReasonsSubmissionArray.length = 0;
      this.RegulatorySubmissionArray.length = 0;
      this.PetitionRequestSubmissionArray.length = 0;
      for (let Fema of this.SubmodulenameArray) {
        console.log(
          'SubmodulenameArray',
          this.SubmodulenameArray,
          this.FemaRegulationsList
        );
        if (this.FemaRegulationsList.length > 0) {
          console.log(
            this.FemaRegulationsList.filter(
              (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
            )
          );

          // this.BackSubmissionArray.push({ COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].BackgroundA});
          // this.BackSubmissionArray.push({ COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].BackgroundB});
          // this.DelayReasonsSubmissionArray.push({ COC_FDI_DelayReasons:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].DelayReasons});
          // this.RegulatorySubmissionArray.push({ COC_FDI_Regulatory:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].RegulatoryFramework});
          // this.PetitionRequestSubmissionArray.push({ COC_FDI_PetitionRequest:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].PetitionRequest});

          console.log(this.COC_FDIFormlist.value.COC_FDI_CompanyName);

          // Exact match on moduleName

          // this.BackSubmissionArray.push({
          //   COC_FDI_Background: this.FemaRegulationsList.filter(
          //     (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
          //   )[0]?.background.background1.replace(
          //     '[Insert Company Name] (‘Company’  or ‘Applicant’)',
          //     this.COC_FDIFormlist.value.COC_FDI_CompanyName
          //   ),
          // });
          // this.BackSubmissionArray.push({
          //   COC_FDI_Background: this.FemaRegulationsList.filter(
          //     (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
          //   )[0]?.background.background2.replace(
          //     '[Insert Company Name] (‘Company’  or ‘Applicant’)',
          //     this.COC_FDIFormlist.value.COC_FDI_CompanyName
          //   ),
          // });
          // this.DelayReasonsSubmissionArray.push({
          //   COC_FDI_DelayReasons: this.FemaRegulationsList.filter(
          //     (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
          //   )[0]?.delayReasons,
          // });
          // this.RegulatorySubmissionArray.push({
          //   COC_FDI_Regulatory: this.FemaRegulationsList.filter(
          //     (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
          //   )[0]?.regulatoryFramework,
          // });
          // this.PetitionRequestSubmissionArray.push({
          //   COC_FDI_PetitionRequest: this.FemaRegulationsList.filter(
          //     (x) => x.femaRegulationNoSubTopics === Fema.Submodulename
          //   )[0]?.petitionRequest,
          // });

          // Starting string match module name
          this.BackSubmissionArray.push({
            COC_FDI_Background: this.FemaRegulationsList.filter(
              (x) =>
                x.femaRegulationNoSubTopics.slice(
                  0,
                  Fema.Submodulename.length
                ) === Fema.Submodulename
            )[0]?.background.background1.replace(
              '[Insert Company Name] (‘Company’  or ‘Applicant’)',
              this.COC_FDIFormlist.value.COC_FDI_CompanyName
            ),
          });
          this.BackSubmissionArray.push({
            COC_FDI_Background: this.FemaRegulationsList.filter(
              (x) =>
                x.femaRegulationNoSubTopics.slice(
                  0,
                  Fema.Submodulename.length
                ) === Fema.Submodulename
            )[0]?.background.background2.replace(
              '[Insert Company Name] (‘Company’  or ‘Applicant’)',
              this.COC_FDIFormlist.value.COC_FDI_CompanyName
            ),
          });
          this.DelayReasonsSubmissionArray.push({
            COC_FDI_DelayReasons: this.FemaRegulationsList.filter(
              (x) =>
                x.femaRegulationNoSubTopics.slice(
                  0,
                  Fema.Submodulename.length
                ) === Fema.Submodulename
            )[0]?.delayReasons,
          });
          this.RegulatorySubmissionArray.push({
            COC_FDI_Regulatory: this.FemaRegulationsList.filter(
              (x) =>
                x.femaRegulationNoSubTopics.slice(
                  0,
                  Fema.Submodulename.length
                ) === Fema.Submodulename
            )[0]?.regulatoryFramework,
          });
          this.PetitionRequestSubmissionArray.push({
            COC_FDI_PetitionRequest: this.FemaRegulationsList.filter(
              (x) =>
                x.femaRegulationNoSubTopics.slice(
                  0,
                  Fema.Submodulename.length
                ) === Fema.Submodulename
            )[0]?.petitionRequest,
          });
        }
      }
      console.log('this.BackSubmissionArray', this.BackSubmissionArray);
    }
    if (Val == '1') {
      this.COC_FDIInstructions = true;
      for (let i = 0; i < this.NICCodeList.length; i++) {
        this.NICCodeList[i].status = false;
        // console.log(this.NICCodeList)
      }
    }
    if (Val == '2') {
      this.COC_FDIApplicantDetails = true;
    }
    if (Val == '3') {
      let key = [
        'COC_FDICIN',
        'COC_FDI_CompanyName',
        'COC_FDIIncorporationDate',
        'COC_FDIBusPanNo',
        'COC_FDIGSTNo',
        'COC_FDIRegOfficeAddress',
        'COC_FDIState',
        'COC_FDICity',
        'COC_FDIPincode',
        'COC_FDI_Email',
        'COC_FDIMobile',
        'COC_FDITelephone',
        'COC_FDIFAX',
        'COC_FDI_AuthPerson',
        'COC_FDI_AuthPersonAddress',
        'COC_FDI_AuthPAN',
        'COC_FDI_AuthDesignation',
      ];
      let check = true;
      console.log(
        this.COC_FDIFormlist,
        this.COC_FDIFormlist.get('COC_FDIBusPanNo').value
      );
      key.map((item) => {
        if (this.COC_FDIFormlist.controls[item].status == 'INVALID') {
          this.COC_FDIFormlist.controls[item].markAsTouched();
          check = false;
          this.COC_FDIApplicantDetails = true;
          // return;
        }
      });
      if (check) {
        this.COC_FDICompoundingDetails = true;
      }
    }
    if (Val == '4') {
      this.COC_FDICompoundingSubmissions = true;
    }
    if (Val == '5') {
      this.COC_FDIODIECB = true;
    }
    if (Val == '7') {
      this.COC_FDIDocPreviewg = true;
    }
    if (Val == '6') {
      this.COC_FDIOtherAnnexures = true;
    }
    console.log(Val);
  }

  OnModuleTabClick(year: any) {
    console.log(this.NICCodeList);
    this.NICCodeListShow = this.NICCodeList.filter((x) => x.Year == year);
    this.ActiveTab = year;
  }

  // gstpanValidator(pan:string,gst:any) {
  //   console.log("control",pan,gst)
  //   let gstNo = '';
  //   if (gstNo && gstNo.length > 0 && gstNo.slice(2,12)!=pan) {
  //     console.log("inn vv")
  //     gst.setErrors({ gstpanError: true });
  //     // return {
  //     //   gstpanError: {
  //     //     enteredGst: gstNo
  //     //   }
  //     // }
  //   }
  //   return null;
  // }

  searchNicCode(event: any) {
    console.log(typeof event.target.value);
    this.NICCodeListShow = this.NICCodeList.filter((x) => {
      if (
        x.Year == this.ActiveTab &&
        String(x.Class).includes(event.target.value)
      ) {
        return x;
      }
    });
  }
  onSubmitCOCFrom() {
    const COC_FDINICCodeDesArray: FormArray = this.fb.array(
      this.SelectCOC_FDINICCodeDesArray
    );
    this.COC_FDIFormlist.setControl(
      'SelectCOC_FDINICCodeDesDetails',
      COC_FDINICCodeDesArray
    );
    const COC_FDIFemaRegNoFormArray: FormArray = this.fb.array(
      this.COC_FDIFemaRegNoArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_FDIFemaRegNoDetails',
      COC_FDIFemaRegNoFormArray
    );
    const COC_FDICenResArray: FormArray = this.fb.array(
      this.SelectCOC_FDICenResArray
    );
    this.COC_FDIFormlist.setControl(
      'SelectCOC_FDICenResDetails',
      COC_FDICenResArray
    );
    const BackgrantFormArray: FormArray = this.fb.array(
      this.BackSubmissionArray
    );
    this.COC_FDIFormlist.setControl(
      'BackSubmissionDetails',
      BackgrantFormArray
    );
    const RegulFormArray: FormArray = this.fb.array(
      this.RegulatorySubmissionArray
    );
    this.COC_FDIFormlist.setControl(
      'RegulatorySubmissionDetails',
      RegulFormArray
    );
    const DelayFormArray: FormArray = this.fb.array(
      this.DelayReasonsSubmissionArray
    );
    this.COC_FDIFormlist.setControl(
      'DelayReasonsSubmissionDetails',
      DelayFormArray
    );
    const PetitionFormArray: FormArray = this.fb.array(
      this.PetitionRequestSubmissionArray
    );
    this.COC_FDIFormlist.setControl(
      'PetitionRequestSubmissionDetails',
      PetitionFormArray
    );
    const TransmissFormArray: FormArray = this.fb.array(
      this.TransactionSubmissionArray
    );
    this.COC_FDIFormlist.setControl(
      'TransactionSubmissionDetails',
      TransmissFormArray
    );
    const TabAFormArray: FormArray = this.fb.array(this.COC_FDIODITabAArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITabADetails', TabAFormArray);
    const TabBFormArray: FormArray = this.fb.array(this.COC_FDIODITableBArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITableBDetails', TabBFormArray);
    const TabCFormArray: FormArray = this.fb.array(this.COC_FDIODITableCArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITableCDetails', TabCFormArray);

    const AuthCapFormArray: FormArray = this.fb.array(
      this.COC_FDIODIAuthorisedCapitalArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_FDIODIAuthorisedCapitalDetails',
      AuthCapFormArray
    );

    // step-5 Ecbform
    const EcbDetails: FormArray = this.fb.array(this.COC_ECBDetailsArray);
    this.COC_FDIFormlist.setControl('COC_ECBDetailsTable', EcbDetails);

    const EcbRepayment: FormArray = this.fb.array(this.COC_ECBRepaymentArray);
    this.COC_FDIFormlist.setControl('COC_ECBRepaymentTable', EcbRepayment);

    // step-5 Odiform
    const OdiRemittanceDetails: FormArray = this.fb.array(
      this.COC_ODIRemittanceArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_ODIRemittanceDetailsTable',
      OdiRemittanceDetails
    );

    const OdiReceiptShareDetails: FormArray = this.fb.array(
      this.COC_ODIReceiptShareArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_ODIReceiptShareTable',
      OdiReceiptShareDetails
    );

    const OdiAprsDetails: FormArray = this.fb.array(
      this.COC_ODIAprsDetailArray
    );
    this.COC_FDIFormlist.setControl('COC_ODIAprsDetailTable', OdiAprsDetails);

    //Step 5 Liason office

    const LiasonOffice: FormArray = this.fb.array(
      this.COC_LiasonOfficeDetailsArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_LiasonOfficeDetailTable',
      LiasonOffice
    );

    const LiasonAnnual: FormArray = this.fb.array(
      this.COC_LiasonAnnualActivityArray
    );
    this.COC_FDIFormlist.setControl(
      'COC_LiasonAnnualActivityTable',
      LiasonAnnual
    );

    console.log(this.COC_FDIFormlist.value);
    if (this.COC_FDIFormlist.invalid) {
      for (const control of Object.keys(this.COC_FDIFormlist.controls)) {
        this.COC_FDIFormlist.controls[control].markAsTouched();
      }
      return;
    } else {
      return this.apiService
        .createFormcoc(this.COC_FDIFormlist.value)
        .subscribe({
          complete: () => {
            alert('Fromcoc successfully created!');
            //console.log('FromEsop successfully created!');
            //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
          },
          error: (e) => {
            console.log(e);
          },
        });
    }
  }

  @ViewChild('pdfTable1') pdfTable1: ElementRef;
  @ViewChild('pdfTable2') pdfTable2: ElementRef;
  @ViewChild('pdfTable3') pdfTable3: ElementRef;
  @ViewChild('pdfTable4') pdfTable4: ElementRef;
  @ViewChild('pdfTable5') pdfTable5: ElementRef;
  @ViewChild('pdfTable6') pdfTable6: ElementRef;
  @ViewChild('pdfTable7') pdfTable7: ElementRef;

  downloadAsPDFRbi() {
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
    const doc = new jsPDF();
    const pdfTable = this.pdfTable5.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML, { tableAutoSize: false });
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  downloadAsPDF6() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable6.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML, { tableAutoSize: false });
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  downloadAsPDF7() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable7.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML, { tableAutoSize: false });
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
  async ExportWordRbi() {
    const pdfTable = this.pdfTable1.nativeElement;

    console.log('pdfTable.innerHTML', pdfTable.innerHTML);
    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'RBI Covering Letter.docx');
  }

  async ExportWord2() {
    const pdfTable = this.pdfTable2.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'CSCertificate.docx');
  }
  async ExportWord3() {
    const pdfTable = this.pdfTable3.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Submissions.docx');
  }
  async ExportWord4() {
    const pdfTable = this.pdfTable4.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Declaration.docx');
  }
  async ExportWord5() {
    const pdfTable = this.pdfTable5.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Letter of authority.docx');
  }
  async ExportWord6() {
    const pdfTable = this.pdfTable6.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Undertaking.docx');
  }
  async ExportWord7() {
    const pdfTable = this.pdfTable7.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'ECS Mandate Letter.docx');
  }
}
