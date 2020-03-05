import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Staff } from '../Models/staff.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient) {}

  getStaffs(): Observable<any> {
    return this.http.get<Staff>(Url);
  }

  getStaff(id: number): Observable<any> {
    const url = `${Url}/${id}`;
    return this.http.get<Staff>(url);
  }

  createStaff(staff): Observable<any> {
    return this.http.post<Staff>(Url, staff, httpOptions);
  }

  updateStaff(staff): Observable<any> {
    const url = `${Url}/${staff.id}`;
    return this.http.put(url, staff, httpOptions);
  }

  deleteStaff(id): Observable<any> {
    const url = `${Url}/${id}`;
    return this.http.delete<Staff>(url, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const Url = environment.Url;
