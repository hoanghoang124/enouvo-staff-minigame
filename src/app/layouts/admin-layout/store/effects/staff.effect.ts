import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';

import * as StaffActions from '../actions/staff.action';
import { map, catchError, switchMap } from 'rxjs/operators';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';

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
    ofType(StaffActionsType.GET_STAFFS_SUCCESS),
    switchMap(() => {
      return this.staffservice.getStaffs();
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
  createStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.CREATE_STAFF),
    map((action: StaffActions.CreateStaff) => action.payload),
    switchMap(staff => {
      return this.staffservice.createStaff(staff).pipe(
        map(res => {
          this.route.navigate(['/admin']);
          return new StaffActions.CreateStaffSuccess(res);
        }),
        catchError(res => [new StaffActions.CreateStaffFail(res.error.message)])
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

  @Effect()
  uploadCSV$ = this.actions$.pipe(
    ofType(StaffActionsType.UPLOAD_CSV),
    map((action: StaffActions.UploadCSV) => action.payload),
    switchMap(file => {
      console.log(file);
      return this.staffservice.uploadCSV(file).pipe(
        map(() => {
          return new StaffActions.UploadCSVSuccess();
        }),
        catchError(() => [new StaffActions.UploadCSVFailure()])
      );
    })
  );
}
