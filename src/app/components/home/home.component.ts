import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modules: any[];
  submodules: any[];
  module: string;
  Submodule: string;

  title = 'cimplyfema';
  filteredsubmodule: any;
  constructor(private commonservice: CommonService) {
    this.modules = commonservice.getAllmodules();
    this.submodules = commonservice.getAllsubmodules();
  }
  

  ngOnInit(): void {
  }
  onModuleSelect(selectedModule) {
    debugger;
    this.filteredsubmodule = this.submodules.filter(item => item.moduleid === Number(selectedModule));
  }
  onSubModuleSelect(selectedSubModule)
  {console.log(selectedSubModule);
    this.Submodule=selectedSubModule;

  }

}
