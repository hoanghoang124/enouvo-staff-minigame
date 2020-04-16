import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';

import * as StaffActions from '../actions/staff.action';
import { map, catchError, switchMap } from 'rxjs/operators';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions$: Actions,
    private staffservice: StaffService,
    private route: Router
  ) {}

  @Effect()
  getStaffsQuery$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFFS_QUERY),
    switchMap(action => {
      return this.staffservice.getStaffsQuery(action.payload).pipe(
        map(res => new StaffActions.GetStaffsQuerySuccess(res)),
        catchError(() => of(new StaffActions.GetStaffsQueryFail()))
      );
    })
  );

  @Effect()
  getAllStaffs$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFFS),
    switchMap(() => {
      return this.staffservice.getStaffs().pipe(
        map(res => {
          return new StaffActions.GetStaffsSuccess(res.profiles);
        }),
        catchError(res => [new StaffActions.GetStaffsFail(res.error.message)])
      );
    })
  );

  @Effect()
  getStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFF),
    map((action: StaffActions.GetStaff) => action.payload),
    switchMap(id => {
      return this.staffservice.getStaff(id).pipe(
        map(res => {
          return new StaffActions.GetStaffSuccess(res.profile);
        }),
        catchError(res => [new StaffActions.GetStaffFail(res.error.message)])
      );
    })
  );

  @Effect()
  CreateAccount$ = this.actions$.pipe(
    ofType(StaffActionsType.CREATE_ACCOUNT),
    map((action: StaffActions.CreateAccount) => action.payload),
    switchMap(payload => {
      return this.staffservice.create(payload).pipe(
        map(user => {
          this.route.navigateByUrl('/tables');
          return new StaffActions.CreateAccountSuccess(user);
        }),
        catchError(res =>
          of(new StaffActions.CreateAccountFailure(res.error.message))
        )
      );
    })
  );

  @Effect()
  createCampaign$ = this.actions$.pipe(
    ofType(StaffActionsType.CREATE_CAMPAIGN),
    map((action: StaffActions.CreateCampaign) => action.payload),
    switchMap(campaign => {
      return this.staffservice.createCampaign(campaign).pipe(
        map(res => {
          this.route.navigate(['/admin']);
          return new StaffActions.CreateCampaignSuccess(res);
        }),
        catchError(res => [
          new StaffActions.CreateCampaignFail(res.error.message)
        ])
      );
    })
  );

  @Effect()
  updateStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.UPDATE_STAFF),
    map((action: StaffActions.UpdateStaff) => action.payload),
    switchMap(staff => {
      return this.staffservice.updateStaff(staff).pipe(
        map(() => {
          this.route.navigate(['/admin/' + staff.id + '/detail']);
          return new StaffActions.UpdateStaffSuccess(staff);
        }),
        catchError(res => [new StaffActions.UpdateStaffFail(res.error.message)])
      );
    })
  );

  @Effect()
  removeStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.DELETE_STAFF),
    map((action: StaffActions.DeleteStaff) => action.payload),
    switchMap(staff => {
      return this.staffservice.deleteStaff(staff).pipe(
        map(res => {
          this.route.navigate(['admin']);
          return new StaffActions.DeleteStaffSuccess(res);
        }),
        catchError(res => [new StaffActions.DeleteStaffFail(res.error.message)])
      );
    })
  );
}
