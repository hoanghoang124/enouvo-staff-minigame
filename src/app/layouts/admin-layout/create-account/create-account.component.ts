import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../auth-layout/store';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../auth-layout/store/auth.action';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
      const createAccountFormValue = {
        firstName: this.createAccountForm.get['firstName'].value,
        middleName: this.createAccountForm.get['middleName'].value,
        lastName: this.createAccountForm.get['lastName'].value,
        birthday: this.createAccountForm.get['birthday'].value,
        email: this.createAccountForm.get['email'].value,
        phone: this.createAccountForm.get['phone'].value,
        roleId: this.createAccountForm.get['roleId'].value,
        addressCity: this.createAccountForm.get['addressCity'].value,
        addressStreet: this.createAccountForm.get['addressStreet'].value
      };
      console.log(createAccountFormValue);
      this.store.dispatch(
        new fromAuthAction.CreateAccount(createAccountFormValue)
      );
    }
  }
}
