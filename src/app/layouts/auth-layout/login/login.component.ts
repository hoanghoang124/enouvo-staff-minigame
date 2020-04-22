import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '../store';
import { getErrorLgnMessage, getIsLgnLoading } from '../store/auth.selector';
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

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.errorMessage$ = this.store.select(getErrorLgnMessage);
    this.isLoadingResults$ = this.store.select(getIsLgnLoading);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LogIn(this.loginForm.value));
    }
  }
}
