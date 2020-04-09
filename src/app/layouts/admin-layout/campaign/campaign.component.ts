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
  staffs$: Observable<any>;
  isStaffLoading$: Observable<boolean>;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  constructor(
    private store: Store<State>,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.staffs$ = this.store.select(fromStaff.getAllStaffs);
    this.errorMessage$ = this.store.select(fromStaff.getErrorCrtCmpMessage);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtCmpLoading);
    this.isStaffLoading$ = this.store.select(fromStaff.getIsGtAllStfLoading);
  }

  openCreateCampaignDialog() {
    this.dialogService.createCampaign();
  }
}
