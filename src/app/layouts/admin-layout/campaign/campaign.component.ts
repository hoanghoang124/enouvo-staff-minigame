import { Component, OnInit } from '@angular/core';
import { State } from '../../auth-layout/store';
import { Store } from '@ngrx/store';
import { DialogService } from '../services/dialog.service';
import { Observable } from 'rxjs';
import * as fromStaff from '../store';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
  campaigns$: Observable<any>;
  isCampaginLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetCampaign());
    this.campaigns$ = this.store.select(fromStaff.getAllCampaigns);
    this.errorMessage$ = this.store.select(fromStaff.getErrorGtAllCmpMessage);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtCmpLoading);
    this.isCampaginLoading$ = this.store.select(fromStaff.getIsGtAllCmpLoading);
  }

  openCreateCampaignDialog() {
    this.dialogService.createCampaign();
  }

  openUpdateCampaignDialog(campaignId) {
    this.dialogService.updateCampaign(campaignId);
  }
}
