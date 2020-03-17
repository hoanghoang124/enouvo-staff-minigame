import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Staff } from '../Models/staff.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store';
import * as appStore from '../../Store';
import * as fromAuth from '../../Store';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  staffForm: FormGroup;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  staff$: Observable<Staff>;
  hide = true;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      avatar: [null],
      email: [null, [Validators.required, Validators.email]],
      quote: [null, Validators.required],
      birthday: [{ value: null }, Validators.required],
      phone: [null, Validators.required],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
  }

  onFormSubmit() {
    const register = {
      username: this.staffForm.get('username').value,
      email: this.staffForm.get('email').value
    };
    const staff: Staff = {
      id: this.staffForm.get('id').value,
      firstName: this.staffForm.get('firstName').value,
      middleName: this.staffForm.get('middleName').value,
      lastName: this.staffForm.get('lastName').value,
      avatar: this.staffForm.get('avatar').value,
      email: this.staffForm.get('email').value,
      quote: this.staffForm.get('quote').value,
      birthday: this.staffForm.get('birthday').value,
      phone: this.staffForm.get('phone').value,
      addressStreet: this.staffForm.get('addressStreet').value,
      addressCity: this.staffForm.get('addressCity').value,
      position: this.staffForm.get('position').value
    };
    console.log(register);
    this.isLoadingResults$ = this.store.select(appStore.getIsLoading);
    this.store.dispatch(new appStore.Register(register));
    this.store.dispatch(new appStore.CreateStaff(staff));
  }
}
