import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';
import { User } from '../Models/user.model';
import { fadeInAnimation } from './../../Main/animation/fade-in.animation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ResetPasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  resetForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}
  id: User;
  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuth.getIsLoading);
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }
    const id = localStorage.getItem('id');
    this.store.dispatch(new fromAuth.ResetPassword(id));
  }
}
