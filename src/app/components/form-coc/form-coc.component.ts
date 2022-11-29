import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { GrantDetailsList} from 'src/app/model/Fdi.model';
type AOA = any[][];
@Component({
  selector: 'app-form-coc',
  templateUrl: './form-coc.component.html',
  styleUrls: ['./form-coc.component.css']
})
export class FormCocComponent implements OnInit {
  public COC_FDIForm: FormGroup;
  NICCodeselectedItems = [];
  selectedItems = [];
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
  constructor(private commonservice: CommonService,private fb: FormBuilder) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
    this.COC_FDIForm = this.fb.group({
      investment_name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)]
    })
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
  }
 
  onSelectAll(items: any) {
    debugger;
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
    debugger;
    if(selectedModule.id==1)
    {
    this.COC_FDIFormDiv=true;}
    else{
    this.COC_FDIFormDiv=false;
    }
    this.filteredsubmodule = this.submodules.filter(item => item.moduleid === Number(selectedModule.id));
  }
  onSubModuleSelect(selectedSubModule,val)
  {
    this.Submodule=selectedSubModule;
    this.SubmodulenameDes=val.filter(x =>x.id===Number(selectedSubModule.id))[0].Description;
    this.Submodulename= val.filter(x =>x.id===Number(selectedSubModule.id))[0].name;
    this.SubmodulenameArray.push({ Submodulename: this.Submodulename, SubmodulenameDes: this.SubmodulenameDes});
  }
  RBI_FDISubmit(Val) {
    debugger; 
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
  
  GrantDetailsArray: Array<GrantDetailsList> = [];
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
    console.log("data:",this.Exdata);
    for (var i = 1; i < this.Exdata.length; i++) {
      if(i>1)
      {
      this.addGrantData();
      }
             this.GrantDetailsArray[i-1].Full_Name_Grantee=this.Exdata[i][0];
             this.GrantDetailsArray[i-1].Date_of_Issue= this.Exdata[i][1];
             this.GrantDetailsArray[i-1].Number_ESOP_Granted= this.Exdata[i][2];
             this.GrantDetailsArray[i-1].Country= this.Exdata[i][3];
             this.GrantDetailsArray[i-1].ResidentialStatus= this.Exdata[i][4];
             this.GrantDetailsArray[i-1].SubsidiarySDS= this.Exdata[i][5];
             this.GrantDetailsArray[i-1].Pre_determined_issue_price= this.Exdata[i][6];
/*              this.GrantDetailsArray[i].Conversion_ratio1= this.Exdata[i+1][7]; */
             this.GrantDetailsArray[i-1].Conversion_ratio= this.Exdata[i][7];
             this.GrantDetailsArray[i-1].Equivalent_equity_shares= this.Exdata[i][8];
             this.GrantDetailsArray[i-1].Facevalue_equity_shares= this.Exdata[i][9];
             this.GrantDetailsArray[i-1].Value_of_Shares= this.Exdata[i][10];
    }
  };
  reader.readAsBinaryString(target.files[0]);
  evt.target.value=null;
}
}

