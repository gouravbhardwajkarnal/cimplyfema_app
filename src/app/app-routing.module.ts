import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormFcComponent } from './components/form-fc/form-fc.component';
import { FormEsopComponent } from './components/form-esop/form-esop.component';
import { FormOpiComponent } from './components/form-opi/form-opi.component';
import { FormAprComponent } from './components/form-apr/form-apr.component';
import { OpiPdfComponent } from './components/form-opi/opi-pdf/opi-pdf.component';
import { FormCocComponent } from './components/form-coc/form-coc.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  // { path: 'create-employee', component: EmployeeCreateComponent },
  // { path: 'edit-employee/:id', component: EmployeeEditComponent },
  // { path: 'employees-list', component: EmployeeListComponent },
  { path: 'form-fc',component: FormFcComponent},
  { path: 'form-esop', component: FormEsopComponent },
  { path: 'form-opi', component: FormOpiComponent },
  { path: 'form-apr', component: FormAprComponent },
  { path: 'opi-pdf', component: OpiPdfComponent },
  { path: 'form-coc', component: FormCocComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
