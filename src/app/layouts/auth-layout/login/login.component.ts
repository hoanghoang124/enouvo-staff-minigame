import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { State } from '../store';
import { getIsLgnLoading } from '../store/auth.selector';
import { LogIn } from '../store/auth.action';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  loginForm: FormGroup;
  hide = true;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.isLoadingResults$ = this.store.select(getIsLgnLoading);
    // this.loginForm.valueChanges.subscribe(val => console.log(val)); do magical thing
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LogIn(this.loginForm.value));
    } else {
      return this.toastrService.warning('Form invalid', 'Warning');
    }
  }
}
