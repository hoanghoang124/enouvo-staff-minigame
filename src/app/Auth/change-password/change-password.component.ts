import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';
import { slideInOutAnimation } from './../../Main/animation/slide-in-out.animation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  errorMessage$: Observable<string> = null;
  isLoadingResults$: Observable<boolean>;
  changeForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.changeForm = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuth.getIsLoading);
  }

  onSubmit(): void {
    if (this.changeForm.invalid) {
      return;
    }
    this.store.dispatch(new fromAuth.ChangePassword(this.changeForm.value));
  }

  ngOnDestroy() {
    localStorage.removeItem('password');
    localStorage.removeItem('newPassword');
  }
}
