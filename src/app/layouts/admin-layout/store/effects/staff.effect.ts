import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";

import * as StaffActions from "../actions/staff.action";
import { map, catchError, switchMap } from "rxjs/operators";
import { StaffService } from "../../services/staff.service";
import { Router } from "@angular/router";

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions$: Actions,
    private staffservice: StaffService,
    private route: Router
  ) {}

  @Effect()
  getAllStaffs$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFFS),
    switchMap(res => {
      console.log(res);
      return this.staffservice.getStaffs().pipe(
        map(staffs => {
          return new StaffActions.GetStaffsSuccess(staffs);
        }),
        catchError(err => [new StaffActions.GetStaffsFail(err)])
      );
    })
  );

  @Effect()
  getStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.GET_STAFF),
    map((action: StaffActions.GetStaff) => action.payload),
    switchMap(id => {
      return this.staffservice.getStaff(id).pipe(
        map(staff => {
          return new StaffActions.GetStaffSuccess(staff);
        }),
        catchError(err => [new StaffActions.GetStaffFail(err)])
      );
    })
  );

  @Effect()
  updateStaff$ = this.actions$.pipe(
    ofType(StaffActionsType.UPDATE_STAFF),
    map((action: StaffActions.UpdateStaff) => action.payload),
    switchMap(staff => {
      return this.staffservice.updateStaff(staff).pipe(
        map(res => {
          console.log(res);
          this.route.navigate(["/admin/" + staff.id + "/detail"]);
          return new StaffActions.UpdateStaffSuccess(staff);
        }),
        catchError(err => [new StaffActions.UpdateStaffFail(err)])
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
          console.log(res);
          this.route.navigate(["/admin"]);
          return new StaffActions.CreateStaffSuccess(res);
        }),
        catchError(err => [new StaffActions.CreateStaffFail(err)])
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
          console.log(res);
          this.route.navigate(["admin"]);
          return new StaffActions.DeleteStaffSuccess(res);
        }),
        catchError(err => [new StaffActions.DeleteStaffFail(err)])
      );
    })
  );
}
