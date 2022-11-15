import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { FormFcComponent } from './components/form-fc/form-fc.component';
import { FormEsopComponent } from './components/form-esop/form-esop.component';
<<<<<<< HEAD
import { FormOpiComponent } from './components/form-opi/form-opi.component';
=======
import { FormAprComponent } from './components/form-apr/form-apr.component';
>>>>>>> 2d96c0311f78b25816d6a69ecea5738d426dbbbc

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-employee' },
  { path: 'create-employee', component: EmployeeCreateComponent },
  { path: 'edit-employee/:id', component: EmployeeEditComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'form-fc',component: FormFcComponent},
  { path: 'form-esop', component: FormEsopComponent },
<<<<<<< HEAD
  { path: 'form-opi', component: FormOpiComponent },
  {
    path: 'books',
    component: FormFcComponent,
  },
  {
    path: 'cars',
    component: FormFcComponent
  },
  {
    path: 'chickens',
    component: FormFcComponent,
  },
=======
  { path: 'form-apr', component: FormAprComponent },
>>>>>>> 2d96c0311f78b25816d6a69ecea5738d426dbbbc
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
