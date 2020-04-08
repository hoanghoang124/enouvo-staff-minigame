import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionTypes } from 'src/app/layouts/auth-layout/models/role.model';
import { Cities } from 'src/app/layouts/auth-layout/models/city.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import * as fromAuthSelector from '../../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../../auth-layout/store/auth.action';
@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  createAccountForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.createAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      roleId: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(
      fromAuthSelector.getErrorCrtAccMessage
    );
    this.isLoadingResults$ = this.store.select(
      fromAuthSelector.getIsCrtAccLoading
    );
  }

  onSubmit() {
    if (this.createAccountForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(
        new fromAuthAction.CreateAccount(this.createAccountForm.value)
      );
      this.activeModal.dismiss();
    }
  }

  close() {
    this.activeModal.dismiss();
  }
}
