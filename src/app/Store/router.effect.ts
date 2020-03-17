import { NavigationExtras, Router, ActivationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { map, tap, filter } from 'rxjs/operators';
import { AppState } from '../Main/Store/reducers';

export class RouterGo implements Action {
  readonly type = '[Router] Go';

  constructor(
      public payload: {
          path: any[];
          queryParams?: object;
          extras?: NavigationExtras;
      }
  ) {}
}

export class RouterBack implements Action {
  readonly type = '[Router] Back';
}

export class RouterForward implements Action {
  readonly type = '[Router] Forward';
}

export class RouteChange implements Action {
  readonly type = '[Router] Route Change';
  constructor(public payload: { params: any, path: string }) {}
}

@Injectable()
export class RouterEffects {
  constructor(
      private actions$: Actions,
      private router: Router,
      private location: Location,
      private store: Store<AppState>
  ) {
      this.listenToRouter();
  }

  // @Effect({ dispatch: false })
  // navigate$ = this.actions$.pipe(
  //     ofType('[Router] Go'),
  //     map((action: RouterGo) => action.payload),
  //     tap(({ path, queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
  // );

  // @Effect({ dispatch: false })
  // navigateBack$ = this.actions$.pipe(ofType('[Router] Back'), tap(() => this.location.back()));

  // @Effect({ dispatch: false })
  // navigateForward$ = this.actions$.pipe(
  //     ofType('[Router] Forward'),
  //     tap(() => this.location.forward())
  // );

  private listenToRouter() {
      this.router.events.pipe(
          filter(event => event instanceof ActivationEnd)
      ).subscribe((event: ActivationEnd) =>
          this.store.dispatch(new RouteChange({
              params: { ...event.snapshot.params },
              path: event.snapshot.routeConfig.path
          }))
      );
  }
}
