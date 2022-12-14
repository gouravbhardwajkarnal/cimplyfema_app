import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormFcComponent } from './components/ODI/form-fc/form-fc.component';
import { FormEsopComponent } from './components/FDI/form-esop/form-esop.component';
import { FormFcgprComponent } from './components/FDI/form-fcgpr/form-fcgpr.component';
import { FormOpiComponent } from './components/ODI/form-opi/form-opi.component';
import { FormAprComponent } from './components/ODI/form-apr/form-apr.component';
import { OpiPdfComponent } from './components/ODI/opi-pdf/opi-pdf.component';
import { FormCocComponent } from './components/form-coc/form-coc.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'form-fc',component: FormFcComponent},
  { path: 'form-esop', component: FormEsopComponent },
  { path: 'form-fcgpr', component: FormFcgprComponent },
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
