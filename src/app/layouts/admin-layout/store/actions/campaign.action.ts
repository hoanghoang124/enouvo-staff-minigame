import { Action } from '@ngrx/store';
import { Campaign } from '../../models/campaign.model';
import { VotingStars } from '../../models/voting.model';

export enum CampaignActionsType {
  CREATE_CAMPAIGN = '[Campaign] Create Campaign',
  CREATE_CAMPAIGN_SUCCESS = '[Campaign] Create Campaign Success',
  CREATE_CAMPAIGN_FAILURE = '[Campaign] Create Campaign Failure',

  GET_CAMPAIGN = '[Campaign] Get Campaign',
  GET_CAMPAIGN_SUCCESS = '[Campaign] Get Campaign Success',
  GET_CAMPAIGN_FAILURE = '[Campaign] Get Campaign Failure',

  GET_CAMPAIGN_DETAIL = '[Campaign] Get Campaign Detail',
  GET_CAMPAIGN_DETAIL_SUCCESS = '[Campaign] Get Campaign Detail Success',
  GET_CAMPAIGN_DETAIL_FAILURE = '[Campaign] Get Campaign Detail Failure',

  GET_CAMPAIGN_DETAIL_FOR_VOTING = '[Campaign] Get Campaign Detail For Voting',
  GET_CAMPAIGN_DETAIL_FOR_VOTING_SUCCESS = '[Campaign] Get Campaign Detail For Voting Success',
  GET_CAMPAIGN_DETAIL_FOR_VOTING_FAILURE = '[Campaign] Get Campaign Detail For Voting Failure',

  GET_CAMPAIGN_LIST_STAFF = '[Campaign] Get Campaign List Staff',
  GET_CAMPAIGN_LIST_STAFF_SUCCESS = '[Campaign] Get Campaign List Staff Success',
  GET_CAMPAIGN_LIST_STAFF_FAILURE = '[Campaign] Get Campaign List Staff Failure',

  GET_VOTING_HISTORY = '[Campaign] Get Voting History',
  GET_VOTING_HISTORY_SUCCESS = '[Campaign] Get Voting History Success',
  GET_VOTING_HISTORY_FAILURE = '[Campaign] Get Voting History Failure',

  UPDATE_CAMPAIGN = '[Campaign] Update Campaign',
  UPDATE_CAMPAIGN_SUCCESS = '[Campaign] Update Campaign Success',
  UPDATE_CAMPAIGN_FAILURE = '[Campaign] Update Campaign Failure',

  DELETE_CAMPAIGN = '[Campaign] Delete Campaign',
  DELETE_CAMPAIGN_SUCCESS = '[Campaign] Delete Campaign Success',
  DELETE_CAMPAIGN_FAILURE = '[Campaign] Delete Campaign Failure',

  VOTE = '[Campaign] Vote',
  VOTE_SUCCESS = '[Campaign] Vote Success',
  VOTE_FAILURE = '[Campaign] Vote Failure'
}

export class CreateCampaign implements Action {
  public readonly type = CampaignActionsType.CREATE_CAMPAIGN;
  constructor(public payload: any) {}
}
export class CreateCampaignSuccess implements Action {
  public readonly type = CampaignActionsType.CREATE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateCampaignFail implements Action {
  public readonly type = CampaignActionsType.CREATE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaign implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN;
  constructor(public payload?: any) {}
}
export class GetCampaignSuccess implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class GetCampaignFail implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaignDetail implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_DETAIL;
  constructor(public payload: any) {}
}

export class GetCampaignDetailSuccess implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_DETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCampaignDetailFailure implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_DETAIL_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaignDetailForVoting implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_DETAIL_FOR_VOTING;
  constructor(public payload: any) {}
}

export class GetCampaignDetailForVotingSuccess implements Action {
  public readonly type =
    CampaignActionsType.GET_CAMPAIGN_DETAIL_FOR_VOTING_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCampaignDetailForVotingFailure implements Action {
  public readonly type =
    CampaignActionsType.GET_CAMPAIGN_DETAIL_FOR_VOTING_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaignListStaff implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_LIST_STAFF;
  constructor(public payload: { id: number }) {}
}

export class GetCampaignListStaffSuccess implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_LIST_STAFF_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCampaignListStaffFailure implements Action {
  public readonly type = CampaignActionsType.GET_CAMPAIGN_LIST_STAFF_FAILURE;
  constructor(public payload: any) {}
}

export class GetVotingHistory implements Action {
  public readonly type = CampaignActionsType.GET_VOTING_HISTORY;
  constructor(public payload: { id: number; userId: number }) {}
}

export class GetVotingHistorySuccess implements Action {
  public readonly type = CampaignActionsType.GET_VOTING_HISTORY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVotingHistoryFailure implements Action {
  public readonly type = CampaignActionsType.GET_VOTING_HISTORY_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateCampaign implements Action {
  public readonly type = CampaignActionsType.UPDATE_CAMPAIGN;
  constructor(public payload: { id: number; campaign: Campaign }) {}
}
export class UpdateCampaignSuccess implements Action {
  public readonly type = CampaignActionsType.UPDATE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateCampaignFail implements Action {
  public readonly type = CampaignActionsType.UPDATE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteCampaign implements Action {
  public readonly type = CampaignActionsType.DELETE_CAMPAIGN;
  constructor(public payload: { id: number }) {}
}

export class DeleteCampaignSuccess implements Action {
  public readonly type = CampaignActionsType.DELETE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCampaignFailure implements Action {
  public readonly type = CampaignActionsType.DELETE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class Vote implements Action {
  public readonly type = CampaignActionsType.VOTE;
  constructor(public payload: { id: number; voting: VotingStars }) {}
}

export class VoteSuccess implements Action {
  public readonly type = CampaignActionsType.VOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class VoteFailure implements Action {
  public readonly type = CampaignActionsType.VOTE_FAILURE;
  constructor(public payload: any) {}
}

export type CampaignActions =
  | CreateCampaign
  | CreateCampaignSuccess
  | CreateCampaignFail
  | GetCampaign
  | GetCampaignSuccess
  | GetCampaignFail
  | GetCampaignDetail
  | GetCampaignDetailSuccess
  | GetCampaignDetailFailure
  | GetCampaignDetailForVoting
  | GetCampaignDetailForVotingSuccess
  | GetCampaignDetailForVotingFailure
  | GetCampaignListStaff
  | GetCampaignListStaffSuccess
  | GetCampaignListStaffFailure
  | GetVotingHistory
  | GetVotingHistorySuccess
  | GetVotingHistoryFailure
  | UpdateCampaign
  | UpdateCampaignSuccess
  | UpdateCampaignFail
  | DeleteCampaign
  | DeleteCampaignSuccess
  | DeleteCampaignFailure
  | Vote
  | VoteSuccess
  | VoteFailure;
