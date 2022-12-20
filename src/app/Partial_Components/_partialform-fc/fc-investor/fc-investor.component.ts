import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { CONTROL_CONTAINER } from 'src/app/shared/control-container';

@Component({
  selector: 'app-fc-investor',
  templateUrl: './fc-investor.component.html',
  styleUrls: ['./fc-investor.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  // viewProviders: [CONTROL_CONTAINER]
})
export class FcInvestorComponent implements OnInit {

   @Input() investorForm: FormGroup
  // @Output() investordata: EventEmitter<number> = new EventEmitter()
  // @Input() investorForm: string
  form: FormGroup;
  constructor(private rootFormGroup: FormGroupDirective) { 
    
  }

  ngOnInit(): void {
    // this.form = this.rootFormGroup.control.get(this.investorForm) as FormGroup;
   
  }
  // next() {
  //   this.investordata.emit(this.investorForm.value)
  // }

}
