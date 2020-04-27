import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StaffService } from '../../services/staff.service';
import { DialogService } from '../../services/dialog.service';
import * as StaffActions from '../actions/staff.action';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions: Actions,
    private staffService: StaffService,
    private dialogService: DialogService // private route: Router
  ) {}

  @Effect()
  createStaff$ = this.actions.pipe(
    ofType(StaffActionsType.CREATE_STAFF),
    map((action: StaffActions.CreateStaff) => action.payload),
    switchMap(payload => {
      return this.staffService.createStaff(payload).pipe(
        map(() => {
          this.dialogService.closeCreateAccount();
          return new StaffActions.CreateStaffSuccess(payload);
        }),
        catchError(res =>
          of(new StaffActions.CreateStaffFailure(res.error.message))
        )
      );
    })
  );

  @Effect()
  getAllStaffs$ = this.actions.pipe(
    ofType(StaffActionsType.GET_STAFFS),
    map((action: StaffActions.GetStaffs) => action.payload),
    switchMap(query => {
      return this.staffService.getStaffs(query).pipe(
        map(res => {
          return new StaffActions.GetStaffsSuccess(res);
        }),
        catchError(res => [new StaffActions.GetStaffsFail(res.error.message)])
      );
    })
  );

  @Effect()
  getStaff$ = this.actions.pipe(
    ofType(StaffActionsType.GET_STAFF),
    map((action: StaffActions.GetStaff) => action.payload),
    switchMap(id => {
      return this.staffService.getStaff(id).pipe(
        map(res => {
          return new StaffActions.GetStaffSuccess(res.profile);
        }),
        catchError(res => [new StaffActions.GetStaffFail(res.error.message)])
      );
    })
  );
}
