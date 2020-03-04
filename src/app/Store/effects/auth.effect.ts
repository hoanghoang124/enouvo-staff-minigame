import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { tap, map, switchMap, catchError } from "rxjs/operators";
import { AuthService } from "../../Auth/Services/auth.service";
import * as AuthActions from "../actions/auth.action";
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
      localStorage.setItem("token", user.payload.token);
      localStorage.setItem("role", user.payload.scope);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      localStorage.removeItem("token");
    })
  );
}
