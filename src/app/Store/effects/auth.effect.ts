import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../Auth/Services/auth.service';
import * as AuthActions from '../actions/auth.action';
const { AuthActionTypes } = AuthActions;

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  logIn$ = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: AuthActions.LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload).pipe(
        map(user => {
          if (user.shouldUserChangePassword) {
            this.router.navigateByUrl('/change-password');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
          return new AuthActions.LogInSuccess(user);
        }),
        catchError(error => of(new AuthActions.LogInFailure(error)))
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
    })
  );

  @Effect()
  Register$ = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER),
    map((action: AuthActions.Register) => action.payload),
    switchMap(payload => {
      return this.authService.register(payload).pipe(
        map(user => {
          this.router.navigateByUrl('/dashboard');
          return new AuthActions.RegisterSuccess(user);
        }),
        catchError(error => of(new AuthActions.RegisterFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('username', user.payload.username);
      localStorage.setItem('email', user.payload.email);
    })
  );

  @Effect()
  ChangePassword$ = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD),
    map((action: AuthActions.ChangePassword) => action.payload),
    switchMap(payload => {
      return this.authService.changePassword(payload).pipe(
        map(user => {
          this.router.navigateByUrl('/dashboard');
          return new AuthActions.ChangePasswordSuccess(user);
        }),
        catchError(error => of(new AuthActions.ChangePasswordFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  ChangePasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('password', user.payload.password);
      localStorage.setItem('newPassword', user.payload.newPassword);
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  ResetPassword$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: AuthActions.ResetPassword) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword({ userId: payload }).pipe(
        map(user => {
          return new AuthActions.ResetPasswordSuccess(user);
        }),
        catchError(error => of(new AuthActions.ResetPasswordFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  ResetPasswordSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD_SUCCESS),
    tap(user => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('id', user.payload.id);
      this.router.navigateByUrl('/dashboard');
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
