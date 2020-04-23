import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as CampaignActions from '../actions/campaign.action';
import { DialogService } from '../../services/dialog.service';
import { CampaignService } from '../../services/campaign.service';

const { CampaignActionsType } = CampaignActions;

@Injectable()
export class CampaignEffects {
  constructor(
    private actions: Actions,
    private campaignService: CampaignService,
    private dialogService: DialogService
  ) {}

  @Effect()
  createCampaign$ = this.actions.pipe(
    ofType(CampaignActionsType.CREATE_CAMPAIGN),
    map((action: CampaignActions.CreateCampaign) => action.payload),
    switchMap(obj => {
      return this.campaignService.createCampaign(obj).pipe(
        map(res => {
          this.dialogService.closeCreateCampaign();
          return new CampaignActions.CreateCampaignSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.CreateCampaignFail(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getCampaigns$ = this.actions.pipe(
    ofType(CampaignActionsType.GET_CAMPAIGN),
    map((action: CampaignActions.GetCampaign) => action.payload),
    switchMap(query => {
      return this.campaignService.getCampaigns(query).pipe(
        map(res => {
          return new CampaignActions.GetCampaignSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.GetCampaignFail(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getCampaignDetail$ = this.actions.pipe(
    ofType(CampaignActionsType.GET_CAMPAIGN_DETAIL),
    map((action: CampaignActions.GetCampaignDetail) => action.payload),
    switchMap(id => {
      return this.campaignService.getCampaignDetail(id).pipe(
        map(res => {
          return new CampaignActions.GetCampaignDetailSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.GetCampaignDetailFailure(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getCampaignListStaff$ = this.actions.pipe(
    ofType(CampaignActionsType.GET_CAMPAIGN_LIST_STAFF),
    map((action: CampaignActions.GetCampaignListStaff) => action.payload),
    switchMap(res => {
      return this.campaignService.getCampaignListStaff(res.id).pipe(
        map(res => {
          return new CampaignActions.GetCampaignListStaffSuccess(res.staffs);
        }),
        catchError(res => [
          new CampaignActions.GetCampaignListStaffFailure(res.error.message)
        ])
      );
    })
  );

  @Effect()
  getVotingHistory$ = this.actions.pipe(
    ofType(CampaignActionsType.GET_VOTING_HISTORY),
    map((action: CampaignActions.GetVotingHistory) => action.payload),
    switchMap(res => {
      return this.campaignService.getVotingHistory(res.id, res.userId).pipe(
        map(res1 => {
          return new CampaignActions.GetVotingHistorySuccess(
            res1.votingHistory
          );
        }),
        catchError(res2 => [
          new CampaignActions.GetVotingHistoryFailure(res2.error.message)
        ])
      );
    })
  );

  @Effect()
  updateCampaign$ = this.actions.pipe(
    ofType(CampaignActionsType.UPDATE_CAMPAIGN),
    map((action: CampaignActions.UpdateCampaign) => action.payload),
    switchMap(res => {
      return this.campaignService.updateCampaign(res.id, res.campaign).pipe(
        map(() => {
          this.dialogService.closeUpdateCampaign();
          return new CampaignActions.UpdateCampaignSuccess(res);
        }),
        catchError(res1 => [
          new CampaignActions.UpdateCampaignFail(res1.error.message)
        ])
      );
    })
  );

  @Effect()
  deleteCampagin$ = this.actions.pipe(
    ofType(CampaignActionsType.DELETE_CAMPAIGN),
    map((action: CampaignActions.DeleteCampaign) => action.payload),
    switchMap(res => {
      return this.campaignService.deleteCampagin(res.id).pipe(
        map(() => {
          this.dialogService.closeDeleteCampaign();
          return new CampaignActions.DeleteCampaignSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.DeleteCampaignFailure(res.error.message)
        ])
      );
    })
  );

  @Effect()
  vote$ = this.actions.pipe(
    ofType(CampaignActionsType.VOTE),
    map((action: CampaignActions.Vote) => action.payload),

    switchMap(res => {
      return this.campaignService.vote(res.id, res.voting).pipe(
        map(() => {
          return new CampaignActions.VoteSuccess(res);
        }),
        catchError(res => [new CampaignActions.VoteFailure(res.error.message)])
      );
    })
  );

  @Effect()
  devote$ = this.actions.pipe(
    ofType(CampaignActionsType.DEVOTE),
    map((action: CampaignActions.Devote) => action.payload),
    switchMap(res => {
      return this.campaignService.devote(res.id, res.voting).pipe(
        map(() => {
          return new CampaignActions.DevoteSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.DevoteFailure(res.error.message)
        ])
      );
    })
  );
}
