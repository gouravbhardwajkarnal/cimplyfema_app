import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {
  Employee: any = [];
  CountryList: any=[];

  constructor(private apiService: ApiService) {
    this.readCountry();
  }

  ngOnInit() {}

  readCountry() {
    debugger;
    this.apiService.getCountry().subscribe((data) => {
    
      this.CountryList = data;
    });
  }

  removeEmployee(employee, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }
}
