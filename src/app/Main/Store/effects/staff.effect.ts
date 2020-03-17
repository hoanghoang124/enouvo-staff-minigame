import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

import * as StaffActions from '../actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  GetStaff,
  GetStaffSuccess,
  GetStaffsSuccess,
  GetStaffsFail,
  GetStaffFail,
  UpdateStaff,
  UpdateStaffSuccess,
  UpdateStaffFail,
  CreateStaff,
  DeleteStaff,
  CreateStaffSuccess,
  CreateStaffFail,
  DeleteStaffSuccess,
  DeleteStaffFail
} from '../actions';
import { Staff } from 'src/app/Main/Models/staff.model';
import { AppState } from '../reducers';
import { StaffService } from '../../Services/staff.service';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions$: Actions,
    private staffservice: StaffService
  ) {}

  @Effect()
  getAllStaffs$: Observable<Action> = this.actions$.pipe(
    ofType(StaffActions.StaffActionsType.GET_STAFFS),
    switchMap(() => this.staffservice.getStaffs()),
    map(staffs => new GetStaffsSuccess(staffs)),
    catchError(err => [new GetStaffsFail(err)])
  );

  @Effect()
  getStaff$ = this.actions$.pipe(
    ofType(StaffActions.StaffActionsType.GET_STAFF),
    map((action: GetStaff) => action.payload),
    switchMap(id => this.staffservice.getStaff(id)),
    map(staff => new GetStaffSuccess(staff)),
    catchError(err => [new GetStaffFail(err)])
  );

  @Effect()
  updateStaff$ = this.actions$.pipe(
    ofType(StaffActions.StaffActionsType.UPDATE_STAFF),
    map((action: UpdateStaff) => action.payload),
    switchMap(staff => this.staffservice.updateStaff(staff)),
    map(() => new UpdateStaffSuccess()),
    catchError(err => [new UpdateStaffFail(err)])
  );

  @Effect()
  createStaff$ = this.actions$.pipe(
    ofType(StaffActions.StaffActionsType.CREATE_STAFF),
    map((action: CreateStaff) => action.payload),
    switchMap(newStaff => this.staffservice.createStaff(newStaff)),
    map(response => new CreateStaffSuccess(response.id)),
    catchError(err => [new CreateStaffFail(err)])
  );

  @Effect()
  removeStaff$ = this.actions$.pipe(
    ofType(StaffActions.StaffActionsType.DELETE_STAFF),
    map((action: DeleteStaff) => action.payload),
    switchMap(id => this.staffservice.deleteStaff(id)),
    map((staff: Staff) => new DeleteStaffSuccess(staff)),
    catchError(err => [new DeleteStaffFail(err)])
  );
}
