import { Component, OnInit ,ViewChild} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-form-opi',
  templateUrl: './form-opi.component.html',
  styleUrls: ['./form-opi.component.css']
})
export class FormOpiComponent implements OnInit {

  @ViewChild('tabset') tabset: TabsetComponent;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    console.log(this.tabset.tabs);
  }

  NextTab(id)
  {
    this.tabset.tabs[id].active = true;
  } 
 
    
}
