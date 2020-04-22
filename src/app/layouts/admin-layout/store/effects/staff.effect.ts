import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { StaffService } from '../../services/staff.service';
// import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import * as StaffActions from '../actions/staff.action';

const { StaffActionsType } = StaffActions;

@Injectable()
export class StaffEffects {
  constructor(
    private actions: Actions,
    private staffservice: StaffService,
    private dialogService: DialogService // private route: Router
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

  @Effect({ dispatch: false })
  GetStaffSuccess: Observable<any> = this.actions.pipe(
    ofType(StaffActionsType.GET_STAFF_SUCCESS),
    tap(staff => {
      localStorage.setItem('firstName', staff.payload.firstName);
      localStorage.setItem('avatarUrl', staff.payload.avatarUrl);
    })
  );

  @Effect()
  CreateAccount$ = this.actions.pipe(
    ofType(StaffActionsType.CREATE_ACCOUNT),
    map((action: StaffActions.CreateAccount) => action.payload),
    switchMap(payload => {
      return this.staffservice.create(payload).pipe(
        map(() => {
          this.dialogService.closeCreateAccount();
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
        map(res => {
          this.dialogService.closeCreateCampaign();
          return new StaffActions.CreateCampaignSuccess(res);
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
  getCampaginDetail$ = this.actions.pipe(
    ofType(StaffActionsType.GET_CAMPAIGN_DETAIL),
    map((action: StaffActions.GetCampaignDetail) => action.payload),
    switchMap(id => {
      return this.staffservice.getCampaignDetail(id).pipe(
        map(res => {
          return new StaffActions.GetCampaignDetailSuccess(res);
        }),
        catchError(res => [
          new StaffActions.GetCampaignDetailFailure(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getCampaginListStaff$ = this.actions.pipe(
    ofType(StaffActionsType.GET_CAMPAIGN_LIST_STAFF),
    map((action: StaffActions.GetCampaignListStaff) => action.payload),
    switchMap(id => {
      return this.staffservice.getCampaignListStaff(id).pipe(
        map(res => {
          return new StaffActions.GetCampaignListStaffSuccess(res.staffs);
        }),
        catchError(res => [
          new StaffActions.GetCampaignListStaffFailure(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getVotingHistory$ = this.actions.pipe(
    ofType(StaffActionsType.GET_VOTING_HISTORY),
    map((action: StaffActions.GetVotingHistory) => action.payload),
    switchMap(res => {
      return this.staffservice.getVotingHistory(res.id, res.userId).pipe(
        map(res1 => {
          return new StaffActions.GetVotingHistorySuccess(res1.votingHistory);
        }),
        catchError(res2 => [
          new StaffActions.GetVotingHistoryFailure(res2.error.message)
        ])
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
          this.dialogService.closeUpdateCampaign();
          return new StaffActions.UpdateCampaignSuccess(res);
        }),
        catchError(res1 => [
          new StaffActions.UpdateCampaignFail(res1.error.message)
        ])
      );
    })
  );

  @Effect()
  deleteCampagin$ = this.actions.pipe(
    ofType(StaffActionsType.DELETE_CAMPAIGN),
    map((action: StaffActions.DeleteCampaign) => action.payload),
    switchMap(res => {
      return this.staffservice.deleteCampagin(res.id).pipe(
        map(() => {
          this.dialogService.closeDeleteCampaign();
          return new StaffActions.DeleteCampaignSuccess(res);
        }),
        catchError(res => [
          new StaffActions.DeleteCampaignFailure(res.error.message)
        ])
      );
    })
  );
}
