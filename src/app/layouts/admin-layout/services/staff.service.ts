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

  getCampaignDetail(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}`;
    return this.apiService.get(url);
  }

  getCampaignListStaff(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}/staffs`;
    return this.apiService.get(url);
  }

  getVotingHistory(id: number, userId: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}/staffs/${userId}/voting-history`;
    return this.apiService.get(url);
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

  deleteCampagin(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}`;
    return this.apiService.delete(url);
  }

  deleteStaff(id): Observable<any> {
    const url = `${this.BASE_URL}/${id}`;
    return this.apiService.delete(url);
  }
}
