import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cities } from 'src/app/layouts/auth-layout/models/city.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/layouts/auth-layout/store';
import { ToastrService } from 'ngx-toastr';

import { CreateStaff } from './../../store/actions/staff.action';
import { getIsCrtStfLoading } from './../../store/selectors/staff.selector';
import { PositionTypes } from 'src/app/layouts/auth-layout/models/scope.model';
@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {
  isLoadingResults$: Observable<boolean>;
  createAccountForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService
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
    this.isLoadingResults$ = this.store.select(getIsCrtStfLoading);
  }

  onSubmit() {
    if (this.createAccountForm.invalid) {
      return this.toastrService.warning('Form invalid', 'Warning');
    } else {
      this.store.dispatch(new CreateStaff(this.createAccountForm.value));
    }
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  close() {
    this.activeModal.close();
  }
}
