import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //baseUri: string = 'http://13.234.13.221:4000/api';
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}`);
  }

  getCountry() {
    return this.http.get(`${this.baseUri}/master`);
  }
  getCity() {
    return this.http.get(`${this.baseUri}/master/City`);
  }
  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Create ESOP
  createFormEsop(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createEsop`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  //Create FromFC
  createFormFC(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createFC`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  //Create FromAPR
  createFormAPR(data): Observable<any> {
    console.log(data);
    let url = `${this.baseUri}/createAPR`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
//Create FromOPI
createFormOpi(data): Observable<any> {
  console.log(data);
  let url = `${this.baseUri}/createOpi`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
 //Create FromAPR
 createFormcoc(data): Observable<any> {
  console.log(data);
  let url = `${this.baseUri}/createcoc`;
  return this.http.post(url, data).pipe(catchError(this.errorMgmt));
}
// Get all OpiFormData
getopiData() {
  return this.http.get(`${this.baseUri}/getOpi`);
}


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
