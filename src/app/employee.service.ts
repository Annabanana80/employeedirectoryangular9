import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private REST_API_SERVER = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  getEmployee(id: number): Observable<any> {
    return this.http
      .get(`${this.REST_API_SERVER}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.REST_API_SERVER}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.REST_API_SERVER}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.REST_API_SERVER}/${id}`, {
      responseType: 'text',
    });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.REST_API_SERVER}`);
  }
}
