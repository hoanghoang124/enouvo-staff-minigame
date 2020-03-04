import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import * as StaffActions from '../actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/Main/Models/staff.model';
import { StaffService } from '../../Main/Services/staff.service';
import { State } from '../reducers';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions$: Actions,
    private staffservice: StaffService,
    private store: Store<State>
  ) {}

  @Effect()
  getAllStaffs$: Observable<Action> = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFFS),
    switchMap(() => this.staffservice.getStaffs()),
    map(staffs => new StaffActions.GetStaffsSuccess(staffs)),
    catchError(err => [new StaffActions.GetStaffsFail(err)])
  );

  @Effect()
  getStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFF),
    map((action: StaffActions.GetStaff) => action.payload),
    switchMap(id => this.staffservice.getStaff(id)),
    map(staff => new StaffActions.GetStaffSuccess(staff)),
    catchError(err => [new StaffActions.GetStaffFail(err)])
  );

  @Effect()
  updateStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.UPDATE_STAFF),
    map((action: StaffActions.UpdateStaff) => action.payload),
    switchMap(staff => this.staffservice.updateStaff(staff)),
    map(() => new StaffActions.UpdateStaffSuccess()),
    catchError(err => [new StaffActions.UpdateStaffFail(err)])
  );

  @Effect()
  createStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.CREATE_STAFF),
    map((action: StaffActions.CreateStaff) => action.payload),
    switchMap(newStaff => this.staffservice.createStaff(newStaff)),
    map(response => new StaffActions.CreateStaffSuccess(response.id)),
    catchError(err => [new StaffActions.CreateStaffFail(err)])
  );

  @Effect()
  removeStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.DELETE_STAFF),
    map((action: StaffActions.DeleteStaff) => action.payload),
    switchMap(id => this.staffservice.deleteStaff(id)),
    map((staff: Staff) => new StaffActions.DeleteStaffSuccess(staff)),
    catchError(err => [new StaffActions.DeleteStaffFail(err)])
  );
}
