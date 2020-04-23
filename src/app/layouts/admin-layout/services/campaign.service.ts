import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { Observable } from 'rxjs';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private BASE_URL = environment.apiBaseUrl;
  constructor(private apiService: ApiService) {}

  createCampaign(campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns`;
    return this.apiService.post(url, campaign);
  }

  updateCampaign(id: number, campaign: Campaign): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}`;
    return this.apiService.put(url, campaign);
  }

  deleteCampagin(id: number): Observable<any> {
    const url = `${this.BASE_URL}/v1/campaigns/${id}`;
    return this.apiService.delete(url);
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

  vote(id: number, voting) {
    const url = `${this.BASE_URL}/v1/campaigns/${id}/vote`;
    return this.apiService.put(url, voting);
  }

  devote(id: number, voting) {
    const url = `${this.BASE_URL}/v1/campaigns/${id}/vote`;
    return this.apiService.put(url, voting);
  }
}
