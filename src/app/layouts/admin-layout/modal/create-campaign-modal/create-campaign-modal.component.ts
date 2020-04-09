import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/layouts/auth-layout/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as fromStaff from '../../store/index';

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
      starLimit: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(fromStaff.getErrorCrtAccMessage);
    this.isLoadingResults$ = this.store.select(fromStaff.getIsCrtAccLoading);
  }

  onSubmit() {
    console.log(this.createCampaignForm.value);
    if (this.createCampaignForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(
        new fromStaff.CreateAccount(this.createCampaignForm.value)
      );
      this.activeModal.dismiss();
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
