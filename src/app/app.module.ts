import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormEsopComponent } from './components/form-esop/form-esop.component';
import { FormFcComponent } from './components/form-fc/form-fc.component';
import { InstructionsComponent } from './Common/instructions/instructions.component';
import { FormAprComponent } from './components/form-apr/form-apr.component';
import { CommonService } from './service/common.service';
import { FormFcWosComponent } from './Partial_Components/form-fc-wos/form-fc-wos.component';
import { FormOpiComponent } from './components/form-opi/form-opi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { FormFcSdsComponent } from './Partial_Components/form-fc-sds/form-fc-sds.component';
import { FormFcDisinvestmentComponent } from './Partial_Components/form-fc-disinvestment/form-fc-disinvestment.component';
import { OpiPdfComponent } from './components/form-opi/opi-pdf/opi-pdf.component';
import { EsopPdfComponent } from './components/form-esop/esop-pdf/esop-pdf.component';
import { HomeComponent } from './components/home/home.component';
import { FormCocComponent } from './components/form-coc/form-coc.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    FormEsopComponent,
    FormFcComponent,
    InstructionsComponent,
    FormAprComponent,
    FormFcWosComponent,
    FormOpiComponent,
    FormFcSdsComponent,
    FormFcDisinvestmentComponent,
    OpiPdfComponent,
    EsopPdfComponent,
    HomeComponent,
    FormCocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule.forRoot()
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
