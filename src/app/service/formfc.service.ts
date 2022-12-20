import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms'
// import { FCForm } from '../components/_fcmodels/fc-form.model'
// import { FCModel } from '../components/_fcmodels/fc-form'
// import { investorForm } from '../components/_fcmodels/Investor-form'
// import { investorModel } from '../components/_fcmodels/fcInvestor-model'

@Injectable()
export class FCFormService {
//   private fcForm: BehaviorSubject<
//     FormGroup | undefined
//   > = new BehaviorSubject(this.fb.group(new FCForm(new FCModel())))
//   fcForm$: Observable<FormGroup> = this.fcForm.asObservable()

  constructor(private fb: FormBuilder) {}

//   addData() {
//     const currentitem = this.fcForm.getValue()
//     const investors = currentitem.get('investordetails') as FormArray

//     investors.push(
//       this.fb.group(
//         new investorForm(new investorModel())
//       )
//     )

//     this.fcForm.next(currentitem)
//   }
//   investordata() {
//     const currentitem = this.fcForm.getValue()
//     const investors = currentitem.get('investordetails') as FormArray

//     investors.push(
//       this.fb.group(
//         new investorForm(new investorModel())
//       )
//     )

//     this.fcForm.next(currentitem)
//   }


//   deletePlayer(i: number) {
//     const currentTeam = this.teamForm.getValue()
//     const currentPlayers = currentTeam.get('players') as FormArray

//     currentPlayers.removeAt(i)

//     this.teamForm.next(currentTeam)
//   }
}
