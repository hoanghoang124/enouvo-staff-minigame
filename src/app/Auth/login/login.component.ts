import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material';
import 'rxjs/add/operator/toPromise';
import { fadeInAnimation } from 'src/app/Main/animation/fade-in.animation';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {
  errorMessage$: Observable<string> = null;
  isLoadingResults$: Observable<boolean>;
  loginForm: FormGroup;

  constructor(
    private store: Store<State>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoadingResults$ = this.store.select(fromAuth.getIsLoading);
    this.store.dispatch(new fromAuth.LogIn(this.loginForm.value));
  }
}
