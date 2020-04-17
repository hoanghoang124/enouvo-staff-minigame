import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private BASE_URL = environment.apiBaseUrl;
  constructor(private apiService: ApiService) {}

  getStaffs(params?: any): Observable<any> {
    const url = `${this.BASE_URL}/v1/profiles`;
    return this.apiService.get(url, params);
  }

  getStaff(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/profiles/${id}`;
    return this.apiService.get(url);
  }

  getCampaigns(params?: any): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns`;
    return this.apiService.get(url, params);
  }

  create(params): Observable<any> {
    const url = `${this.BASE_URL}/v1/auth/register`;
    return this.apiService.post(url, params);
  }

  createCampaign(campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns`;
    return this.apiService.post(url, campaign);
  }

  updateStaff(staff): Observable<any> {
    const url = `${this.BASE_URL}/${staff.id}`;
    return this.apiService.put(url, staff);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}`;
    return this.apiService.put(url, campaign);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.BASE_URL}/${id}`;
    return this.apiService.delete(url);
  }
}
