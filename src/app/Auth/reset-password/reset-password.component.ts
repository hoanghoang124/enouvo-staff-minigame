import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  resetPasswordForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}
  id: User;
  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
  }
  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.store.dispatch(new fromAuth.ResetPassword(this.resetPasswordForm.value));
  }
}
