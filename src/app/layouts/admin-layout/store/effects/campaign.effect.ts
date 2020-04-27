import { ToastrService } from 'ngx-toastr';
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
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  @Effect()
  createCampaign$ = this.actions.pipe(
    ofType(CampaignActionsType.CREATE_CAMPAIGN),
    map((action: CampaignActions.CreateCampaign) => action.payload),
    switchMap(obj => {
      return this.campaignService.createCampaign(obj).pipe(
        map(res => {
          this.dialogService.closeCreateCampaign();
          this.toastrService.success(res.message, 'Success');
          return new CampaignActions.CreateCampaignSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.CreateCampaignFail(res.error.message),
          this.toastrService.error(res.error.message, 'Failure')
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
          new CampaignActions.GetCampaignFail(res.error.message),
          this.toastrService.error(res.error.message, 'Failure')
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
          new CampaignActions.GetCampaignDetailFailure(res.error.message),
          this.toastrService.error(res.error.message, 'Failure')
        ])
      );
    })
  );

  @Effect()
  getCampaignDetailForVoting$ = this.actions.pipe(
    ofType(CampaignActionsType.GET_CAMPAIGN_DETAIL_FOR_VOTING),
    map((action: CampaignActions.GetCampaignDetail) => action.payload),
    switchMap(id => {
      return this.campaignService.getCampaignDetailForVoting(id).pipe(
        map(res => {
          return new CampaignActions.GetCampaignDetailForVotingSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.GetCampaignDetailForVotingFailure(
            res.error.message
          ),
          this.toastrService.error(res.error.message, 'Failure')
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
          return new CampaignActions.GetCampaignListStaffSuccess(res);
        }),
        catchError(res => [
          this.toastrService.error(res.error.message, 'Failure'),
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
          new CampaignActions.GetVotingHistoryFailure(res2.error.message),
          this.toastrService.error(res2.error.message, 'Failure')
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
        map(res => {
          this.dialogService.closeUpdateCampaign();
          this.toastrService.success('Update campaign successfully', 'Success');
          return new CampaignActions.UpdateCampaignSuccess(res);
        }),
        catchError(res1 => [
          new CampaignActions.UpdateCampaignFail(res1.error.message),
          this.toastrService.error(res1.error.message, 'Failure')
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
        map(res => {
          this.dialogService.closeDeleteCampaign();
          this.toastrService.success(res.message, 'Success');
          return new CampaignActions.DeleteCampaignSuccess(res.message);
        }),
        catchError(res => [
          new CampaignActions.DeleteCampaignFailure(res.error.message),
          this.toastrService.error(res.error.message, 'Failure')
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
        map(res => {
          this.toastrService.success(
            'Vote to ' +
              res.voting.receiverId +
              '' +
              res.voting.numberOfStars +
              ' star',
            'Success'
          );
          return new CampaignActions.VoteSuccess(res);
        }),
        catchError(res => [
          new CampaignActions.VoteFailure(res.error.message),
          this.toastrService.error(res.error.message, 'Failure')
        ])
      );
    })
  );
}
