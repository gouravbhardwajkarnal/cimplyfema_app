import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iinvestment, IinvestmentSDS, IinvestmentWOS } from 'src/app/model/iinvestment';
import { ApiService } from 'src/app/service/api.service';
import { CodeClassGrid, DynamicGrid, FCDisinvestmentGrid, FinancialCommitmentGrid, PEFEntityGrid, ShareHoldingFEGrid, SumFCGrid } from 'src/app/model/gridmodel';
import { DisinvetmentType } from 'src/app/model/common.model';
import { CommonService } from "src/app/service/common.service";
import { Subscription } from 'rxjs';
import { FCFormService } from 'src/app/service/formfc.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-form-fc',
  templateUrl: './form-fc.component.html',
  styleUrls: ['./form-fc.component.css']
})
export class FormFcComponent implements OnInit {
  CountryList: any = [];
  disinvetmenttype: DisinvetmentType[];
  id: string = '0';
  CityList: any = [];
  basicCityList: any = [];
  basicStateList: any = [];
  // reactiveForm!: FormGroup;
  public reactiveForm: FormGroup;
  btnShow: boolean;
  btnShowNext: boolean;
  investment_model: Iinvestment;
  @Input() name: string;
  @ViewChild('tabset') tabset: TabsetComponent;
  dynamicArray: Array<DynamicGrid> = [];
  sumFCArray: Array<SumFCGrid> = [];
  FCDisinvestmentArray: Array<FCDisinvestmentGrid> = [];
  PEFEntityArray: Array<PEFEntityGrid> = [];
  CodeClassArray: Array<CodeClassGrid> = [];
  ShareHoldingFEArray: Array<ShareHoldingFEGrid> = [];
  ShareHoldingFE: any = {};
  ShareHoldingFElength: number = 0;
  BankList: any = [];
  codeClass: any = {};
  codeClasslength: number = 0;
  TotalPstake: number = 0;
  TotalFPstake: number = 0;
  Totalstake: number = 0;

  sumFC: any = {};
  sumFClength: number = 0;
  FCDisinvestment: any = {};
  FCDisinvestmentlength: number = 0;
  PEFEntity: any = {};
  PEFEntitylength: number = 0;
  fcFormlist: FormGroup
  investorForm: FormGroup
  fcFormlistSub: Subscription
  formInvalid: boolean = false;
  investordetails: FormArray
  dataModel: any = {};
  NICCodeListShow: any = [];
  NICCodeListShowWOS: any = [];
  
  NICCodeList: any = [];
  NICCodeListWOS: any = [];
  SelectFC_FDINICCodeDesArray: any = [];
  WOSFC_FDINICCodeDesArray: any = [];
  ActiveTab: number = 1987;
  // investment_model: IinvestmentWOS;
  Jurisdictiontypes: DisinvetmentType[];
  accountingtypes: DisinvetmentType[];
  invetmentsCategorytypes: DisinvetmentType[];
  model: IinvestmentSDS;
  sdstypes: DisinvetmentType[];
  sdsleveltypes: DisinvetmentType[];
  SDSArray: Array<IinvestmentSDS> = [];
  SDS: any = {};
  SDSlength: number = 0;
  FinancialCommitmentArray: Array<FinancialCommitmentGrid> = [];
  FinancialCommitment: any = {};
  FinancialCommitmentlength: number = 0;
  constructor(private readonly route: ActivatedRoute, private apiService: ApiService,
    private commonservice: CommonService, private fb: FormBuilder, private fcformService: FCFormService) {
    this.btnShowNext = true;
    this.readBank();
    this.readNICCodeDes();
    this.readCountry();
    this.sdstypes = commonservice.getAllsdstypes();
    this.sdsleveltypes = commonservice.getAllsdsleveltypes();
    this.fcFormlist = this.fb.group({
      investment_UIN: ['', Validators.required],
      investment_Route: ['', Validators.required],
      investment_USD: ['', Validators.required],
      investment_INR: ['', Validators.required],
      FC_SDS_Control: new FormControl('', Validators.required),
      investorForm: new FormGroup({
        'investor_CIN': new FormControl('', Validators.required),
        'investor_name': new FormControl('', Validators.required),
        'investor_pan': new FormControl('', Validators.required),
        'investor_LEI': new FormControl('', Validators.required),
        'investor_GroupIE': new FormControl('', Validators.required),
        'investor_Address': new FormControl('', Validators.required),
        'investor_State': new FormControl('', Validators.required),
        'investor_City': new FormControl('', Validators.required),
        'investor_Pin': new FormControl('', Validators.required),
        'investor_ContactPerson': new FormControl('', Validators.required),
        'investor_CPDesignation': new FormControl('', Validators.required),
        'investor_TelephoneNumber': new FormControl('', Validators.required),
        'investor_Mobile': new FormControl('', Validators.required),
        'investor_Email': new FormControl('', Validators.required),
        'investor_NetworthAmount': new FormControl('', Validators.required),
        'investor_NetworthDate': new FormControl('', Validators.required),
      }),
      JVWOSform: new FormGroup({
      'investment_ForeignEntity': new FormControl('', Validators.required),
      'investment_Jurisdiction': new FormControl('', Validators.required),
      'investment_DateIncorpation': new FormControl('', Validators.required),
      'investment_WOS_LEI': new FormControl('', Validators.required),
      'investment_ControlFE': new FormControl('', Validators.required),
      'investment_AccountingYear': new FormControl('', Validators.required),
      'investment_WOS_Email': new FormControl('', Validators.required),
      })

      // investment_Individual_Place: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Individual_Date: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Individual_Stamp: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Individual_Telephone: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Individual_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Signature: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Place: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Date: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Stamp: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Telephone: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_Group_Email: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
      // investment_individual_A: ['', Validators.required],
      // investment_individual_B: ['', Validators.required],
      // investment_individual_C: ['', Validators.required],
      // investment_individual_D: ['', Validators.required],
      // investment_individual_E: ['', Validators.required],
      // investment_individual_F: ['', Validators.required],
      // investment_individual_G: ['', Validators.required],

      // disinvestment_UIN: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
    });
    this.readCity();
    this.readState();
    // this.investment_model = {} as IinvestmentWOS;
    this.Jurisdictiontypes = commonservice.getAllJurisdictiontypes();
    this.accountingtypes=commonservice.getAllaccountingtypes();
    this.invetmentsCategorytypes=commonservice.getAllinvetmentsCategorytypes();
    // const control = <FormArray>this.fcFormlist.controls['investorform'];

    // control.push(this.fb.group({
    //   investment_name: ['', Validators.required, Validators.minLength(1), Validators.maxLength(250)],
    //   investment_pan: ['', Validators.required, Validators.maxLength(10), Validators.minLength(1)],
    //   investment_LEI: ['', Validators.required, Validators.maxLength(250), Validators.minLength(1)],
    // }));

    //});
    this.setForm();
    this.disinvetmenttype = commonservice.getAllDisinvestmentTypes();
    console.log(this.disinvetmenttype);
    this.investment_model = {} as Iinvestment;
    // this.fcFormlistSub = this.fcformService.fcForm$
    //   .subscribe(form => {
    //       this.fcFormlist = form
    //       this.investordetails = this.fcFormlist.get('investordetails') as FormArray
    //     })
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
    this.ShareHoldingFE = { Person: "", Pstake: 0, ForeignPartner: "", FPstake: 0, Total: 0 };
    this.ShareHoldingFEArray.push(this.ShareHoldingFE);
    this.ShareHoldingFElength = this.ShareHoldingFEArray.length;

    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    this.codeClasslength = this.CodeClassArray.length;
    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    this.sumFClength = this.sumFCArray.length;
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    this.PEFEntitylength = this.PEFEntityArray.length;
    // this.codeClass = { Description1987: "", Description2008: "" };
    // this.CodeClassArray.push(this.codeClass);
    // this.codeClasslength = this.CodeClassArray.length;
    this.FinancialCommitment = { InvestSource: "", CategoryType: "",Date:"",AmountFCY:"",AmountINR: ""}
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
    // this.reactiveForm = new FormGroup({

    //   investment_LEI: new FormControl(this.investment_model.investment_LEI, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //     // emailValidator(),
    //   ]),
    //   investment_pin: new FormControl(this.investment_model.investment_pin, [
    //     Validators.required,
    //     Validators.minLength(6),
    //     Validators.maxLength(6),
    //   ]),
    //   investment_Address: new FormControl(this.investment_model.investment_Address, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_City: new FormControl(this.investment_model.investment_City, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_GroupIE: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_ContactPerson: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_CPDesignation: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_TelephoneNumber: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_MobileNumber: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_Email: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_NetWorth: new FormControl(this.investment_model.investment_GroupIE, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_AmountINR: new FormControl(this.investment_model.investment_AmountINR, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),
    //   investment_NetWorthDate: new FormControl(this.investment_model.investment_NetWorthDate, [
    //     Validators.required,
    //     Validators.minLength(1),
    //     Validators.maxLength(250),
    //   ]),


    // });
  }
  readCountry() {
    this.apiService.getCountry().subscribe((data) => {
      this.CountryList = data;
      console.log(this.CountryList);
    });
  }
  SelectFC_FDINICCodeDes(item: any) {
    debugger;
    console.log(item)
    let itemExist = this.SelectFC_FDINICCodeDesArray.findIndex(nicCode => nicCode.Class === item.Class);
    if (item.SelectedValue == true) {
      this.NICCodeListShow.forEach(function(checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
          item.SelectedValue = false
        }
      })
      this.SelectFC_FDINICCodeDesArray.splice(itemExist, 1)
    }
    else {
      this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass ,SelectedValue:true})
      this.NICCodeListShow.forEach(function(checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
        }
      
      })
    }
  }
  SelectWOSFC_FDINICCodeDes(item: any) {
    debugger;
    console.log(item)
    let itemExist = this.WOSFC_FDINICCodeDesArray.findIndex(nicCode => nicCode.Class === item.Class);
    if (item.SelectedValue == true) {
      this.NICCodeListShowWOS.forEach(function(checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
          item.SelectedValue = false
        }
      })
      this.WOSFC_FDINICCodeDesArray.splice(itemExist, 1)
    }
    else {
      this.WOSFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass ,SelectedValue:true})
      this.NICCodeListShowWOS.forEach(function(checkbox) {
        if (checkbox.Class !== item.Class) {
          checkbox.status = !checkbox.status;
        }
        if (checkbox.Class == item.Class) {
          checkbox.SelectedValue = true;
        }
      
      })
    }
  }
  readNICCodeDes() {

    this.apiService.getNICCodeDes().subscribe((Nicdata) => { this.NICCodeList = Nicdata; });
    this.apiService.getNICCodeDes().subscribe((Nicdata) => { this.NICCodeListWOS = Nicdata; });
    // this.NICCodeList=this.NICCodeList.map((item)=>{
    //   item.status=false
    // // })
    // console.log('hiii',this.NICCodeList)
  }
  OnModuleTabClick(year: any) {
    debugger;
    console.log(this.NICCodeList)
    this.NICCodeListShow = this.NICCodeList.filter(x => x.Year == year)
    this.ActiveTab = year
  }
  OnModuleTabClickWOS(year: any) {
    debugger;
    console.log(this.NICCodeList)
    this.NICCodeListShowWOS= this.NICCodeListWOS.filter(x => x.Year == year)
    this.ActiveTab = year
  }
  searchNicCode(event: any,code?:any) {
    debugger;
    console.log(typeof event.target.value)
    this.NICCodeListShow = this.NICCodeList.filter((x) => {
      if (x.Year == this.ActiveTab && String(x.Class).includes(event.target.value)) {
        return x
      }
    })
  }
  searchNicCodeWOS(event: any,code?:any) {
    debugger;
    console.log(typeof event.target.value)
    this.NICCodeListShowWOS = this.NICCodeListWOS.filter((x) => {
      if (x.Year == this.ActiveTab && String(x.Class).includes(event.target.value)) {
        return x
      }
    })
  }
  SelectAllNicCodes(event: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.NICCodeListShow.map((item) => {
        item.status = true
        this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass })
      })
    }
    else {
      this.SelectFC_FDINICCodeDesArray = []
    }
  }
  SelectAllNicCodesWOS(event: any) {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.NICCodeListShowWOS.map((item) => {
        item.status = true
        this.SelectFC_FDINICCodeDesArray.push({ Year: item.Year, Class: item.Class, DescriptionClass: item.DescriptionClass })
      })
    }
    else {
      this.SelectFC_FDINICCodeDesArray = []
    }
  }
  readState() {
    this.apiService.getState().subscribe((data) => {
      this.basicStateList = data;
    });
  }
  readCity() {
    this.apiService.getCity().subscribe((data) => {
      this.basicCityList = data;
    });
  }
  readBank() {
    this.apiService.getBank().subscribe((data) => {
      this.BankList = data;
      console.log(this.BankList);
    });
  }
  ngOnDestroy() {
    this.fcFormlistSub.unsubscribe()
  }
  GetCityStateValue(value, field) {
    if (value != undefined) {
      // if (field == 'OPI_Sec_A_State') {
      //   this.OpiFormlist.value.basicform.OPI_Sec_A_State = value.State;
      // }
      // if (field == 'OPI_Sec_A_City') {
      //   this.OpiFormlist.value.basicform.OPI_Sec_A_City = value.city;

      //   (<FormGroup>this.OpiFormlist.controls['SectionC']).controls['OPI_Sec_C_Place'].patchValue(value.city);

      // }
      // if (field == 'OPI_Sec_B_City') {
      //   this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_City = value.city;
      //   (<FormGroup>this.OpiFormlist.controls['SectionC']).controls['OPI_Sec_C_Place'].patchValue(value.city);
      // }
      // if (field == 'OPI_Sec_B_State') {
      //   this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_State = value.State;
      // }
      // if (field == 'OPI_Sec_B_VCF_State') {
      //   this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_State = value.State;
      // }
      // if (field == 'OPI_Sec_B_VCF_City') {
      //   this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_City = value.city;
      // }
    }
  }
  updatePrev() {
    debugger;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    let count = this.tabset.tabs.length;
    if (Number(this.id) >= 0) {
      this.tabset.tabs[(Number(this.id)) - 1].disabled = false;
      this.tabset.tabs[(Number(this.id)) - 1].active = true;
      this.btnShow=true;
    }
    else
    {
      this.btnShow=false;
    }
    // if (Number(this.id) - 1 >= 0) {
    //   this.tabset.tabs.filter(tab => Number(tab.id) == (Number(this.id)) - 1)
    //   if (Number(this.id) != 3) {
    //     if (Number(this.typeshow) <= 3) {
    //       this.tabset.tabs[(Number(this.id)) - 1].disabled = false;
    //       this.tabset.tabs[(Number(this.id)) - 1].active = true;
    //     }
    //   }
    //   if (Number(this.typeshow) <= 3 && (Number(this.id) == 3 || Number(this.id) == 2)) {
    //     this.tabset.tabs[(Number(this.id)) - 2].disabled = false;
    //     this.tabset.tabs[(Number(this.id)) - 2].active = true;
    //   }
    //   else if (Number(this.typeshow) > 3) {
    //     this.tabset.tabs[(Number(this.id)) - 2].disabled = true;
    //     if (Number(this.id) == 3 || Number(this.id) == 4) {
    //       this.tabset.tabs[(Number(this.id)) - 1].disabled = false;
    //       this.tabset.tabs[(Number(this.id)) - 1].active = true;
    //     }
    //     else if (Number(this.id) == 2) {
    //       this.tabset.tabs[(Number(this.id)) - 2].disabled = false;
    //       this.tabset.tabs[(Number(this.id)) - 2].active = true;
    //     }
    //   }
    //   if (Number(this.id) - 1 == 0) {
    //     this.btnShow = false;
    //     this.tabset.tabs[(Number(this.id))].disabled = true;
    //   }
    //   if (Number(this.id) == 3 || Number(this.id) == 4) {
    //     this.btnShowNext = true;
    //     this.btnShow = true;
    //   }
    // }
  }
  updateNext() {
    debugger;
    this.id = this.tabset.tabs.filter(tab => tab.active == true)[0].id;
    let count = this.tabset.tabs.length;
    if (Number(this.id) >= 0) {
      this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
      this.tabset.tabs[(Number(this.id)) + 1].active = true;
      this.btnShow=true;
    }
    if (Number(this.id) >= 0) {
      if (this.fcFormlist.controls["investorForm"].invalid) {
        this.fcFormlist.controls["investorForm"].markAllAsTouched();
        return;
        //}
      }
    }
    
    // if (Number(this.typeshow) == 1) {
    //   if (this.OpiFormlist.controls["IndianEntitysform"].invalid) {
    //     this.OpiFormlist.controls["IndianEntitysform"].markAllAsTouched();
    //     return;
    //   }
    // }
    // else if (Number(this.typeshow) == 2) {
    //   if (this.OpiFormlist.controls["MutualFundform"].invalid) {
    //     this.OpiFormlist.controls["MutualFundform"].markAllAsTouched();
    //     return;
    //   }
    // }
    // else if (Number(this.typeshow) == 3) {

    //   if (this.OpiFormlist.controls["ResidentIndividualform"].invalid) {
    //     this.OpiFormlist.controls["ResidentIndividualform"].markAllAsTouched();
    //     return;
    //   }
    // }

    // if (Number(this.typeshow) <= 3) {
    //   if (Number(this.id) <= 2 && Number(this.id) != 0) {
    //     this.tabset.tabs[(Number(this.id)) + 2].disabled = false;
    //     this.tabset.tabs[(Number(this.id)) + 2].active = true;

    //   }
    //   else if (Number(this.id) <= 2) {
    //     this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
    //     this.tabset.tabs[(Number(this.id)) + 1].active = true;
    //     this.tabset.tabs[(Number(this.id)) + 2].disabled = true;
    //   }

    // else {
    //   if (this.OpiFormlist.controls["VCFAIFform"].invalid) {
    //     this.OpiFormlist.controls["VCFAIFform"].markAllAsTouched();
    //     return;
    //   }
    //   if (Number(this.typeshow) > 3) {
    //     if (Number(this.id) > 0) {
    //       this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
    //       this.tabset.tabs[(Number(this.id)) + 1].active = true;
    //       if (Number(this.id) + 1 == 4) {
    //         this.btnShowNext = false;
    //       }
    //     }
    //     else {
    //       this.tabset.tabs[(Number(this.id)) + 1].disabled = true;
    //       this.tabset.tabs[(Number(this.id)) + 2].disabled = false;
    //       this.tabset.tabs[(Number(this.id)) + 2].active = true;
    //     }
    //   }
    // }

    // if (Number(this.id) == 3) {
    //   this.tabset.tabs[(Number(this.id)) + 1].disabled = false;
    //   this.tabset.tabs[(Number(this.id)) + 1].active = true;
    // }
    // if (Number(this.id) + 1 == 4 || Number(this.id) == 4) {
    //   this.btnShowNext = false;
    //   this.btnShow = true;
    // }
    // else {
    //   this.btnShow = true;
    // }


  }
  setForm() {
    // var today = new Date();
    // this.fcFormlist = this.fb.group({
    //   basicform: new FormGroup({
    //     'investment_UIN': new FormControl('', Validators.required),
    //     'investment_Route': new FormControl('', Validators.required),
    //     'investment_USD': new FormControl('', Validators.required),
    //     'investment_INR': new FormControl('', Validators.required)
    //   }),
    //   investorform: new FormGroup({
    //     'investment_UIN': new FormControl('', Validators.required),
    //     'investment_Route': new FormControl('', Validators.required),
    //     'investment_USD': new FormControl('', Validators.required),
    //     'investment_INR': new FormControl('', Validators.required),
    //     'OPI_Sec_A_LEI': new FormControl('', Validators.required),
    //     'OPI_Sec_A_PAN': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$')]),
    //     'OPI_Sec_A_Address': new FormControl('', Validators.required),
    //     'OPI_Sec_A_City': new FormControl('', Validators.required),
    //     'OPI_Sec_A_State': new FormControl('', Validators.required),
    //     'OPI_Sec_A_PIN': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{6}"), Validators.minLength(6),
    //     Validators.maxLength(6)]),
    //     'OPI_Sec_A_NetINR': new FormControl('', Validators.required),
    //     'OPI_Sec_A_AsOn_Date': new FormControl('', Validators.required),
    //     'WhetherIElist': new FormControl('', Validators.required),
    //     'OPI_Sec_A_ContactPersonName': new FormControl('', Validators.required),
    //     'OPI_Sec_A_ContactPersonDesignation': new FormControl('', Validators.required),
    //     'OPI_Sec_A_Mobile': new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}"), Validators.minLength(10),
    //     Validators.maxLength(10)])
    //   //   'OPI_Sec_A_EmailId': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
    //   }),
    // })
  }
  addPEFEntity() {
    this.PEFEntity = { NameFE: "", UIN: "", BankName: "" }
    this.PEFEntityArray.push(this.PEFEntity);
    console.log(this.PEFEntityArray);
    this.PEFEntitylength = this.PEFEntityArray.length;
    return true;
  }
  deletePEFEntity(index) {
    if (this.PEFEntityArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.PEFEntityArray.splice(index, 1);
      this.PEFEntitylength = this.PEFEntityArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addFCDisinvestment() {
    this.FCDisinvestment = { DisinvestmentType: "", FromDate: "", ToDate: "", Name: "" }
    this.FCDisinvestmentArray.push(this.FCDisinvestment);
    console.log(this.FCDisinvestmentArray);
    this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
    return true;
  }
  deleteFCDisinvestment(index) {
    if (this.FCDisinvestmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FCDisinvestmentArray.splice(index, 1);
      this.FCDisinvestmentlength = this.FCDisinvestmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  addsumFC() {

    this.sumFC = { EntityName: "", FCY: "", INR: "" }
    this.sumFCArray.push(this.sumFC);
    console.log(this.sumFCArray);
    this.sumFClength = this.sumFCArray.length;
    return true;
  }
  deletesumFC(index) {
    if (this.sumFCArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.sumFCArray.splice(index, 1);
      this.sumFClength = this.sumFCArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }

  }
  // addCodeClassRow() {
  //   this.codeClass = { Description1987: "", Description2008: "" };
  //   this.CodeClassArray.push(this.codeClass);
  //   this.codeClasslength = this.CodeClassArray.length;

  //   return true;
  // }
  // deleteCodeClassRow(index) {
  //   if (this.CodeClassArray.length == 1) {
  //     //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
  //     return false;
  //   } else {
  //     this.CodeClassArray.splice(index, 1);
  //     //this.toastr.warning('Row deleted successfully', 'Delete row');  
  //     return true;
  //   }
  // }
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
  public validate(): void {

    this.investment_model = this.reactiveForm.value;
    this.investment_model.investment_SumFC = this.sumFCArray;
    this.investment_model.investment_FCDisinvestment = this.FCDisinvestmentArray;
    this.investment_model.investment_PEFEntity = this.PEFEntityArray;
    this.investment_model.investment_ActivityCode = this.CodeClassArray;
    this.investment_model.investment_ShareHoldingFE = this.ShareHoldingFEArray;
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }


    console.log(this.investment_model);
  }

  get investment_UIN() {
    return this.fcFormlist.get('fcFormlist')!;
  }
  get investment_Route() {
    return this.fcFormlist.get('investment_Route')!;
  }
  get investment_USD() {
    return this.fcFormlist.get('investment_USD')!;
  }
  get investment_INR() {
    return this.fcFormlist.get('investment_INR')!;
  }
  get investment_name() {
    return this.reactiveForm.get('investment_name')!;
  }
  get investment_pan() {
    return this.reactiveForm.get('investment_pan')!;
  }
  get investment_LEI() {
    return this.reactiveForm.get('investment_LEI')!;
  }
  get investment_pin() {
    return this.reactiveForm.get('investment_pin')!;
  }
  get investment_Address() {
    return this.reactiveForm.get('investment_Address')!;
  }
  get investment_City() {
    return this.reactiveForm.get('investment_City')!;
  }
  get investment_CPDesignation() {
    return this.reactiveForm.get('investment_CPDesignation')!;
  }
  get investment_ContactPerson() {
    return this.reactiveForm.get('investment_ContactPerson')!;
  }
  get investment_TelephoneNumber() {
    return this.reactiveForm.get('investment_GroupIE')!;
  }
  get investment_MobileNumber() {
    return this.reactiveForm.get('investment_MobileNumber')!;
  }
  get investment_Email() {
    return this.reactiveForm.get('investment_Email')!;
  }
  get investment_GroupIE() {
    return this.reactiveForm.get('investment_GroupIE')!;
  }
  get investment_NetWorth() {
    return this.reactiveForm.get('investment_NetWorth');
  }
  get investment_AmountINR() {
    return this.reactiveForm.get('investment_AmountINR');
  }
  get investment_NetWorthDate() {
    return this.reactiveForm.get('investment_NetWorthDate');
  }
  get investment_Individual_Place() {
    return this.reactiveForm.get('investment_Individual_Place');
  }
  get investment_Individual_Date() {
    return this.reactiveForm.get('investment_Individual_Date');
  }
  get investment_Individual_Stamp() {
    return this.reactiveForm.get('investment_Individual_Stamp');
  }
  get investment_Individual_Telephone() {
    return this.reactiveForm.get('investment_Individual_Telephone');
  }
  get investment_Individual_Email() {
    return this.reactiveForm.get('investment_Individual_Email');
  }
  get investment_Group_Signature() {
    return this.reactiveForm.get('investment_Group_Signature');
  }
  get investment_Group_Name() {
    return this.reactiveForm.get('investment_Group_Name');
  }
  get investment_Group_Place() {
    return this.reactiveForm.get('investment_Group_Place');
  }
  get investment_Group_Date() {
    return this.reactiveForm.get('investment_Group_Date');
  }
  get investment_Group_Stamp() {
    return this.reactiveForm.get('investment_Group_Stamp');
  }
  get investment_Group_Telephone() {
    return this.reactiveForm.get('investment_Group_Telephone');
  }
  get investment_Group_Email() {
    return this.reactiveForm.get('investment_Group_Email');
  }
  get investment_individual_A() {
    return this.reactiveForm.get('investment_individual_A');
  }
  get investment_individual_B() {
    return this.reactiveForm.get('investment_individual_B');
  }
  get investment_individual_C() {
    return this.reactiveForm.get('investment_individual_C');
  }
  get investment_individual_D() {
    return this.reactiveForm.get('investment_individual_D');
  }
  get investment_individual_E() {
    return this.reactiveForm.get('investment_individual_E');
  }
  get investment_individual_F() {
    return this.reactiveForm.get('investment_individual_F');
  }
  get investment_individual_G() {
    return this.reactiveForm.get('investment_individual_G');
  }
  get disinvestment_UIN() {
    return this.reactiveForm.get('disinvestment_UIN');
  }
  datalist: {
    OPI_Sec_A_ForeignName: "",
    OPI_Sec_A_SharesRepurchased: "",
    OPI_Sec_A_SharesIssued: "",
    UserId: "",
    OPI_Sec_A_Name: "",
    OPI_Sec_A_LEI: "",
    OPI_Sec_A_PAN: "",
    OPI_Sec_A_Address: "",
    OPI_Sec_A_City: "",
    OPI_Sec_A_State: "",
    OPI_Sec_A_PIN: "",
    OPI_Sec_A_NetINR: "",
    WhetherIElist: "",
    OPI_Sec_A_ContactPersonName: "",
    OPI_Sec_A_ContactPersonDesignation: "",
    OPI_Sec_A_Mobile: "",
    OPI_Sec_A_EmailId: "",
    OPI_Sec_A_NetAmount_USD: "",
    OPI_Sec_A_NetAmount_INR: "",
    OPI_Sec_A_Investments_USD: "",
    OPI_Sec_A_Investments_INR: "",
    OPI_Sec_A_Sale_USD: "",
    OPI_Sec_A_Sale_INR: "",
    OPI_Sec_A_NetAmountClosing_USD: "",
    OPI_Sec_A_NetAmountClosing_INR: "",
    OPI_Sec_A_RemittanceAmt_USD: "",
    OPI_Sec_A_RemittanceAmt_INR: "",
    OPI_Sec_A_Repatriation_USD: "",
    OPI_Sec_A_Repatriation_INR: "",
    OPI_Sec_A_EBS_NetAmt_USD: "",
    OPI_Sec_A_EBS_NetAmt_INR: "",
    OPI_Sec_A_EBS_Investments_USD: "",
    OPI_Sec_A_EBS_Investments_INR: "",
    OPI_Sec_A_EBS_Disinvestment_USD: "",
    OPI_Sec_A_EBS_Disinvestment_INR: "",
    OPI_Sec_A_EBS_NetAmtClose_USD: "",
    OPI_Sec_A_EBS_NetAmtClose_INR: "",
    OPI_Sec_A_EBS_RemittanceAmt_USD: "",
    OPI_Sec_A_EBS_RemittanceAmt_INR: "",
    OPI_Sec_A_EBS_RepatriationAmt_USD: "",
    OPI_Sec_A_EBS_RepatriationAmt_INR: "",
    OPI_Sec_A_Equity1_USD: "",
    OPI_Sec_A_Equity2_INR: "",
    OPI_Sec_A_Equity3_USD: "",
    OPI_Sec_A_Equity4_INR: "",
    OPI_Sec_A_Equity5_USD: "",
    OPI_Sec_A_Equity6_INR: "",
    OPI_Sec_A_Equity7_USD: "",
    OPI_Sec_A_Equity8_INR: "",
    OPI_Sec_A_Equity9_USD: "",
    OPI_Sec_A_Equity10_INR: "",
    OPI_Sec_A_Equity11_USD: "",
    OPI_Sec_A_Equity12_INR: "",
    OPI_Sec_A_DebtInstrument1_USD: "",
    OPI_Sec_A_DebtInstrument2_INR: "",
    OPI_Sec_A_DebtInstrument3_USD: "",
    OPI_Sec_A_DebtInstrument4_INR: "",
    OPI_Sec_A_DebtInstrument5_USD: "",
    OPI_Sec_A_DebtInstrument6_INR: "",
    OPI_Sec_A_DebtInstrument7_USD: "",
    OPI_Sec_A_DebtInstrument8_INR: "",
    OPI_Sec_A_DebtInstrument9_USD: "",
    OPI_Sec_A_DebtInstrument10_INR: "",
    OPI_Sec_A_DebtInstrument11_USD: "",
    OPI_Sec_A_DebtInstrument12_INR: "",
    OPI_Sec_A_ADR_GDR1_USD: "",
    OPI_Sec_A_ADR_GDR2_INR: "",
    OPI_Sec_A_ADR_GDR3_USD: "",
    OPI_Sec_A_ADR_GDR4_INR: "",
    OPI_Sec_A_ADR_GDR5_USD: "",
    OPI_Sec_A_ADR_GDR6_INR: "",
    OPI_Sec_A_ADR_GDR7_USD: "",
    OPI_Sec_A_ADR_GDR8_INR: "",
    OPI_Sec_A_ADR_GDR9_USD: "",
    OPI_Sec_A_ADR_GDR10_INR: "",
    OPI_Sec_A_ADR_GDR11_USD: "",
    OPI_Sec_A_ADR_GDR12_INR: "",
    OPI_Sec_A_ETF1_USD: "",
    OPI_Sec_A_ETF2_INR: "",
    OPI_Sec_A_ETF3_USD: "",
    OPI_Sec_A_ETF4_INR: "",
    OPI_Sec_A_ETF5_USD: "",
    OPI_Sec_A_ETF6_INR: "",
    OPI_Sec_A_ETF7_USD: "",
    OPI_Sec_A_ETF8_INR: "",
    OPI_Sec_A_ETF9_USD: "",
    OPI_Sec_A_ETF10_INR: "",
    OPI_Sec_A_ETF11_USD: "",
    OPI_Sec_A_ETF12_INR: "",
    OPI_Sec_A_Mutual1_USD: "",
    OPI_Sec_A_Mutual2_INR: "",
    OPI_Sec_A_Mutual3_USD: "",
    OPI_Sec_A_Mutual4_INR: "",
    OPI_Sec_A_Mutual5_USD: "",
    OPI_Sec_A_Mutual6_INR: "",
    OPI_Sec_A_Mutual7_USD: "",
    OPI_Sec_A_Mutual8_INR: "",
    OPI_Sec_A_Mutual9_USD: "",
    OPI_Sec_A_Mutual10_INR: "",
    OPI_Sec_A_Mutual11_USD: "",
    OPI_Sec_A_Mutual12_INR: "",
    OPI_Sec_A_Others1_USD: "",
    OPI_Sec_A_Others2_INR: "",
    OPI_Sec_A_Others3_USD: "",
    OPI_Sec_A_Others4_INR: "",
    OPI_Sec_A_Others5_USD: "",
    OPI_Sec_A_Others6_INR: "",
    OPI_Sec_A_Others7_USD: "",
    OPI_Sec_A_Others8_INR: "",
    OPI_Sec_A_Others9_USD: "",
    OPI_Sec_A_Others10_INR: "",
    OPI_Sec_A_Others11_USD: "",
    OPI_Sec_A_Others12_INR: "",
    OPI_Sec_A_Total1_USD: "",
    OPI_Sec_A_Total2_INR: "",
    OPI_Sec_A_Total3_USD: "",
    OPI_Sec_A_Total4_INR: "",
    OPI_Sec_A_Total5_USD: "",
    OPI_Sec_A_Total6_INR: "",
    OPI_Sec_A_Total7_USD: "",
    OPI_Sec_A_Total8_INR: "",
    OPI_Sec_A_Total9_USD: "",
    OPI_Sec_A_Total10_INR: "",
    OPI_Sec_A_Total11_USD: "",
    OPI_Sec_A_Total12_INR: "",
    OPI_Sec_B_Name: "",
    OPI_Sec_B_LEI: "",
    OPI_Sec_B_PAN: "",
    OPI_Sec_B_Activity: "",
    OPI_Sec_B_Address: "",
    OPI_Sec_B_City: "",
    OPI_Sec_B_State: "",
    OPI_Sec_B_PINCode: "",
    OPI_Sec_B_ContactPerson: "",
    OPI_Sec_B_Designation: "",
    OPI_Sec_B_Telephone: "",
    OPI_Sec_B_MobileCP: "",
    OPI_Sec_B_FaxNo: "",
    OPI_Sec_B_Email: "",
    OPI_Sec_B_VCF_Name: "",
    OPI_Sec_B_VCF_PAN: "",
    OPI_Sec_B_VCF_Group: "",
    OPI_Sec_B_VCF_Activity: "",
    OPI_Sec_B_VCF_Address: "",
    OPI_Sec_B_VCF_City: "",
    OPI_Sec_B_VCF_State: "",
    OPI_Sec_B_VCF_PINCode: "",
    OPI_Sec_B_VCF_ContactPerson: "",
    OPI_Sec_B_VCF_Designation: "",
    OPI_Sec_B_VCF_Telephone: "",
    OPI_Sec_B_VCF_Email: "",
    OPI_Sec_B_AIF_Name: "",
    OPI_Sec_B_AIF_Date: "",
    OPI_Sec_B_AIF_SEBILimit: "",
    OPI_Sec_B_Equity1_USD: "",
    OPI_Sec_B_Equity2_INR: "",
    OPI_Sec_B_Equity3_USD: "",
    OPI_Sec_B_Equity4_INR: "",
    OPI_Sec_B_Equity5_USD: "",
    OPI_Sec_B_Equity6_INR: "",
    OPI_Sec_B_Equity7_USD: "",
    OPI_Sec_B_Equity8_INR: "",
    OPI_Sec_B_Equity9_USD: "",
    OPI_Sec_B_Equity10_INR: "",
    OPI_Sec_B_Equity11_USD: "",
    OPI_Sec_B_Equity12_INR: "",
    OPI_Sec_B_EquityLinked1_USD: "",
    OPI_Sec_B_EquityLinked2_INR: "",
    OPI_Sec_B_EquityLinked3_USD: "",
    OPI_Sec_B_EquityLinked4_INR: "",
    OPI_Sec_B_EquityLinked5_USD: "",
    OPI_Sec_B_EquityLinked6_INR: "",
    OPI_Sec_B_EquityLinked7_USD: "",
    OPI_Sec_B_EquityLinked8_INR: "",
    OPI_Sec_B_EquityLinked9_USD: "",
    OPI_Sec_B_EquityLinked10_INR: "",
    OPI_Sec_B_EquityLinked11_USD: "",
    OPI_Sec_B_EquityLinked12_INR: "",
    OPI_Sec_B_Permissible1_USD: "",
    OPI_Sec_B_Permissible2_INR: "",
    OPI_Sec_B_Permissible3_USD: "",
    OPI_Sec_B_Permissible4_INR: "",
    OPI_Sec_B_Permissible5_USD: "",
    OPI_Sec_B_Permissible6_INR: "",
    OPI_Sec_B_Permissible7_USD: "",
    OPI_Sec_B_Permissible8_INR: "",
    OPI_Sec_B_Permissible9_USD: "",
    OPI_Sec_B_Permissible10_INR: "",
    OPI_Sec_B_Permissible11_USD: "",
    OPI_Sec_B_Permissible12_INR: "",
    OPI_Sec_B_Total1_USD: "",
    OPI_Sec_B_Total2_INR: "",
    OPI_Sec_B_Total3_USD: "",
    OPI_Sec_B_Total4_INR: "",
    OPI_Sec_B_Total5_USD: "",
    OPI_Sec_B_Total6_INR: "",
    OPI_Sec_B_Total7_USD: "",
    OPI_Sec_B_Total8_INR: "",
    OPI_Sec_B_Total9_USD: "",
    OPI_Sec_B_Total10_INR: "",
    OPI_Sec_B_Total11_USD: "",
    OPI_Sec_B_Total12_INR: "",
    OPI_Sec_C_Signature: "",
    OPI_Sec_C_Name: "",
    OPI_Sec_C_Stamp: "",
    OPI_Sec_C_Place: "",
    OPI_Sec_C_Date: "",
    OPI_Sec_C_Telephone: "",
    OPI_Sec_C_EmailId: ""

  }
  onSelected(event) {
    // this.fcFormlist.controls['BankName'].setValue(event.BankName);

    // this.form1.controls['test'].value =  {code: 'A',description: 'TEST A'}
  }
  public submit() {
    debugger;
    if (this.fcFormlist.controls["investorForm"].invalid) {
      this.fcFormlist.controls["investorForm"].markAllAsTouched();
      return;
    }
    else {
      // if (Number(this.typeshow) <= 3)
      // {
      // this.OpiFormlist.value.basicform.OPI_Sec_A_City = this.OpiFormlist.value.basicform.OPI_Sec_A_City.city;
      // this.OpiFormlist.value.basicform.OPI_Sec_A_State =this.OpiFormlist.value.basicform.OPI_Sec_A_State.State;
      // }
      // else if (Number(this.typeshow) > 3)
      // {
      // this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_City = this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_City.city;
      // this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_State =this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_State.State;
      // this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_City = this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_City.city;
      // this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_State =this.OpiFormlist.value.VCFAIFform.OPI_Sec_B_VCF_State.State;

      // }
      this.dataModel['investorForm'] = this.fcFormlist.value.investorForm;
      const sumFCArray: FormArray = this.fb.array(this.sumFCArray);
      this.fcFormlist.setControl('FCDetails', sumFCArray);
      const FCDisinvestmentArray: FormArray = this.fb.array(this.FCDisinvestmentArray);
      this.fcFormlist.setControl('InvestmentDetails', FCDisinvestmentArray);
      const PEFEntityArray: FormArray = this.fb.array(this.PEFEntityArray);
      this.fcFormlist.setControl('PEFEntityDetails', PEFEntityArray);
      const FC_FDINICCodeDesArray: FormArray = this.fb.array(this.SelectFC_FDINICCodeDesArray);
      this.fcFormlist.setControl('FC_FDINICCodeDesDetails', FC_FDINICCodeDesArray);
      // this.dataModel['IndianEntitysDetails'] = this.OpiFormlist.value.IndianEntitysform;
      // this.dataModel['ResidentIndividualDetails'] = this.OpiFormlist.value.ResidentIndividualform;
      // this.dataModel['MutualFundDetails'] = this.OpiFormlist.value.MutualFundform;
      // this.dataModel['VCFAIFDetails'] = this.OpiFormlist.value.VCFAIFform;
      // this.dataModel['SectionCDetails'] = this.OpiFormlist.value.SectionC;
      return this.apiService.createFormOpi(this.dataModel).subscribe({
        complete: () => {
          this.datalist = this.fcFormlist.value;
          console.log(this.datalist);
          //result.insertedId.toString() 
          alert('Fromfc successfully created!');
          // this.tabset.tabs[(Number(4))].disabled = false;
          // this.tabset.tabs[(Number(4))].active = true;

          this.btnShowNext = false;

          //this.childComponent.downloadAsPDF();
          //console.log('FromEsop successfully created!');
          //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

    // }
    // if (this.fcFormlist.invalid) {
    //   for (const control of Object.keys(this.fcFormlist.controls)) {
    //     this.fcFormlist.controls[control].markAllAsTouched();
    //   }
    //   return;
    // }
    // if (this.fcFormlist.controls["investorForm"].invalid) {
    //   this.fcFormlist.controls["investorForm"].markAllAsTouched();
    //   return;
    // }
    // Object.keys(this.fcFormlist.controls).forEach(field => { // {1}
    //   const control = this.fcFormlist.get(field);            // {2}
    //   control.markAsTouched({ onlySelf: true });       // {3}
    // });
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

  addCodeClassRow() {
    this.codeClass = { Description1987: "", Description2008: "" };
    this.CodeClassArray.push(this.codeClass);
    console.log(this.CodeClassArray);
    this.codeClasslength = this.CodeClassArray.length;
    return true;
  }

  deleteCodeClassRow(index) {
    if (this.CodeClassArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.CodeClassArray.splice(index, 1);
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
  }
  addFinancialCommitment() {
    this.FinancialCommitment = { InvestSource: "", CategoryType: "",Date:"",AmountFCY:"",AmountINR: ""}
    this.FinancialCommitmentArray.push(this.FinancialCommitment);
    console.log(this.FinancialCommitmentArray);
    this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
    return true;
  }
  deleteFinancialCommitment(index) {
    if (this.FinancialCommitmentArray.length == 1) {
      //this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
      return false;
    } else {
      this.FinancialCommitmentArray.splice(index, 1);
      this.FinancialCommitmentlength = this.FinancialCommitmentArray.length;
      //this.toastr.warning('Row deleted successfully', 'Delete row');  
      return true;
    }
    
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

}
