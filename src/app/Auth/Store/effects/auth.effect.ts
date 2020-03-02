import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import { tap, map, switchMap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import {
  AuthActionTypes,
  LogInSuccess,
  LogInFailure,
  LogOut,
  GetStatus
} from "../actions/auth.action";
import { LogIn } from "../actions/user.action";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(ofType(AuthActionTypes.LOGIN))
    .pipe(map((action: LogIn) => action.payload))
    .pipe(
      switchMap(payload => {
        return this.authService
          .logIn(payload)
          .map(user => {
            console.log(user);
            return new LogInSuccess({
              token: user.token,
              username: payload.username
            });
          })
          .catch(error => {
            console.log(error);
            return Observable.of(new LogInFailure({ error: error }));
          });
      })
    );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      localStorage.setItem("token", user.payload.token);
      this.router.navigateByUrl("/");
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(user => {
      localStorage.removeItem("token");
    })
  );
}
