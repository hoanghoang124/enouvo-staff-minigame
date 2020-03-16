import {
  AbstractControl,
  Validators,
  FormGroup,
  FormBuilder,
  ValidatorFn
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
export class ChangePasswordComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  changePasswordForm: FormGroup;
  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
      },
      {
        validator: this.MatchPassword('newPassword', 'confirmPassword')
      }
    );
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuth.getIsLoading);
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const changePasswordValue = {
      password: this.changePasswordForm.controls['currentPassword'].value,
      newPassword: this.changePasswordForm.controls['newPassword'].value
    };
    this.store.dispatch(new fromAuth.ChangePassword(changePasswordValue));
  }

  MatchPassword(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
