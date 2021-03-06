import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.action';
import { DialogService } from '../../admin-layout/services/dialog.service';

const { AuthActionTypes } = AuthActions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private dialogService: DialogService
  ) {}

  @Effect()
  logIn$ = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: AuthActions.LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload).pipe(
        map(user => {
          if (user.shouldUserChangePassword) {
            this.router.navigateByUrl('/dashboard');

            this.dialogService.changePassword(
              'Change Password Form',
              'Login successful, update your password now!'
            );
          } else {
            this.router.navigateByUrl('/dashboard');
          }

          this.toastrService.success('Login successfully', 'Success');
          return new AuthActions.LogInSuccess(user);
        }),
        catchError(res => {
          this.toastrService.error(res.error.message, 'Failure');
          return of(new AuthActions.LogInFailure(res.error.message));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('role', user.payload.scope);
      localStorage.setItem('id', user.payload.id);
      localStorage.setItem('username', user.payload.username);
    })
  );

  @Effect()
  ChangePassword$ = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD),
    map((action: AuthActions.ChangePassword) => action.payload),
    switchMap(payload => {
      return this.authService.changePassword(payload).pipe(
        map(res => {
          this.dialogService.closeChangePassword();
          this.toastrService.success(res.message, 'Success');

          return new AuthActions.ChangePasswordSuccess(res);
        }),
        catchError(res => {
          this.toastrService.error(res.error.message, 'Failure');
          return of(new AuthActions.ChangePasswordFailure(res.error.message));
        })
      );
    })
  );

  @Effect()
  ResetPassword$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: AuthActions.ResetPassword) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword(payload).pipe(
        map(res => {
          this.dialogService.closeConfirm();
          this.toastrService.success(res.message, 'Success');
          return new AuthActions.ResetPasswordSuccess(res);
        }),
        catchError(res => {
          this.toastrService.error(res.error.message, 'Failure');
          return of(new AuthActions.ResetPasswordFailure(res.error.message));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    })
  );
}
