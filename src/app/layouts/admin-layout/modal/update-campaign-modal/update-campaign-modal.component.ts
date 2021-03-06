import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { State } from 'src/app/layouts/auth-layout/store';
import { CampaignStates } from '../../models/campaign-states.model';
import { getIsUpdCmpLoading } from '../../store/selectors/campaign.selector';
import { UpdateCampaign } from '../../store/actions/campaign.action';

@Component({
  selector: 'app-update-campaign-modal',
  templateUrl: './update-campaign-modal.component.html',
  styleUrls: ['./update-campaign-modal.component.scss']
})
export class UpdateCampaignModalComponent implements OnInit {
  @Input() campaignId: number;
  @Input() campaignTitle: string;
  @Input() campaignIsCampaignActive: boolean;
  @Input() campaignDescription: string;
  @Input() campaignStartDate: Date;
  @Input() campaignEndDate: Date;

  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  updateCampaignForm: FormGroup;
  states = CampaignStates;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.updateCampaignForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCampaignActive: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.updateCampaignForm.controls['title'].patchValue(this.campaignTitle);
    this.updateCampaignForm.controls['description'].patchValue(
      this.campaignDescription
    );
    this.updateCampaignForm.controls['isCampaignActive'].patchValue(
      this.campaignIsCampaignActive
    );
    this.updateCampaignForm.controls['startDate'].patchValue(
      new Date(this.campaignStartDate)
    );
    this.updateCampaignForm.controls['endDate'].patchValue(
      new Date(this.campaignEndDate)
    );
    this.isLoadingResults$ = this.store.select(getIsUpdCmpLoading);
  }

  onSubmit() {
    if (this.updateCampaignForm.invalid) {
      return this.toastrService.warning('Form invalid', 'Warning');
    } else {
      this.store.dispatch(
        new UpdateCampaign({
          id: this.campaignId,
          campaign: this.updateCampaignForm.value
        })
      );
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }
}
