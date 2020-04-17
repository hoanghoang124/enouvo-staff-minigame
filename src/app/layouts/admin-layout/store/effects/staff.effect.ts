import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StaffService } from '../../services/staff.service';
import { Router } from '@angular/router';
import * as StaffActions from '../actions/staff.action';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions: Actions,
    private staffservice: StaffService,
    private route: Router
  ) {}

  @Effect()
  getAllStaffs$ = this.actions.pipe(
    ofType(StaffActionsType.GET_STAFFS),
    map((action: StaffActions.GetStaffs) => action.payload),
    switchMap(query => {
      return this.staffservice.getStaffs(query).pipe(
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
      return this.staffservice.getStaff(id).pipe(
        map(res => {
          return new StaffActions.GetStaffSuccess(res.profile);
        }),
        catchError(res => [new StaffActions.GetStaffFail(res.error.message)])
      );
    })
  );

  @Effect()
  CreateAccount$ = this.actions.pipe(
    ofType(StaffActionsType.CREATE_ACCOUNT),
    map((action: StaffActions.CreateAccount) => action.payload),
    switchMap(payload => {
      return this.staffservice.create(payload).pipe(
        map(() => {
          this.route.navigateByUrl('/tables');
          return new StaffActions.CreateAccountSuccess(payload);
        }),
        catchError(res =>
          of(new StaffActions.CreateAccountFailure(res.error.message))
        )
      );
    })
  );

  @Effect()
  createCampaign$ = this.actions.pipe(
    ofType(StaffActionsType.CREATE_CAMPAIGN),
    map((action: StaffActions.CreateCampaign) => action.payload),
    switchMap(obj => {
      return this.staffservice.createCampaign(obj).pipe(
        map(campaignId => {
          const campaign = { id: campaignId, ...obj };
          return new StaffActions.CreateCampaignSuccess(campaign);
        }),
        catchError(res => [
          new StaffActions.CreateCampaignFail(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getCampaigns$ = this.actions.pipe(
    ofType(StaffActionsType.GET_CAMPAIGN),
    map((action: StaffActions.GetCampaign) => action.payload),
    switchMap(query => {
      return this.staffservice.getCampaigns(query).pipe(
        map(res => {
          return new StaffActions.GetCampaignSuccess(res);
        }),
        catchError(res => [new StaffActions.GetCampaignFail(res.error.message)])
      );
    })
  );

  @Effect()
  updateCampaign$ = this.actions.pipe(
    ofType(StaffActionsType.UPDATE_CAMPAIGN),
    map((action: StaffActions.UpdateCampaign) => action.payload),
    switchMap(res => {
      return this.staffservice.updateCampaign(res.id, res.campaign).pipe(
        map(() => {
          return new StaffActions.UpdateCampaignSuccess(res);
        }),
        catchError(res => [
          new StaffActions.UpdateCampaignFail(res.error.message)
        ])
      );
    })
  );
}
