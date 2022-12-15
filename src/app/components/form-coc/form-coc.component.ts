import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';

import jsPDF from 'jspdf';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ignoreElements } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import {COC_FDIODITableAList,COC_FDIODITableBList,COC_FDIODITableCList,COC_FDIODIAuthorisedCapitalList,CompoundingBackList,CompoundingTransactionList,CompoundingRegulatoryList,CompoundingDelayReasonsList,CompoundingPetitionRequestList} from 'src/app/model/COCFdi.model';
import { asBlob } from 'html-docx-js-typescript';
@Component({
  selector: 'app-form-coc',
  templateUrl: './form-coc.component.html',
  styleUrls: ['./form-coc.component.css']
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
  COC_FDINICCodeDescriptionList:any=[];
  StateList: any = [];
  FDIStatelist:any=[];
  SubselectedItems = [];
  SubmodulenameArray = [];
  NICCodeSettings:IDropdownSettings;
  ModuleSettings:IDropdownSettings;
  SubModuleSettings:IDropdownSettings;
 modules: any[];
 submodules: any[];
 module: string;
 Submodule: string;
 Submodulename: string;
 SubmodulenameDes: string;
 COC_FDIInstructions:boolean=true;
 COC_FDIApplicantDetails:boolean=false;
 COC_FDIInstructionsButton:boolean=true;
 COC_FDICompoundingDetails:boolean=false;
 COC_FDICompoundingSubmissions:boolean=false;
 COC_FDIODIECB:boolean=false;
 COC_FDIOtherAnnexures:boolean=false;
 COC_FDIDocPreviewg:boolean=false;
 COC_FDIFormDiv:boolean=false;
 firstFormGroup:FormGroup;
 secondFormGroup:FormGroup;
 NICCodeList:any=[];
 FemaRegulationsList:any=[];
 RegionalOfficeList:any=[];
 SelectCOC_FDINICCodeDesArray:any=[];
 SelectCOC_FDICenResArray:any=[];
 COC_FDIFemaRegNoArray:any=[];
 TableATotAmountData:number;
isLinear = false;
  constructor(private commonservice: CommonService,private fb: FormBuilder,private apiService: ApiService,) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
    this.readCity();
    this.readState();
    this.readNICCodeDes();
    this.readRBIAuthority();
    this.readFemaRegulations()
   } 
   readCity() {
    this.apiService.getCity().subscribe((data) => {
      this.CityList = data;
    });
  }  
  readState() {
    this.apiService.getState().subscribe((data) => {

      this.StateList = data;
    });
  }
  readFemaRegulations() {
    debugger;
    this.apiService.getFemaRegulations().subscribe((femadata) => {this.FemaRegulationsList = femadata;});}
  readNICCodeDes() {
    debugger;
    this.apiService.getNICCodeDes().subscribe((Nicdata) => {this.NICCodeList = Nicdata;});}  
   readRBIAuthority() {
      debugger;
      this.apiService.getRBIAuthority().subscribe((RBIData) => {this.RegionalOfficeList = RBIData;});}  
 
  ngOnInit(): void { 
    this.BackSubmissiondata = { COC_FDI_Background: ""}
    this.BackSubmissionArray.push(this.BackSubmissiondata);
    this.TransactionSubmissiondata = { COC_FDI_Transaction: ""}
    this.TransactionSubmissionArray.push(this.TransactionSubmissiondata);
    this.RegulatorySubmissiondata = { COC_FDI_Regulatory: ""}
    this.RegulatorySubmissionArray.push(this.RegulatorySubmissiondata);
    this.DelayReasonsSubmissiondata = { COC_FDI_DelayReasons: ""}
    this.DelayReasonsSubmissionArray.push(this.DelayReasonsSubmissiondata);
    this.PetitionRequestSubmissiondata = { COC_FDI_PetitionRequest: ""}
    this.PetitionRequestSubmissionArray.push(this.PetitionRequestSubmissiondata);
    this.COC_FDIODITableAdata = { COC_FDIODITabARemitterName: "",COC_FDIODITabAAmount: "",COC_FDIODITabAReceiptDate: "",COC_FDIODITabAReportedDate: "",COC_FDIODITabADelay: ""}
    this.COC_FDIODITabAArray.push(this.COC_FDIODITableAdata);
    this.COC_FDIODITableBdata = { COC_FDIODITabBInvestorName: "",COC_FDIODITabBShareDate: "",COC_FDIODITabBNumofShare: "",COC_FDIODITabBAmtofShare: "",COC_FDIODITabBReportingDate: "",COC_FDIODITabBDelay: ""}
    this.COC_FDIODITableBArray.push(this.COC_FDIODITableBdata);
    this.COC_FDIODITableCdata = { COC_FDIODITabCRemitterName: "",COC_FDIODITabCAmount: "",COC_FDIODITabCReceiptDate: "",COC_FDIODITabCExcessshare: "",COC_FDIODITabCDateRefund: "",COC_FDIODITabCForexAmt: "",COC_FDIODITabCapprovaldate: ""}
    this.COC_FDIODITableCArray.push(this.COC_FDIODITableCdata);
    this.COC_FDIODIAuthorisedCapitaldata = { COC_FDIODIAuthorisedDate: "",COC_FDIODIAuthorisedCapital: "",COC_FDIODIAuthorisedEffect: "",COC_FDIODIAuthorisedMeetDate: "",COC_FDIODIAuthorisedROCDate: ""}
    this.COC_FDIODIAuthorisedCapitalArray.push(this.COC_FDIODIAuthorisedCapitaldata);
    this.NICCodeSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      closeDropDownOnSelection:true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',     
      allowSearchFilter: true
    };
    this.ModuleSettings= {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      closeDropDownOnSelection:true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',     
      allowSearchFilter: true
    };
    this.SubModuleSettings= {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
   this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
    this.COC_FDIFormlist = this.fb.group({   
      COC_FDICIN: new FormControl('', Validators.required),
      COC_FDI_CompanyName: new FormControl('', Validators.required),
      COC_FDIIncorporationDate: new FormControl('', Validators.required),
      COC_FDIBusPanNo: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
      COC_FDIRegOfficeAddress: new FormControl('', Validators.required),
      COC_FDICity: new FormControl('', Validators.required),
      COC_FDIState:new FormControl('', Validators.required),
      COC_FDIPincode:new FormControl('', Validators.required),
      COC_FDI_Email:new FormControl('',Validators.required),
      COC_FDIMobile:new FormControl('', Validators.required),
      COC_FDITelephone:new FormControl('', Validators.required),
      COC_FDIFAX:new FormControl('', Validators.required),
      COC_FDI_AuthPerson:new FormControl('', Validators.required),
      COC_FDI_AuthPersonAddress:new FormControl('', Validators.required),
      COC_FDI_AuthPAN:new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
      COC_FDI_AuthDesignation:new FormControl('', Validators.required),
      COC_FDI_BusinessAct:new FormControl('', Validators.required),
      SelectCOC_FDINICCodeDesDetails:new FormArray([]),
      COC_FDIFemaRegNoDetails:new FormArray([]),
      COC_FDIGSTNo:new FormControl('', Validators.required),
      SelectCOC_FDICenResDetails:new FormArray([]),
      COC_FDI_CompoundSubject:new FormControl('', Validators.required),
      COC_FDI_CompoundRef:new FormControl('', Validators.required),
      COC_FDI_CompoundAppFee:new FormControl('INR 5000', Validators.required),
      COC_FDI_CompoundDemandNo:new FormControl('', Validators.required),
      COC_FDI_CompoundDemandDate:new FormControl('', Validators.required),
      COC_FDI_CompoundCity:new FormControl('', Validators.required),
      //COC_FDI_CompSubBackground:new FormControl('', Validators.required),
      BackSubmissionDetails:new FormArray([]),
      TransactionSubmissionDetails:new FormArray([]),
      RegulatorySubmissionDetails:new FormArray([]),
      DelayReasonsSubmissionDetails:new FormArray([]),
      PetitionRequestSubmissionDetails:new FormArray([]),
      COC_FDIODITabADetails:new FormArray([]),
      TableATotAmount:new FormControl(this.TableATotAmountData, Validators.required),
      COC_FDIODITableBDetails:new FormArray([]),
      COC_FDIODITableCDetails:new FormArray([]),
      COC_FDIODIAuthorisedCapitalDetails:new FormArray([]),
      COC_FDIODIName:new FormControl('', Validators.required),
      COC_FDIODIDate:new FormControl('', Validators.required),
      COC_FDIODIPAN: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
      COC_FDIODIActivities:new FormControl('', Validators.required),
      COC_FDIODIaboutforegien:new FormControl('', Validators.required),
      COC_FDIODIDetailforeign:new FormControl('', Validators.required),
     
    })
  }
  deleteGrantData(data,index) {
    debugger
    if(data=='back'){
    if (this.BackSubmissionArray.length == 1) { return false;}
    else {this.BackSubmissionArray.splice(index, 1);  return true;}}
    if(data=='Trans'){
    if (this.TransactionSubmissionArray.length == 1) { return false;}
    else {this.TransactionSubmissionArray.splice(index, 1);  return true;}} 
    if(data=='Regulatory'){
    if (this.RegulatorySubmissionArray.length == 1) { return false;}
    else {this.RegulatorySubmissionArray.splice(index, 1);  return true;}} 
    if(data=='Delay'){
    if (this.DelayReasonsSubmissionArray.length == 1) { return false;}
    else {this.DelayReasonsSubmissionArray.splice(index, 1);  return true;}} 
    if(data=='Petition'){
    if (this.PetitionRequestSubmissionArray.length == 1) { return false;}
    else {this.PetitionRequestSubmissionArray.splice(index, 1);  return true;}} 
  }
  addGrantData(data) {
    debugger
    if(data=='back'){
      this.BackSubmissiondata = { COC_FDI_Background: ""}
     this.BackSubmissionArray.push(this.BackSubmissiondata);
    }
    if(data=='Trans'){
       this.TransactionSubmissiondata = { COC_FDI_Transaction: ""}
    this.TransactionSubmissionArray.push(this.TransactionSubmissiondata);
    }
    if(data=='Regulatory'){
       this.RegulatorySubmissiondata = { COC_FDI_DelayReasons: ""}
    this.RegulatorySubmissionArray.push(this.RegulatorySubmissiondata);
    }
    if(data=='Delay'){
       this.DelayReasonsSubmissiondata = { COC_FDI_Regulatory: ""}
    this.DelayReasonsSubmissionArray.push(this.DelayReasonsSubmissiondata);
    }
    if(data=='Petition'){
       this.PetitionRequestSubmissiondata = { COC_FDI_PetitionRequest: ""}
    this.PetitionRequestSubmissionArray.push(this.PetitionRequestSubmissiondata);
    }
    return true;
  }
  deleteODIGrantData(data,index) {
    debugger
    if(data=='TableA'){
    if (this.COC_FDIODITabAArray.length == 1) { return false;}
    else {this.COC_FDIODITabAArray.splice(index, 1);  return true;}}
    if(data=='TableB'){
    if (this.COC_FDIODITableBArray.length == 1) { return false;}
    else {this.COC_FDIODITableBArray.splice(index, 1);  return true;}} 
    if(data=='TableC'){
    if (this.COC_FDIODITableCArray.length == 1) { return false;}
    else {this.COC_FDIODITableCArray.splice(index, 1);  return true;}}
    if(data=='TableAuth'){
    if (this.COC_FDIODIAuthorisedCapitalArray.length == 1) { return false;}
    else {this.COC_FDIODIAuthorisedCapitalArray.splice(index, 1);  return true;}}    
  }
  addODIGrantData(data) {
    debugger
    if(data=='TableA'){
    this.COC_FDIODITableAdata = { COC_FDIODITabARemitterName: "",COC_FDIODITabAAmount: "",COC_FDIODITabAReceiptDate: "",COC_FDIODITabAReportedDate: "",COC_FDIODITabADelay: ""}
    this.COC_FDIODITabAArray.push(this.COC_FDIODITableAdata);}
    if(data=='TableB'){
    this.COC_FDIODITableBdata = { COC_FDIODITabBInvestorName: "",COC_FDIODITabBShareDate: "",COC_FDIODITabBNumofShare: "",COC_FDIODITabBAmtofShare: "",COC_FDIODITabBReportingDate: "",COC_FDIODITabBDelay: ""}
    this.COC_FDIODITableBArray.push(this.COC_FDIODITableBdata);}
    if(data=='TableC'){
    this.COC_FDIODITableCdata = { COC_FDIODITabCRemitterName: "",COC_FDIODITabCAmount: "",COC_FDIODITabCReceiptDate: "",COC_FDIODITabCExcessshare: "",COC_FDIODITabCDateRefund: "",COC_FDIODITabCForexAmt: "",COC_FDIODITabCapprovaldate: ""}
    this.COC_FDIODITableCArray.push(this.COC_FDIODITableCdata);}
    if(data=='TableAuth'){ 
    this.COC_FDIODIAuthorisedCapitaldata = { COC_FDIODIAuthorisedDate: "",COC_FDIODIAuthorisedCapital: "",COC_FDIODIAuthorisedEffect: "",COC_FDIODIAuthorisedMeetDate: "",COC_FDIODIAuthorisedROCDate: ""}
    this.COC_FDIODIAuthorisedCapitalArray.push(this.COC_FDIODIAuthorisedCapitaldata);}
    return true;
  }
  SelectCOC_FDINICCodeDes(items: any) {
  debugger;
 this.SelectCOC_FDINICCodeDesArray.push({Year:items.Year,Class:items.Class,DescriptionClass:items.DescriptionClass})
  }
  SelectCOC_FDIResCent(items: any) {
    debugger;
   this.SelectCOC_FDICenResArray.push({RegionalOffices:items.RegionalOffices,Address:items.Address})
    }
  onSelectAll(items: any) {
  
    console.log(items);
  }
  title = 'cimplyfema';

  filteredsubmodule: any;
  NICCodeSelect(selectedSubModule,val)
  {
    this.Submodule=selectedSubModule;
    this.SubmodulenameDes=val.filter(x =>x.id===Number(selectedSubModule.id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(selectedSubModule.id))[0].name;
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
  }
  TableATotAmount(data){
    debugger;
    if(this.TableATotAmountData==undefined && data.COC_FDIODITabAAmount!=''){this.TableATotAmountData = parseFloat(data.COC_FDIODITabAAmount);}
    else if(this.TableATotAmountData!=undefined){this.TableATotAmountData = this.TableATotAmountData + parseFloat(data.COC_FDIODITabAAmount);}
  };
  onModuleSelect(selectedModule) {
    debugger;
    
    this.SubmodulenameArray.length=0;
    //this.multiSelect.toggleSelectAll();
    if(selectedModule.id==1)
    {
    /* this.COC_FDIFormDiv=true; */}
    else{
    this.COC_FDIFormDiv=false;
    } 
    this.filteredsubmodule = this.submodules.filter(item => item.moduleid === Number(selectedModule.id));
  }

  onAllSubModuleSelect(items: any,val) {
    debugger
    for(let submod of val){
    for (let order of this.SubmodulenameArray) {
      if (order.Submodulename == submod.name) {
          this.SubmodulenameArray.splice(this.SubmodulenameArray.indexOf(order), 1);
      }      
     }
    }
    for(let i=0;i<items.length;i++){
    this.Submodule=items[i];
    this.SubmodulenameDes=val.filter(x =>x.id===Number(items[i].id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(items[i].id))[0].name;
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
    this.COC_FDIFemaRegNoArray.push({ COC_FDINatContname: this.Submodulename, COC_FDINatContDes: this.SubmodulenameDes});
    this.OpenFdiForm(items);
    }
  }
  OpenFdiForm(selectedModule){
    if(selectedModule.id==1)
    {
    this.COC_FDIFormDiv=true; }
    else{
    this.COC_FDIFormDiv=false;
    }
  }
  onItemDeSelect(item: any) {
    for (let order of this.SubmodulenameArray) {
      if (order.Submodulename == item.name) {
          this.SubmodulenameArray.splice(this.SubmodulenameArray.indexOf(order), 1);
      }      
     }
}
  onUnSelectAll() {
    debugger;
    this.SubmodulenameArray.length=0;
}
  onSubModuleSelect(selectedSubModule,val)
  {
    debugger;
    this.Submodule=selectedSubModule;
    this.SubmodulenameDes=val.filter(x =>x.id===Number(selectedSubModule.id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(selectedSubModule.id))[0].name;
    for (let order of this.SubmodulenameArray) {
      if (order.Submodulename == selectedSubModule.name) {
          this.SubmodulenameArray.splice(this.SubmodulenameArray.indexOf(order), 1);
      }      
     }
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
    this.COC_FDIFemaRegNoArray.push({ COC_FDINatContname: this.Submodulename, COC_FDINatContDes: this.SubmodulenameDes});
    //this.BackSubmissionArray.push({COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===selectedSubModule.name)[0].BackgroundB});
    this.OpenFdiForm(selectedSubModule);
  }
  CheckAgreeTerm(Val) {
    if(Val.currentTarget.checked==true){this.COC_FDIInstructionsButton=false;}
    else{this.COC_FDIInstructionsButton=true;}
    debugger;
  }
  RBI_FDISubmit(Val) {
debugger;
    this.COC_FDIInstructions=false;
    this.COC_FDIApplicantDetails=false;
    this.COC_FDIInstructionsButton=true;
    this.COC_FDICompoundingDetails=false;
    this.COC_FDICompoundingSubmissions=false;
    this.COC_FDIODIECB=false;
    this.COC_FDIOtherAnnexures=false;
    this.COC_FDIDocPreviewg=false;
    if(Val=='4'){
    this.BackSubmissionArray.length=0;
    this.DelayReasonsSubmissionArray.length=0;
    this.RegulatorySubmissionArray.length=0;
    this.PetitionRequestSubmissionArray.length=0;
    for(let Fema of  this.SubmodulenameArray){
      if(this.FemaRegulationsList.length>0){
    this.BackSubmissionArray.push({ COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].BackgroundA});
    this.BackSubmissionArray.push({ COC_FDI_Background:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].BackgroundB});
    this.DelayReasonsSubmissionArray.push({ COC_FDI_DelayReasons:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].DelayReasons});
    this.RegulatorySubmissionArray.push({ COC_FDI_Regulatory:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].RegulatoryFramework});
    this.PetitionRequestSubmissionArray.push({ COC_FDI_PetitionRequest:this.FemaRegulationsList.filter(x=>x.FEMARegulationNoSubtopics===Fema.Submodulename)[0].PetitionRequest});
    }};}
    if(Val=='1'){this.COC_FDIInstructions=true;}
    if(Val=='2'){this.COC_FDIApplicantDetails=true;};if(Val=='3'){this.COC_FDICompoundingDetails=true;};if(Val=='4'){this.COC_FDICompoundingSubmissions=true;};
    if(Val=='5'){this.COC_FDIODIECB=true;};if(Val=='7'){this.COC_FDIDocPreviewg=true;};if(Val=='6'){this.COC_FDIOtherAnnexures=true;};
    console.log(Val);
  }
  onSubmitCOCFrom() {
    debugger;
    const COC_FDINICCodeDesArray: FormArray = this.fb.array(this.SelectCOC_FDINICCodeDesArray);
    this.COC_FDIFormlist.setControl('SelectCOC_FDINICCodeDesDetails', COC_FDINICCodeDesArray);
    const COC_FDIFemaRegNoFormArray: FormArray = this.fb.array(this.COC_FDIFemaRegNoArray);
    this.COC_FDIFormlist.setControl('COC_FDIFemaRegNoDetails', COC_FDIFemaRegNoFormArray);
    const COC_FDICenResArray: FormArray = this.fb.array(this.SelectCOC_FDICenResArray);
    this.COC_FDIFormlist.setControl('SelectCOC_FDICenResDetails', COC_FDICenResArray);
    const BackgrantFormArray: FormArray = this.fb.array(this.BackSubmissionArray);
    this.COC_FDIFormlist.setControl('BackSubmissionDetails', BackgrantFormArray);
    const RegulFormArray: FormArray = this.fb.array(this.RegulatorySubmissionArray);
    this.COC_FDIFormlist.setControl('RegulatorySubmissionDetails', RegulFormArray);
    const DelayFormArray: FormArray = this.fb.array(this.DelayReasonsSubmissionArray);
    this.COC_FDIFormlist.setControl('DelayReasonsSubmissionDetails', DelayFormArray);
    const PetitionFormArray: FormArray = this.fb.array(this.PetitionRequestSubmissionArray);
    this.COC_FDIFormlist.setControl('PetitionRequestSubmissionDetails', PetitionFormArray);
    const TransmissFormArray: FormArray = this.fb.array(this.TransactionSubmissionArray);
    this.COC_FDIFormlist.setControl('TransactionSubmissionDetails', TransmissFormArray);
    const TabAFormArray: FormArray = this.fb.array(this.COC_FDIODITabAArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITabADetails', TabAFormArray);
    const TabBFormArray: FormArray = this.fb.array(this.COC_FDIODITableBArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITableBDetails', TabBFormArray);
    const TabCFormArray: FormArray = this.fb.array(this.COC_FDIODITableCArray);
    this.COC_FDIFormlist.setControl('COC_FDIODITableCDetails', TabCFormArray);
    
    const AuthCapFormArray: FormArray = this.fb.array(this.COC_FDIODIAuthorisedCapitalArray);
    this.COC_FDIFormlist.setControl('COC_FDIODIAuthorisedCapitalDetails', AuthCapFormArray);
    console.log(this.COC_FDIFormlist.value);
    if (this.COC_FDIFormlist.invalid) {
      for (const control of Object.keys(this.COC_FDIFormlist.controls)) {
        this.COC_FDIFormlist.controls[control].markAsTouched();
      }
      return;
    }
    else {
      return this.apiService.createFormcoc(this.COC_FDIFormlist.value).subscribe({
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
    var html = htmlToPdfmake(pdfTable.innerHTML,{tableAutoSize:false});
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }

  downloadAsPDF5() {
    
    const doc = new jsPDF();
    const pdfTable = this.pdfTable5.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML,{tableAutoSize:false});
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF6() {
    
    const doc = new jsPDF();
    const pdfTable = this.pdfTable6.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML,{tableAutoSize:false});
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  downloadAsPDF7() {
    
    const doc = new jsPDF();
    const pdfTable = this.pdfTable7.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML,{tableAutoSize:false});
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  async ExportWord1() {
    const pdfTable = this.pdfTable1.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
      
    });
    saveAs(converted, 'Covering.docx');
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
    saveAs(converted, 'Declaration.docx');
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
  async ExportWord6() {
    const pdfTable = this.pdfTable6.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Annexure.docx');
  }
  async ExportWord7() {
    const pdfTable = this.pdfTable7.nativeElement;

    var converted = await asBlob(pdfTable.innerHTML, {
      orientation: 'portrait',
      margins: { top: 720 },
    });
    saveAs(converted, 'Annexure.docx');
  }
}

