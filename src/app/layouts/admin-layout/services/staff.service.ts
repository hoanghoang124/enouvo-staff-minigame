import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Staff } from "../Models/staff.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class StaffService {
  url = environment.Url;
  constructor(private http: HttpClient) {}

  getStaffs(): Observable<any> {
    return this.http.get<Staff>(this.url, httpOptions);
  }

  getStaff(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<Staff>(url, httpOptions);
  }

  createStaff(staff): Observable<any> {
    return this.http.post<Staff>(this.url, staff, httpOptions);
  }

  updateStaff(staff): Observable<any> {
    const url = `${this.url}/${staff.id}`;
    return this.http.put(url, staff, httpOptions);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Staff>(url, httpOptions);
  }
}

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
