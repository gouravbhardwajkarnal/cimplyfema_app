import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ShareHoldingFEGrid } from 'src/app/model/gridmodel';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Iinvestment, IinvestmentSDS } from 'src/app/model/iinvestment';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CommonService } from 'src/app/service/common.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-form-apr',
  templateUrl: './form-apr.component.html',
  styleUrls: ['./form-apr.component.css']
})

export class FormAprComponent implements OnInit {
  public aprForm: FormGroup;
  investment_model: Iinvestment;  
  @ViewChild('tabset') tabset: TabsetComponent;
  ShareHoldingFEArray: Array<ShareHoldingFEGrid> = [];
  ShareHoldingFE: any = {};
  ShareHoldingFElength: number = 0;
  TotalPstake: number = 0;
  TotalFPstake: number = 0;
  Totalstake: number = 0;
  id: string = '0';
  btnShow: boolean;
  btnShowNext: boolean;
  // generatePDF() {  
  //   let docDefinition = {  
  //     content: [  
  //       {  
  //         text: 'ANNUAL PERFORMANCE REPORT (APR)',  
  //         fontSize: 16,  
  //         alignment: 'center',  
  //         color: '#047886' , 
  //       },
  //       {  
  //         text: 'Note:all amounts should be in actuals. All the figures should be in a single foreign currency(FCY)',  
  //         fontSize: 12,  
  //         alignment: 'left',  
  //         color: '#047886' , 
  //       },         
  //        {table: {  
  //          headerRows: 1,  
  //          widths: ['30%', '15%', '20%','15%','20%'],  
  //          body: [['I.APR for the period', 'From date',this.aprFormlist.value.APR_From_Date ,'To Date',this.aprFormlist.value.APR_tO_Date],],}},
  //         {table: {  
  //           headerRows: 1,  
  //           widths: ['60%', '40%'],  
  //           body: [['II.Unique Identification Number (UIN)', this.aprFormlist.value.Unique_Identification_Number],],}},
  //         {table: {  
  //           headerRows: 1,  
  //           widths: ['100%'],  
  //           body: [['III.Capital structure as on the last day of the accounting year of theforeign entity'],],}},
  //         {table: {  
  //           headerRows: 1,  
  //           widths: ['40%','30%','30%'],  
  //           body: [[{},'Amount','% share '],],}}   ,
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['40%','30%','30%'],  
  //             body: [['I.Indian',this.aprFormlist.value.Cap_Struct_Indian_Amount,this.aprFormlist.value.Cap_Struct_Indian_Share],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['40%','30%','30%'],  
  //             body: [['II.Foreign',this.aprFormlist.value.Cap_Struct_Foreign_Amount,this.aprFormlist.value.Cap_Struct_Foreign_Share],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['90%','10%'],  
  //             body: [['IV.Whether the Indian Entity (IE)/ Resident Individual (RI)/Trust/ Society has control in the foreign entity ',this.aprFormlist.value.IndianEntityResidentIndividualTrust],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['V.Change in the share holding pattern during the reporting year (Furnish the updated share holding pattern, if applicable, in the foreign entity)'],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','10%','10%','30%','10%'],  
  //             body: [[{},'Person resident in India','% Stake',{},'Foreign partner(s)', '% Stake'],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','10%','10%','30%','10%'],  
  //             body: [['(1)',this.aprFormlist.value.Person_resident_India_1,this.aprFormlist.value.Indian_Stake_1,'(1)',this.aprFormlist.value.Foreign_partner_1, this.aprFormlist.value.Foreign_Stake_1],],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['10%','30%','10%','10%','30%','10%'],  
  //               body: [['(2)',this.aprFormlist.value.Person_resident_India_2,this.aprFormlist.value.India_Stake_2,'(2)',this.aprFormlist.value.Foreign_partner_2, this.aprFormlist.value.Foreign_Stake_2],],}},
  //               {table: {  
  //                 headerRows: 1,  
  //                 widths: ['10%','30%','10%','10%','30%','10%'],  
  //                 body: [['(3)',this.aprFormlist.value.Person_resident_India_3,this.aprFormlist.value.India_Stake_3,'(3)',this.aprFormlist.value.Foreign_partner_3, this.aprFormlist.value.Foreign_Stake_3],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['VI.Financial Position of the foreign entity for the last two years'],],}},                                                  
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [[{},{},'Previous Year','Current Year'],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['I','Net Profit/(Loss)',this.aprFormlist.value.FP_NetProfit_Previous_Year, this.aprFormlist.value.FP_NetProfit_Current_Year],],}},                  
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['II','Dividend',this.aprFormlist.value.FP_Dividend_Previous_Year, this.aprFormlist.value.FP_Dividend_Current_Year],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['III','Net worth',this.aprFormlist.value.FP_Networth_Previous_Year, this.aprFormlist.value.FP_Networth_Current_Year],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['VII.Repatriation from the foreign entity'],],}},   
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [[{},{},'Previous Year','Since commencement of business'],],}},
  //         {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['I','Dividend',this.aprFormlist.value.Repat_Dividend_CurYear, this.aprFormlist.value.Repat_Dividend_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['II','Repayment of loan',this.aprFormlist.value.Repat_Repayment_CurYear, this.aprFormlist.value.Repat_Repayment_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['III','Non-Equity Exports Realised (in INR)  ',this.aprFormlist.value.Repat_EquityExport_CurYear, this.aprFormlist.value.Repat_EquityExport_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['IV','Royalties ',this.aprFormlist.value.Repat_Royalties_CurYear, this.aprFormlist.value.Repat_Royalties_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['V','Technical know-how Fees',this.aprFormlist.value.Repat_Technical_CurYear, this.aprFormlist.value.Repat_Technical_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['VI','Consultancy fees',this.aprFormlist.value.Repat_Consultancyfee_CurYear, this.aprFormlist.value.Repat_Consultancyfee_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['VII','Others (please specify)',this.aprFormlist.value.Repat_Others_CurYear, this.aprFormlist.value.Repat_Others_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['VIII','Profit',this.aprFormlist.value.Repat_Profit_CurYear, this.aprFormlist.value.Repat_Profit_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['IX','Retained earnings',this.aprFormlist.value.Repat_Retained_CurYear, this.aprFormlist.value.Repat_Retained_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],   
  //             body: [['X','FDI by foreign entity/ SDS into India',this.aprFormlist.value.Repat_FDIforeign_CurYear, this.aprFormlist.value.Repat_FDIforeign_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','30%','30%','30%'],  
  //             body: [['XI','Refund of excess share application money@Transaction No',this.aprFormlist.value.Repat_exces_sshare_CurYear, this.aprFormlist.value.Repat_exces_sshare_commencement],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['@ Furnish 15 / 17-digit transaction number allotted by Reserve Bank allotted at the time of reporting of remittance in the online OID application.'],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['VII.Furnish the details of acquisition or setting up or winding up or transfer of step-down subsidiary or subsidiaries of foreign entity during the reporting year in the format as provided, if applicable (attach separate sheet if the number of SDS is more than one).'],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','60%','35%',],  
  //             body: [['(I)','Name, level and country/jurisdiction name of SDS',this.aprFormlist.value.Furnish_jurisdiction_SDS],],}}, 
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','60%','35%',],  
  //             body: [['(II)','Name, level and country/jurisdictionname of the parent of SDS',this.aprFormlist.value.Furnish_jurisdiction_ParentSDS],],}}, 
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','65%','15%','15%'],  
  //             body: [['(III)','Investment amount and date of investment (if any)','Currency Amount','Date'],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','65%','15%','15%'],  
  //             body: [[{},{},this.aprFormlist.value.Furnish_Investment_Amount,this.aprFormlist.value.Furnish_Investment_Date],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','55%','40%'],  
  //             body: [['(iV)','Activity code as per 1987',this.aprFormlist.value.Furnish_ActivityCd_1987],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','55%','40%'],  
  //             body: [[{},'Activity code as per 2008',this.aprFormlist.value.Furnish_ActivityCd_2008],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','85%','10%'],  
  //             body: [['(V)','% Stake held in SDS',this.aprFormlist.value.Furnish_Stake_SDS],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','85%','10%'],  
  //             body: [['(VI)','Is the activity of SDS into financial services (tick)',this.aprFormlist.value.SDS_financial_services],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['5%','65%','30%'],  
  //             body: [['(VII)','Name, level and country/jurisdiction of SDS wound up during the reporting period, wherever applicable',this.aprFormlist.value.Furnish_jurisdiction_SDSwoundup],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['Declaration from Indian entity/ resident individual (Strike out whichever is not applicable)'],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [
  //               ['I/We the Indian entity/ resident individual (wherever applicable) further confirm that:'],
  //               ['(a).Acquisition/ setting up/ winding up/transfer of the SDS and changes in the shareholding pattern of the foreign entity since last APR have been reported as required in terms of Regulation 10(4)(c) of OI Regulations or corresponding extant Regulations in case where the reporting is being done under the earlier overseas investment framework** as stipulated by the Reserve Bank from time to time'],
  //               ['(b).The structure of SDS is in compliance with the structural requirements of the foreign entity as provided in OI Rules'],
  //               ['(c).We have received share certificate/s (or any other evidence of investment as per the applicable laws of the host jurisdiction) and submitted the same to the designated AD bank for verification within 6 months of making the remittance/s for all investments/ capitalization which are reckoned as ODI in the foreign entity under this UIN, as per Regulation 9 (1) of OI Regulations or corresponding extant Regulations in case where the reporting is being done under the earlier overseas investment framework** as stipulated by the Reserve Bank from time to time.'],
  //               ['(d).The previous APRs for the foreign entity under this UIN, have been filed'],
  //               ['(e).Repatriated to India, all dues receivable from the foreign entity under this UIN, as required under Regulation 9 (4) of OI Regulations or corresponding extant Regulations in case where the reporting is being done under the earlier overseas investment framework** as stipulated by the Reserve Bank from time to time'],
  //               ['(f).I/ We hereby certify that the information furnished above are true and correct. I/We also duly '],
  //               ['acknowledge that if any information furnished by me/us is found to be false and/or incorrect, it shall be construed that the reporting requirements under FEMA, 1999 have not been complied with.']
  //           ],}},
  //           {table: {  
  //             headerRows: 1,  
  //             widths: ['40%','40%','20%'],  
  //             body: [
  //               ['Signature of the authorized official of the IE approved by the Board/ RI',this.aprFormlist.value.authorized_official_Signature,'Seal/Stamp'],
  //               ['Name & Designation of the Authorized Official of the IE/ RI ',this.aprFormlist.value.authorized_official_NameDesignation,this.aprFormlist.value.authorized_official_Stamp]
  //           ],}},
  //           {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','40%','10%','40%'],  
  //             body: [
  //               ['Place',this.aprFormlist.value.authorized_official_Place,'Date',this.aprFormlist.value.authorized_official_To_Date],                 
  //           ],}},
  //           {table: {  
  //             headerRows: 1,  
  //             widths: ['10%','40%','10%','40%'],  
  //             body: [['Telephone No',this.aprFormlist.value.authorized_official_Telephone,'Email',this.aprFormlist.value.authorized_official_Email],],}},
  //             {table: {  
  //             headerRows: 1,  
  //             widths: ['100%'],  
  //             body: [['Certificate of the Statutory Auditor (in case of Indian entity) / Chartered Accountant in case of resident individuals (strike out whichever is not applicable)'],],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['100%'],  
  //               body: [
  //                 ['We hereby certify that:'], 
  //                 ['i.APR for the year ended _______is prepared on the basis of audited/ unaudited balance sheet of the foreign entity for the year ended _________.  '], 
  //                 ['ii.APR for the year ended _______is prepared on the basis of unaudited balance sheet of the foreign entity since audit is not mandatory in host country/jurisdiction and the IE/RI does not have ‘control’ in the foreign entity in compliance with explanation (a) to Regulation 10(4) of Foreign Exchange Management (Overseas Investment) Regulations, 2022.'], 
  //                 ['iii.The IE/RI repatriated to India, all dues receivable from the foreign entity under this UIN, as required under Regulation 9 (4) of Foreign Exchange Management (Overseas Investment) Regulations, 2022 or corresponding extant Regulations in case where the reporting is being done under the earlier overseas investment framework** as stipulated by the Reserve Bank from time to time, and it has been verified from the Foreign Inward Remittance Certificate issued by the AD bank/s. ']                             
  //             ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['40%','40%','20%'],  
  //               body: [
  //                 ['Signature of the Statutory Auditors /Chartered Accountant',this.aprFormlist.value.Signature_Statutory_Auditors,'Seal/Stamp'],
  //                 ['Name of the audit firm, Registration number and UDIN',this.aprFormlist.value.Name_Audit_Firm_UDIN,this.aprFormlist.value.Statutory_Auditors_Stamp]
  //             ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['10%','40%','10%','40%'],  
  //               body: [
  //                 ['Place',this.aprFormlist.value.Statutory_Auditors_Place,'Date',this.aprFormlist.value.Statutory_Auditors_Date],                 
  //             ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['20%','80%'],  
  //               body: [['Email',this.aprFormlist.value.Statutory_Auditors_Email],],}},
  //               {table: {  
  //               headerRows: 1,  
  //               widths: ['100%'],  
  //               body: [['Certificate by the Authorized Dealer bank'],],}},
  //                {table: {  
  //               headerRows: 1,  
  //               widths: ['100%'],  
  //               body: [
  //                 ['i.In terms of Regulation 9 (1) of OI Regulations, the AD Bank has received the share certificate/s or any other document as evidence of investment as per the applicable laws of the host jurisdiction and we are satisfied about the bonafides of the documents so received'],
  //                 ['ii.The duly filled in Form (Annual Performance Report) was submitted by the Indian entity/resident individual on ___________ day of ___________ (month) ________________________ (year).'],
  //                 ['iii.All the previous year APRs submitted by the(Name of theIndian entity/ resident individual) have been reported in the online OID application']
  //               ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['40%','40%','20%'],  
  //               body: [
  //                 ['Signature of the Authorized Official of the AD bank',{},'Seal/Stamp'],
  //                 ['Name and designation of the AD bank official',{},{}]
  //             ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['10%','40%','10%','40%'],  
  //               body: [
  //                 ['Place',{},'Date',{}],                 
  //             ],}},
  //             {table: {  
  //               headerRows: 1,  
  //               widths: ['100%'],  
  //               body: [
  //                 ['Instructions for filling up the Annual Performance Report (APR)'],  
  //                 ['1) A person resident in India acquiring equity capital in a foreign entity which is reckoned as ODI, shall submit an APR with respect to each foreign entity every year till the person resident in India is invested in such foreign entity, by December 31st and where the accounting year of the foreign entity ends on December 31st, the APR shall be submitted by December 31st of the next year'],               
  //                 ['2) The APRs shall not be submitted in the following cases'],
  //                 ['(i)If a person resident in India is holding less than 10 per cent of the equity capital without control in the foreign entity and there is no other financial commitment other than by way of equity capital.'],
  //                 ['(ii)When the foreign entity is under liquidation, from the date of initiation of the liquidation process. '],
  //                 ['(iii)For the broken period (i.e. full year not completed) at the time of disinvestment. However, the details of transactions if any that had been undertaken during the time from the date of submission of the last APR till the date of disinvestment/initiation of liquidation process may be duly reported in the Form FC'],
  //                 ['3) The APR shall be based on the audited financial statements of the foreign entity. Where the person resident in India does not have ‘control’ in the foreign entity and the laws of the host jurisdiction does not provide for mandatory auditing of the books of accounts, the APR may be submitted based on unaudited financial statements certified as such by the statutory auditor of the Indian entity or by a chartered accountant where the statutory audit is not applicableincluding in case of resident individuals.'],
  //                 ['4)	In case more than one person resident in India have made ODI in the same foreign entity, the person resident in India holding the highest stake in the foreign entity shall be required to submit APR. In case of holdings being equal, APR may be filed jointly by such persons resident in India. It is also clarified that where APR is required to be filed jointly, either one investor may be authorized by other investors, or such persons may jointly file the APR.'],
  //                 ['5)	The person resident in India shall report the details regarding acquisition/ setting up /winding up/ transfer of an SDS or alteration in the shareholding pattern in the foreign entity during the reporting year in the APR, failing which it shall amount to non-submission of APR.'],
  //                 ['6)	The person resident in India shall ensure that all the previous year APRs have been submitted to the designated AD bank'],
  //                 ['7)	Capital structure (para III of form APR) should be in cumulative and the % stake should be a total of all the persons resident in India in the foreign entity '],  
  //                 ['8)	In Para VII the figures under “since commencement of business” should be equal to or more than the figure mentioned under current year.'],               
  //                 ['9)	In Para VII (ii), Redemption of preference shares (not in the nature of compulsorily convertible preference shares (CCPS)) should also be reported. '],
  //                 ['10)	In Para VII (vii), other receipts which are not mentioned in the table like interest on loan or license fee etc. shall be mentioned. '],
  //                 ['11)	In Para IX, the part of the profits of the foreign entity which is retained and reinvested in such foreign entity shall be mentioned. The retained earnings are to be calculated as per the procedure laid down by the International Monetary Fund in the latest version of their publication “Balance of Payments and International Investment Position Manual”. It is to be noted that the negative retained earnings is to be treated as ‘0’ (zero).'],
  //                 ['12)	The level of step-down subsidiary (SDS) shall be calculated treating the foreign entity as the parent. So, an SDS directly under the foreign entity should be treated as first level SDS. Accordingly, an SDS under the first level SDS would be treated as second level SDS and so on and so forth. '],
  //                 ['13)	In case of ParaXII, the structure of SDS should be in compliance with the structural requirements of the foreign entity i.e the structure of such subsidiary/SDS shall also have limited liability where the foreign entity’s core activity is not in strategic sector. The investee entities of the foreign entity where such foreign entity does not have control may not be treated as SDSs and therefore may not be reported.'],
  //                 ['14)	In case of Para XII (vi), if the SDS is engaged in the activity of financial services, the investment shall be in compliance to the provisions contained in Para 2 of Schedule I of OI rules.'],
  //                 ['15)	The activity code as per NIC 1987 and NIC 2008 shall be furnished.'],
  //                 ['16)	The date may be mentioned in format DD/MM/YYYY format'],
  //                 ['17)	The name of the foreign currency (FCY) shall be indicated as per SWIFT code '],
  //                 ['18)	Each page of the Form FC should be duly signed and stamped with date by the person resident in India submitting the same'],
  //                 ['19)	All amounts of foreign currency (FCY) and Indian Rupees (INR) should be in actuals only. ']
  //             ],}}

  //         ],};  

  //   pdfMake.createPdf(docDefinition).open();  
  // }  
  // aprFormlist:FormGroup
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder,private commonservice: CommonService) {
    this.investment_model = {} as Iinvestment;
    this.sdstypes = commonservice.getAllsdstypes();
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.sdsleveltypes = commonservice.getAllsdsleveltypes();
    this.aprForm = this.fb.group({
      APR_From_Date: ['', Validators.required],
      APR_To_Date: ['', Validators.required],
      APR_UIN: ['', Validators.required, Validators.maxLength(20), Validators.minLength(10)],
      APR_Indian_Amount: ['', Validators.required],
      APR_Indian_Share: ['', Validators.required],
      APR_Foreign_Amount: ['', Validators.required],
      APR_Foreign_Share: ['', Validators.required],
      APR_FE_Control: ['', Validators.required],
      APR_Profit_Current: ['', Validators.required],
      APR_Profit_Last: ['', Validators.required],
      APR_Dividend_Current: ['', Validators.required],
      APR_Dividend_Last: ['', Validators.required],
      APR_Worth_Current: ['', Validators.required],
      APR_Worth_Last: ['', Validators.required],
      APR_Dividend_CurYear: ['', Validators.required],
      APR_Dividend_commencement: ['', Validators.required],
      APR_Repayment_CurYear: ['', Validators.required],
      APR_Repayment_commencement: ['', Validators.required],
      APR_EquityExport_CurYear: ['', Validators.required],
      APR_EquityExport_commencement: ['', Validators.required],
      APR_Royalties_CurYear: ['', Validators.required],
      APR_Royalties_commencement: ['', Validators.required],
      APR_Technical_CurYear: ['', Validators.required],
      APR_Technical_commencement: ['', Validators.required],
      APR_Consultancyfee_CurYear: ['', Validators.required],
      APR_Consultancyfee_commencement: ['', Validators.required],
      APR_Others_CurYear: ['', Validators.required],
      APR_Others_commencement: ['', Validators.required],
      APR_Profit_CurYear: ['', Validators.required],
      APR_Profit_commencement: ['', Validators.required],
      APR_Retained_CurYear: ['', Validators.required],
      APR_Retained_commencement: ['', Validators.required],
      APR_FDIforeign_CurYear: ['', Validators.required],
      APR_FDIforeign_commencement: ['', Validators.required],
      APR_exces_sshare_CurYear: ['', Validators.required],
      APR_exces_sshare_commencement: ['', Validators.required],
      APR_Dec_A: ['', Validators.required],
      APR_Dec_B: ['', Validators.required],
      APR_Dec_C: ['', Validators.required],
      APR_Dec_D: ['', Validators.required],
      APR_Dec_E: ['', Validators.required],
      APR_Authorized_Signature: ['', Validators.required, Validators.minLength(5), Validators.maxLength(250)],
      APR_Authorized_NameDes: ['', Validators.required, Validators.minLength(5), Validators.maxLength(250)],
      APR_Dec_Place: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      APR_Dec_Date: ['', Validators.required],
      APR_Dec_Telephone: ['', Validators.required, Validators.minLength(10), Validators.maxLength(250)],
      APR_Dec_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      APR_Dec_Stamp: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],

    });
  }
  Indianshare: number = 0;
  Foreignshare: number = 0;
  sdstypes: DisinvetmentType[];
  Jurisdictiontypes: DisinvetmentType[];
  sdsleveltypes: DisinvetmentType[];
  SDSArray: Array<IinvestmentSDS> = [];
  SDS: any = {};
  SDSlength: number = 0;
  CapitalstructureFE() {
    debugger
    let indian = this.aprForm.value.APR_Indian_Amount;
    let foreign = this.aprForm.value.APR_Foreign_Amount;
    let total = indian + foreign;
    this.Indianshare = indian * 100 / total;
    this.Foreignshare = foreign * 100 / total;
    this.aprForm.get("APR_Indian_Share").patchValue(this.Indianshare.toFixed(2));
    this.aprForm.get("APR_Foreign_Share").patchValue(this.Foreignshare.toFixed(2));
  }

  ngOnInit(): void {
    this.SDS = {  investment_SDS_Name: "",
    investment_SDS_Level: "",
    investment_SDS_Jurisdiction: "",
    investment_SDS_ParentName: "",
    investment_SDS_ParentLevel: "",
    investment_SDS_ParentJurisdiction: "",
    investment_SDS_InvestmentAmount: "",
    investment_SDS_InvestmentDate: "", 
    investment_SDS_LEI: "",
    investment_SDS_Type: "", 
    investment_SDS_1987NIC: "", 
    investment_SDS_2008NIC: "", 
    investment_SDS_Stake: ""}
  this.SDSArray.push(this.SDS);
  this.SDSlength = this.SDSArray.length;
    this.btnShow = false;
    this.btnShowNext = true;
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;
    // this.aprFormlist=new FormGroup(
    //   {
    //     'APR_From_Date':new FormControl('',Validators.required),
    //     'APR_tO_Date':new FormControl('',Validators.required),
    //     'Unique_Identification_Number':new FormControl('',Validators.required),
    //     'Cap_Struct_Indian_Amount':new FormControl('',Validators.required),
    //     'Cap_Struct_Indian_Share':new FormControl('0',Validators.required),
    //     'Cap_Struct_Foreign_Amount':new FormControl('',Validators.required),             
    //     'Cap_Struct_Foreign_Share':new FormControl('0',Validators.required),
    //     'IndianEntityResidentIndividualTrust':new FormControl('',Validators.required),
    //     'Person_resident_India_1':new FormControl('',Validators.required),
    //     'Indian_Stake_1':new FormControl('',Validators.required),       
    //     'Foreign_partner_1':new FormControl('',Validators.required),
    //     'Foreign_Stake_1':new FormControl('',Validators.required),
    //     'Person_resident_India_2':new FormControl('',Validators.required),
    //     'India_Stake_2':new FormControl('',Validators.required),
    //     'Foreign_partner_2':new FormControl('',Validators.required),
    //     'Foreign_Stake_2':new FormControl('',Validators.required),
    //     'Person_resident_India_3':new FormControl('',Validators.required),
    //     'India_Stake_3':new FormControl('',Validators.required),
    //     'Foreign_partner_3':new FormControl('',Validators.required),
    //     'Foreign_Stake_3':new FormControl('',Validators.required),
    //     'FP_NetProfit_Previous_Year':new FormControl('',Validators.required),
    //     'FP_NetProfit_Current_Year':new FormControl('',Validators.required),
    //     'FP_Dividend_Previous_Year':new FormControl('',Validators.required),
    //     'FP_Dividend_Current_Year':new FormControl('',Validators.required),
    //     'FP_Networth_Previous_Year':new FormControl('',Validators.required),
    //     'FP_Networth_Current_Year':new FormControl('',Validators.required),
    //     'Repat_Dividend_CurYear':new FormControl('',Validators.required),
    //     'Repat_Dividend_commencement':new FormControl('',Validators.required),
    //     'Repat_Repayment_CurYear':new FormControl('',Validators.required),
    //     'Repat_Repayment_commencement':new FormControl('',Validators.required),
    //     'Repat_EquityExport_CurYear':new FormControl('',Validators.required),
    //     'Repat_EquityExport_commencement':new FormControl('',Validators.required),
    //     'Repat_Royalties_CurYear':new FormControl('',Validators.required),
    //     'Repat_Royalties_commencement':new FormControl('',Validators.required),
    //     'Repat_Technical_CurYear':new FormControl('',Validators.required),
    //     'Repat_Technical_commencement':new FormControl('',Validators.required),
    //     'Repat_Consultancyfee_CurYear':new FormControl('',Validators.required),
    //     'Repat_Consultancyfee_commencement':new FormControl('',Validators.required),
    //     'Repat_Others_CurYear':new FormControl('',Validators.required),
    //     'Repat_Others_commencement':new FormControl('',Validators.required),
    //     'Repat_Profit_CurYear':new FormControl('',Validators.required),
    //     'Repat_Profit_commencement':new FormControl('',Validators.required),
    //     'Repat_Retained_CurYear':new FormControl('',Validators.required),
    //     'Repat_Retained_commencement':new FormControl('',Validators.required),
    //     'Repat_FDIforeign_CurYear':new FormControl('',Validators.required),
    //     'Repat_FDIforeign_commencement':new FormControl('',Validators.required),
    //     'Repat_exces_sshare_CurYear':new FormControl('',Validators.required),
    //     'Repat_exces_sshare_commencement':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_SDS':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_ParentSDS':new FormControl('',Validators.required),
    //     'Furnish_Investment_Amount':new FormControl('',Validators.required),
    //     'Furnish_Investment_Date':new FormControl('',Validators.required),
    //     'Furnish_ActivityCd_1987':new FormControl('',Validators.required),
    //     'Furnish_ActivityCd_2008':new FormControl('',Validators.required),
    //     'Furnish_Stake_SDS':new FormControl('',Validators.required),
    //     'SDS_financial_services':new FormControl('',Validators.required),
    //     'Furnish_jurisdiction_SDSwoundup':new FormControl('',Validators.required),
    //     'authorized_official_Signature':new FormControl('',Validators.required),
    //     'authorized_official_NameDesignation':new FormControl('',Validators.required),
    //     'authorized_official_Place':new FormControl('',Validators.required),
    //     'authorized_official_To_Date':new FormControl('',Validators.required),
    //     'authorized_official_Telephone':new FormControl('',Validators.required),
    //     'authorized_official_Email':new FormControl('',Validators.required,),
    //     'authorized_official_Stamp':new FormControl('',Validators.required),
    //     'Signature_Statutory_Auditors':new FormControl('',Validators.required),
    //     'Name_Audit_Firm_UDIN':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Place':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Date':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Email':new FormControl('',Validators.required),
    //     'Statutory_Auditors_Stamp':new FormControl('',Validators.required),  
    //     'APR_A':new FormControl('',Validators.required),
    //     'APR_B': new FormControl('',Validators.required),
    //     'APR_C':new FormControl('',Validators.required),
    //     'APR_D':new FormControl('',Validators.required),
    //     'APR_E':new FormControl('',Validators.required),
    //     'APR_F':new FormControl('',Validators.required),
    //     'APR_G':new FormControl('',Validators.required),   
    //   }
    // )
  }
  addShareHoldingFE() {
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;
    this.TotalPstake = 0;
    this.TotalFPstake = 0;
    this.Totalstake = 0;
    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake += element.FPstake;
      this.Totalstake += element.Total;

    });
    return true;
  }

  deleteShareHoldingFE(index) {
    if (this.ShareHoldingFEArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.ShareHoldingFEArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row'); 
      this.TotalPstake = 0;
      this.TotalFPstake = 0;
      this.Totalstake = 0;
      this.ShareHoldingFEArray.forEach(element => {
        this.TotalPstake += element.Pstake;
        this.TotalFPstake += element.FPstake;
        this.Totalstake += element.Total;
      });
      return true;
    }
  }
  onBlur(values) {
    console.log(values);
    values.Total = values.FPstake + values.Pstake;
    this.TotalPstake = 0;
    this.TotalFPstake = 0;
    this.Totalstake = 0;
    this.ShareHoldingFEArray.forEach(element => {
      this.TotalPstake += element.Pstake;
      this.TotalFPstake += element.FPstake;
      this.Totalstake += element.Total;
    });
  }
  onSubmitAPRFrom() {
    debugger;
    console.log(this.SDSArray);
    if (this.aprForm.invalid) {
      for (const control of Object.keys(this.aprForm.controls)) {
        this.aprForm.controls[control].markAsTouched();
      }
      return;
    }  
    else{

      const ShareHoldingFE:FormArray=this.fb.array(this.ShareHoldingFEArray);
      this.aprForm.setControl('ShareHoldingFE', ShareHoldingFE);
      const SDSArray:FormArray=this.fb.array(this.SDSArray);
      this.aprForm.setControl('SDSArray', SDSArray);
      // this.aprForm.setControl('SDSDetails', this.fb.array(this.investment_model.investment_SDSModel || []));
      return this.apiService.createFormAPR(this.aprForm.value).subscribe({
        complete: () => {
          alert('FromAPR successfully created!');
          // this.generatePDF();
          console.log('FromAPR successfully created!');
            //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    // console.log(this.aprFormlist);

  }
  get APR_From_Date() {
    return this.aprForm.get('APR_From_Date')!;
  }
  get APR_To_Date() {
    return this.aprForm.get('APR_To_Date')!;
  }
  get APR_UIN() {
    return this.aprForm.get('APR_UIN')!;
  }
  get APR_Indian_Amount() {
    return this.aprForm.get('APR_Indian_Amount')!;
  }
  get APR_Indian_Share() {
    return this.aprForm.get('APR_Indian_Share')!;
  }
  get APR_Foreign_Amount() {
    return this.aprForm.get('APR_Foreign_Amount')!;
  }
  get APR_Foreign_Share() {
    return this.aprForm.get('APR_Foreign_Share')!;
  }
  get APR_FE_Control() {
    return this.aprForm.get('APR_FE_Control')!;
  }
  get APR_Profit_Current() {
    return this.aprForm.get('APR_Profit_Current')!;
  }
  get APR_Profit_Last() {
    return this.aprForm.get('APR_Profit_Last')!;
  }

  get APR_Dividend_Current() {
    return this.aprForm.get('APR_Dividend_Current')!;
  }
  get APR_Dividend_Last() {
    return this.aprForm.get('APR_Dividend_Last')!;
  }

  get APR_Worth_Current() {
    return this.aprForm.get('APR_Worth_Current')!;
  }
  get APR_Worth_Last() {
    return this.aprForm.get('APR_Worth_Last')!;
  }
  get APR_Dividend_CurYear() {
    return this.aprForm.get('APR_Dividend_CurYear')!;
  }
  get APR_Dividend_commencement() {
    return this.aprForm.get('APR_Dividend_commencement')!;
  }
  get APR_Repayment_CurYear() {
    return this.aprForm.get('APR_Repayment_CurYear')!;
  }
  get APR_Repayment_commencement() {
    return this.aprForm.get('APR_Repayment_commencement')!;
  }
  get APR_EquityExport_CurYear() {
    return this.aprForm.get('APR_EquityExport_CurYear')!;
  }
  get APR_EquityExport_commencement() {
    return this.aprForm.get('APR_EquityExport_commencement')!;
  }
  get APR_Royalties_CurYear() {
    return this.aprForm.get('APR_Royalties_CurYear')!;
  }
  get APR_Royalties_commencement() {
    return this.aprForm.get('APR_Royalties_commencement')!;
  }
  get APR_Technical_CurYear() {
    return this.aprForm.get('APR_Technical_CurYear')!;
  }
  get APR_Technical_commencement() {
    return this.aprForm.get('APR_Technical_commencement')!;
  }
  get APR_Consultancyfee_CurYear() {
    return this.aprForm.get('APR_Consultancyfee_CurYear')!;
  }
  get APR_Consultancyfee_commencement() {
    return this.aprForm.get('APR_Consultancyfee_commencement')!;
  }
  get APR_Others_CurYear() {
    return this.aprForm.get('APR_Others_CurYear')!;
  }
  get APR_Others_commencement() {
    return this.aprForm.get('APR_Others_commencement')!;
  }
  get APR_Profit_CurYear() {
    return this.aprForm.get('APR_Profit_CurYear')!;
  }
  get APR_Profit_commencement() {
    return this.aprForm.get('APR_Profit_commencement')!;
  }
  get APR_Retained_CurYear() {
    return this.aprForm.get('APR_Retained_CurYear')!;
  }
  get APR_Retained_commencement() {
    return this.aprForm.get('APR_Retained_commencement')!;
  }
  get APR_FDIforeign_CurYear() {
    return this.aprForm.get('APR_FDIforeign_CurYear')!;
  }
  get APR_FDIforeign_commencement() {
    return this.aprForm.get('APR_FDIforeign_commencement')!;
  }
  get APR_exces_sshare_CurYear() {
    return this.aprForm.get('APR_exces_sshare_CurYear')!;
  }
  get APR_exces_sshare_commencement() {
    return this.aprForm.get('APR_exces_sshare_commencement')!;
  }

  get APR_Dec_A() {
    return this.aprForm.get('APR_Dec_A')!;
  }
  get APR_Dec_B() {
    return this.aprForm.get('APR_Dec_B')!;
  }
  get APR_Dec_C() {
    return this.aprForm.get('APR_Dec_C')!;
  }
  get APR_Dec_D() {
    return this.aprForm.get('APR_Dec_D')!;
  }
  get APR_Dec_E() {
    return this.aprForm.get('APR_Dec_E')!;
  }

  get APR_Authorized_Signature() {
    return this.aprForm.get('APR_Authorized_Signature')!;
  }
  get APR_Authorized_NameDes() {
    return this.aprForm.get('APR_Authorized_NameDes')!;
  }
  get APR_Dec_Place() {
    return this.aprForm.get('APR_Dec_Place')!;
  }
  get APR_Dec_Date() {
    return this.aprForm.get('APR_Dec_Date')!;
  }
  get APR_Dec_Telephone() {
    return this.aprForm.get('APR_Dec_Telephone')!;
  }
  get APR_Dec_Email() {
    return this.aprForm.get('APR_Dec_Email')!;
  }
  get APR_Dec_Stamp() {
    return this.aprForm.get('APR_Dec_Stamp')!;
  }
  addSDS() {
    this.SDS = {  
      investment_SDS_Name: "",
      investment_SDS_Level: "",
      investment_SDS_Jurisdiction: "",
      investment_SDS_ParentName: "",
      investment_SDS_ParentLevel: "",
      investment_SDS_ParentJurisdiction: "",
      investment_SDS_InvestmentAmount: "",
      investment_SDS_InvestmentDate: "", 
      investment_SDS_LEI: "",
      investment_SDS_Type: "", 
      investment_SDS_1987NIC: "", 
      investment_SDS_2008NIC: "", 
      investment_SDS_Stake: ""};
    this.SDSArray.push(this.SDS)
    console.log(this.SDSArray);
    this.SDSlength = this.SDSArray.length;
    return true;
  }
  deleteSDS(index) {
    if (this.SDSArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.SDSArray.splice(index, 1);
      this.SDSlength = this.SDSArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
    
  }
  updatePrev() {
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    if (Number(this.id) - 1 >= 0) {
      this.tabset.tabs.filter(tab => Number(tab.id) == (Number(this.id)) - 1)
      this.tabset.tabs[(Number(this.id)) - 1].active = true;
      if (Number(this.id) - 1 == 0) {
        this.btnShow = false;
      }
    }
    if (Number(this.id) <= 5) {
      this.btnShowNext = true;
    }
  }

  updateNext() {
    let count = this.tabset.tabs.length;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;

    if (Number(this.id) + 1 < count) {
      this.tabset.tabs.filter(tab => Number(tab.id) == (Number(this.id)) + 1)
      this.tabset.tabs[(Number(this.id)) + 1].active = true;
      this.btnShow = true;
    }
    if (Number(this.id) + 1 == 5) {
      this.btnShowNext = false;
    }
  }
}
