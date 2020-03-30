import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Cities } from '../../auth-layout/models/city.model';
import { PositionTypes } from '../../auth-layout/models/role.model';
import { Store } from '@ngrx/store';
import { State } from '../../auth-layout/store';
import * as fromAuthSelector from '../../auth-layout/store/auth.selector';
import * as fromAuthAction from '../../auth-layout/store/auth.action';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  editAccountForm: FormGroup;
  model: NgbDateStruct;
  positionTypes = PositionTypes;
  city = Cities;
  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.editAccountForm = this.formBuilder.group({
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
    if (this.editAccountForm.invalid) {
      console.log('Form invalid');
      return;
    } else {
      this.store.dispatch(
        new fromAuthAction.CreateAccount(this.editAccountForm.value)
      );
    }
  }
}
