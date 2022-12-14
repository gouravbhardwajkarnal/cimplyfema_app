
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormFcComponent } from './components/ODI/form-fc/form-fc.component';
import { InstructionsComponent } from './Common/instructions/instructions.component';
import { FormAprComponent } from './components/ODI/form-apr/form-apr.component';
import { CommonService } from './service/common.service';
import { FormFcWosComponent } from './Partial_Components/form-fc-wos/form-fc-wos.component';
import { FormOpiComponent } from './components/ODI/form-opi/form-opi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { FormFcSdsComponent } from './Partial_Components/form-fc-sds/form-fc-sds.component';
import { FormFcDisinvestmentComponent } from './Partial_Components/form-fc-disinvestment/form-fc-disinvestment.component';
import { OpiPdfComponent } from './components/ODI/opi-pdf/opi-pdf.component';
import { EsopPdfComponent } from './components/FDI/esop-pdf/esop-pdf.component';
import { HomeComponent } from './components/home/home.component';
import { FormCocComponent } from './components/form-coc/form-coc.component';
import { FormCocFdiComponent } from './Partial_Components/form-coc-fdi/form-coc-fdi.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AprInstructionsComponent } from './Common/apr-instructions/apr-instructions.component';
import { FormEsopComponent } from './components/FDI/form-esop/form-esop.component';
import { FormFcgprComponent } from './components/FDI/form-fcgpr/form-fcgpr.component';

@NgModule({
  declarations: [
    AppComponent,
    FormEsopComponent,
    FormFcgprComponent,
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
    FormCocFdiComponent,
    AprInstructionsComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    NgSelectModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
