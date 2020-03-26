import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../auth-layout/store';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../auth-layout/store/auth.action';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PositionTypes } from '../../auth-layout/models/role.model';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  createAccountForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}
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
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  onSubmit() {
    if (this.createAccountForm.invalid) {
      console.log('Form invalid');
      console.log(this.createAccountForm.value);

      return;
    } else {
      console.log(this.createAccountForm.value);
      this.store.dispatch(
        new fromAuthAction.CreateAccount(this.createAccountForm.value)
      );
    }
  }
}
