import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/service/api.service';
import { COC_FDI_DetailsList} from 'src/app/model/COCFdi.model';
type AOA = any[][];
@Component({
  selector: 'app-form-coc',
  templateUrl: './form-coc.component.html',
  styleUrls: ['./form-coc.component.css']
})
export class FormCocComponent implements OnInit {
  public COC_FDIFormlist: FormGroup;
  NICCodeselectedItems = [];
  selectedItems = [];
  CityList: any = [];
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
 COC_FDICompoundingDetails:boolean=false;
 COC_FDICompoundingSubmissions:boolean=false;
 COC_FDIODIECB:boolean=false;
 COC_FDIOtherAnnexures:boolean=false;
 COC_FDIDocPreviewg:boolean=false;
 COC_FDIFormDiv:boolean=false;
 firstFormGroup:FormGroup;
 secondFormGroup:FormGroup;
isLinear = false;
  constructor(private commonservice: CommonService,private fb: FormBuilder,private apiService: ApiService,) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
    this.readCity();
    this.readState();
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
  ngOnInit(): void { 
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
      COC_FDIPanNo: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
      COC_FDIFlatBuildingNumber: new FormControl('', Validators.required),
      COC_FDIFloorNumber: new FormControl('', Validators.required),
      COC_FDIPremisesBuilding: new FormControl('', Validators.required),
      COC_FDIRoadStreet: new FormControl('', Validators.required),
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
      

    })
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
  onModuleSelect(selectedModule) {
    
    if(selectedModule.id==1)
    {
    this.COC_FDIFormDiv=true;}
    else{
    this.COC_FDIFormDiv=false;
    }
    this.filteredsubmodule = this.submodules.filter(item => item.moduleid === Number(selectedModule.id));
  }
  onAllSubModuleSelect(items: any,val) {
  
    for(let i=0;i<items.length;i++){
    this.Submodule=items[i];
    this.SubmodulenameDes=val.filter(x =>x.id===Number(items[i].id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(items[i].id))[0].name;
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
    }
  }
  onSubModuleSelect(selectedSubModule,val)
  {
    this.Submodule=selectedSubModule;
    this.SubmodulenameDes=val.filter(x =>x.id===Number(selectedSubModule.id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(selectedSubModule.id))[0].name;
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
  }
  RBI_FDISubmit(Val) {

    this.COC_FDIInstructions=false;
    this.COC_FDIApplicantDetails=false;
    this.COC_FDICompoundingDetails=false;
    this.COC_FDICompoundingSubmissions=false;
    this.COC_FDIODIECB=false;
    this.COC_FDIOtherAnnexures=false;
    this.COC_FDIDocPreviewg=false;
    if(Val=='1'){this.COC_FDIInstructions=true;}
    if(Val=='2'){this.COC_FDIApplicantDetails=true;};if(Val=='3'){this.COC_FDICompoundingDetails=true;};if(Val=='4'){this.COC_FDICompoundingSubmissions=true;};
    if(Val=='5'){this.COC_FDIODIECB=true;};if(Val=='6'){this.COC_FDIDocPreviewg=true;};if(Val=='7'){this.COC_FDIOtherAnnexures=true;};
    console.log(Val);
  }
  
      
    Full_Name_Grantee:string;  
    Date_of_Issue:Date;  
    Number_ESOP_Granted:number;  
    Country:string;
    ResidentialStatus:string;
    SubsidiarySDS:number;
    Pre_determined_issue_price:number;
    Conversion_ratio1:string;
    Conversion_ratio:number;
    Equivalent_equity_shares:number;
    Facevalue_equity_shares:number;
    Value_of_Shares:number;
  
  GrantDetailsArray: Array<COC_FDI_DetailsList> = [];
  GrantDetailsdata:any={};
  deleteGrantData(index) {
    if (this.GrantDetailsArray.length == 1) {
      return false;
    } else {
      this.GrantDetailsArray.splice(index, 1);  
      return true;
    }
    
  }
  addGrantData() {
    this.GrantDetailsdata = { Full_Name_Grantee: "", Date_of_Issue: "",Number_ESOP_Granted:"",Country:"",ResidentialStatus: "",SubsidiarySDS:"",Pre_determined_issue_price:"",Conversion_ratio1: "1:",Conversion_ratio:"",Equivalent_equity_shares:"",Facevalue_equity_shares:"",Value_of_Shares:""}
    this.GrantDetailsArray.push(this.GrantDetailsdata);
    return true;
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
    // this.GrantDetailsArray=this.Exdata;
    console.log("data:",this.Exdata);
    for (var i = 1; i < this.Exdata.length; i++) {
      if(i>1)
      {
      this.addGrantData();
      }
             
    }
  };
  reader.readAsBinaryString(target.files[0]);
  evt.target.value=null;
}
}

