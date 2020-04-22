import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteCampaign } from '../../store/actions/staff.action';
import { getIsDltCmpLoading } from '../../store/selectors/staff.selector';

@Component({
  selector: 'app-confirm-delete-campaign-modal',
  templateUrl: './confirm-delete-campaign-modal.component.html',
  styleUrls: ['./confirm-delete-campaign-modal.component.scss']
})
export class ConfirmDeleteCampaignModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() campaignId: number;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  isLoadingResults$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.isLoadingResults$ = this.store.select(getIsDltCmpLoading);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.store.dispatch(new DeleteCampaign({ id: this.campaignId }));
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
