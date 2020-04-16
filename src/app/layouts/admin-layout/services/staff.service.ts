import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../models/staff.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private BASE_URL = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getStaffsQuery(params?: any): Observable<any> {
    const url = `${this.BASE_URL}/v1/profiles`;
    return this.http.get(url, params);
  }

  getStaffs(): Observable<any> {
    const url = `${this.BASE_URL}/v1/profiles`;
    return this.http.get<Staff>(url);
  }

  getStaff(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/profiles/${id}`;
    return this.http.get<Staff>(url);
  }

  createStaff(staff): Observable<any> {
    return this.http.post<Staff>(this.BASE_URL, staff);
  }

  updateStaff(staff): Observable<any> {
    const url = `${this.BASE_URL}/${staff.id}`;
    return this.http.put(url, staff);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<Staff>(url);
  }
}
