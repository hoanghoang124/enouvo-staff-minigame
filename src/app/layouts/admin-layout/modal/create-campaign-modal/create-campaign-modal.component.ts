import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { State } from 'src/app/layouts/auth-layout/store';
import {
  getErrorCrtCmpMessage,
  getIsCrtCmpLoading
} from '../../store/selectors/staff.selector';
import { CreateCampaign } from '../../store/actions/staff.action';

@Component({
  selector: 'app-create-campaign-modal',
  templateUrl: './create-campaign-modal.component.html',
  styleUrls: ['./create-campaign-modal.component.scss']
})
export class CreateCampaignModalComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  createCampaignForm: FormGroup;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createCampaignForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCampaignActive: [false],
      starLimitation: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(getErrorCrtCmpMessage);
    this.isLoadingResults$ = this.store.select(getIsCrtCmpLoading);
  }

  onSubmit() {
    if (this.createCampaignForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(new CreateCampaign(this.createCampaignForm.value));
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }
}
