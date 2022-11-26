import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-form-coc',
  templateUrl: './form-coc.component.html',
  styleUrls: ['./form-coc.component.css']
})
export class FormCocComponent implements OnInit {
  constructor(private commonservice: CommonService) {
    this.modules = commonservice.getCOCmodules();
    this.submodules = commonservice.getCOCsubmodules();
   }
  modules: any[];
  submodules: any[];
  module: string;
  Submodule: string;
  ngOnInit(): void {
  }
  title = 'cimplyfema';
  filteredsubmodule: any;
  onModuleSelect(selectedModule) {
    debugger;
    this.filteredsubmodule = this.submodules.filter(item => item.moduleid === Number(selectedModule));
  }
  onSubModuleSelect(selectedSubModule)
  {console.log(selectedSubModule);
    this.Submodule=selectedSubModule;

  }

}
