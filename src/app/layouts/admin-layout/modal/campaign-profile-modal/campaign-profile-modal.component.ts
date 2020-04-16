import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import * as fromStaff from '../../store/index';
// import { State } from 'src/app/layouts/auth-layout/store';
// import { Store } from '@ngrx/store';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-profile-modal',
  templateUrl: './campaign-profile-modal.component.html',
  styleUrls: ['./campaign-profile-modal.component.css']
})
export class CampaignProfileModalComponent implements OnInit {
  @Input() campaignId: number;

  campaign$: Observable<Campaign>;

  constructor(
    // private store: Store<State>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    // this.store.dispatch(new fromStaff.GetCampaign(this.campaignId));
    // this.campaign$ = this.store.select(fromStaff.getCampaign);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
