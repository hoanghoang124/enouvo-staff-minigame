import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../models/staff.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  url = environment.Url;
  constructor(private http: HttpClient) {}

  getStaffs(): Observable<any> {
    return this.http.get<Staff>(this.url);
  }

  getStaff(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<Staff>(url);
  }

  createStaff(staff): Observable<any> {
    return this.http.post<Staff>(this.url, staff);
  }

  updateStaff(staff): Observable<any> {
    const url = `${this.url}/${staff.id}`;
    return this.http.put(url, staff);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Staff>(url);
  }
}
