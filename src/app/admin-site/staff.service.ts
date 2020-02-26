import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Staff } from './staff.model';

@Injectable({
  providedIn: 'root'
})

export class StaffService {

  constructor(private http: HttpClient) { }

  getStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(Url);
  }

  getStaff(id: number): Observable<Staff> {
    const url = `${Url}/${id}`;
    return this.http.get<Staff>(url);
  }

  addStaff(staff): Observable<Staff> {
    return this.http.post<Staff>(Url, staff, httpOptions);
  }

  updateStaff(id, staff): Observable<any> {
    const url = `${Url}/${id}`;
    return this.http.put(url, staff, httpOptions);
  }

  deleteStaff(id): Observable<Staff> {
    const url = `${Url}/${id}`;
    return this.http.delete<Staff>(url, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const Url = 'http://5e55e20836450d001428865d.mockapi.io/staff';
