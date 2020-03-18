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
        catchError(res => {
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
    })
  );

  @Effect()
  CreateAccount$ = this.actions.pipe(
    ofType(AuthActionTypes.CREATE_ACCOUNT),
    map((action: AuthActions.CreateAccount) => action.payload),
    switchMap(payload => {
      return this.authService.create(payload).pipe(
        map(user => {
          this.router.navigateByUrl('/dashboard');
          return new AuthActions.CreateAccountSuccess(user);
        }),
        catchError(res =>
          of(new AuthActions.CreateAccountFailure(res.error.message))
        )
      );
    })
  );

  @Effect()
  ChangePassword$ = this.actions.pipe(
    ofType(AuthActionTypes.CHANGE_PASSWORD),
    map((action: AuthActions.ChangePassword) => action.payload),
    switchMap(payload => {
      return this.authService.changePassword(payload).pipe(
        map(user => {
          this.router.navigateByUrl('/login');
          return new AuthActions.ChangePasswordSuccess(user);
        }),
        catchError(res =>
          of(new AuthActions.ChangePasswordFailure(res.error.message))
        )
      );
    })
  );

  @Effect()
  ResetPassword$: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.RESET_PASSWORD),
    map((action: AuthActions.ResetPassword) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword({ userId: payload }).pipe(
        map(user => {
          this.router.navigateByUrl('/dashboard');
          return new AuthActions.ResetPasswordSuccess(user);
        }),
        catchError(res =>
          of(new AuthActions.ResetPasswordFailure(res.error.message))
        )
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
