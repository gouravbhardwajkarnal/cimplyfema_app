import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form-coc-fdi',
  templateUrl: './form-coc-fdi.component.html',
  styleUrls: ['./form-coc-fdi.component.css']
})
export class FormCocFdiComponent implements OnInit {

  public COC_FDIForm: FormGroup;
  selectedItems = [];
  SubselectedItems = [];
  SubmodulenameArray = [];
  ModuleSettings:IDropdownSettings;
  SubModuleSettings:IDropdownSettings;
 modules: any[];
 submodules: any[];
 module: string;
 Submodule: string;
 Submodulename: string;
 SubmodulenameDes: string;
 COC_FDIFormDiv:boolean=false;
 COC_FDICoverLetter:boolean=true;
 COC_FDICompound:boolean=false;
 COC_FDISubmissions:boolean=false;
 COC_FDIDeclaration:boolean=false;
 COC_FDILetterauthority:boolean=false;
 COC_FDIUndertaking:boolean=false;
 COC_FDIECSLetter:boolean=false;
 COC_FDIPreviewAnnexures:boolean=false;
  constructor(private commonservice: CommonService,private fb: FormBuilder) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
    this.COC_FDIForm = this.fb.group({
      investment_name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)]
    })
   }   
  ngOnInit(): void { 
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
  }
  onSelectAll(items: any) {

    console.log(items);
  }
  title = 'cimplyfema';
  filteredsubmodule: any;
  onModuleSelect(selectedModule) {
  
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
 
    this.COC_FDICoverLetter=false;
    this.COC_FDICompound=false;
    this.COC_FDISubmissions=false;
    this.COC_FDIDeclaration=false;
    this.COC_FDILetterauthority=false;
    this.COC_FDIUndertaking=false;
    this.COC_FDIECSLetter=false;
    this.COC_FDIPreviewAnnexures=false;
    if(Val=='0'){this.COC_FDICoverLetter=true;}
    if(Val=='1'){this.COC_FDICompound=true;};if(Val=='2'){this.COC_FDISubmissions=true;};if(Val=='3'){this.COC_FDIDeclaration=true;};
    if(Val=='4'){this.COC_FDILetterauthority=true;};if(Val=='5'){this.COC_FDIUndertaking=true;};if(Val=='6'){this.COC_FDIECSLetter=true;};if(Val=='7'){this.COC_FDIPreviewAnnexures=true;}
    console.log(Val);
  }
}
