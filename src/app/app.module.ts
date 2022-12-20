
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import {ToastrModule} from 'ngx-toastr';
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
import { FormNiccodesComponent } from './Partial_Components/form-niccodes/form-niccodes.component';
import { UtilService } from './service/util.service';
import { FcInvestorComponent } from './Partial_Components/_partialform-fc/fc-investor/fc-investor.component';
import { FCFormService } from './service/formfc.service';
schemas:[NO_ERRORS_SCHEMA]

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
    AprInstructionsComponent,
    FormNiccodesComponent,
    FcInvestorComponent
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
    NgSelectModule,
    ToastrModule.forRoot(),
  ],
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  providers: [CommonService,UtilService,FCFormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
