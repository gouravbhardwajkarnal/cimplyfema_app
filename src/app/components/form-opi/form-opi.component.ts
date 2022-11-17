import { Component, OnInit ,ViewChild} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-form-opi',
  templateUrl: './form-opi.component.html',
  styleUrls: ['./form-opi.component.css']
})
export class FormOpiComponent implements OnInit {
  OpiFormlist:FormGroup
  @ViewChild('tabset') tabset: TabsetComponent;
  constructor(private readonly route: ActivatedRoute,private apiService: ApiService) {

   }

  ngOnInit(): void {
    this.OpiFormlist=new FormGroup(
      {
        'OPI_Sec_A_Name':new FormControl('',Validators.required),
        'OPI_Sec_A_LEI':new FormControl('',Validators.required),
        'OPI_Sec_A_PAN':new FormControl('',Validators.required),
        'OPI_Sec_A_Address':new FormControl('',Validators.required),
        'OPI_Sec_A_City':new FormControl('',Validators.required),
        'OPI_Sec_A_State':new FormControl('',Validators.required),
        'OPI_Sec_A_PIN':new FormControl('',Validators.required),
        'OPI_Sec_A_NetINR':new FormControl('',Validators.required),
        'WhetherIElist':new FormControl('',Validators.required),

        
      }
    )
  }
  WhetherIElist=[
    {id:'1',Type:'Yes'},
    {id:'2',Type:'No'}
  ]

  

  ngAfterViewInit(){
    console.log(this.tabset.tabs);
  }

  NextTab(id)
  {
    this.tabset.tabs[id].active = true;
  } 
 
    
}
