import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from 'src/app/layouts/auth-layout/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromStaff from '../../store/index';
import { CampaignStates } from '../../models/campaign-states.model';

@Component({
  selector: 'app-update-campaign-modal',
  templateUrl: './update-campaign-modal.component.html',
  styleUrls: ['./update-campaign-modal.component.scss']
})
export class UpdateCampaignModalComponent implements OnInit {
  @Input() campaignId: number;
  @Input() title: string;
  @Input() description: string;
  @Input() isCampaignActive: boolean;
  @Input() startDate: Date;
  @Input() endDate: Date;

  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  updateCampaignForm: FormGroup;
  states = CampaignStates;
  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.updateCampaignForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCampaignActive: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(fromStaff.getErrorUpdCmpMessage);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsUpdCmpLoading);
  }

  onSubmit() {
    if (this.updateCampaignForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(
        new fromStaff.UpdateCampaign({
          id: this.campaignId,
          campaign: this.updateCampaignForm.value
        })
      );
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
