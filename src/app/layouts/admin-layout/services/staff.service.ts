import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../models/staff.model';
import { environment } from 'src/environments/environment';
import { User } from '../../auth-layout/models/user.model';
import { Campaign } from '../models/campaign.model';

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

  getCampaigns(): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns`;
    return this.http.get<Campaign>(url);
  }

  create(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/register`;
    return this.http.post<User>(url, params);
  }

  createCampaign(campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns`;
    return this.http.post<Campaign>(url, campaign);
  }

  updateStaff(staff): Observable<any> {
    const url = `${this.BASE_URL}/${staff.id}`;
    return this.http.put(url, staff);
  }

  updateCampaign(campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${campaign.id}`;
    return this.http.put<Campaign>(url, campaign);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<Staff>(url);
  }
}
