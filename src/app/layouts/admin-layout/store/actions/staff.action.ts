import { Action } from '@ngrx/store';
import { Staff } from '../../models/staff.model';
import { Campaign } from '../../models/campaign.model';

export enum StaffActionsType {
  GET_STAFFS = '[Staff] Get Staffs',
  GET_STAFFS_SUCCESS = '[Staff] Get Staffs Success',
  GET_STAFFS_FAILURE = '[Staff] Get Staffs Fail',

  GET_STAFFS_QUERY = '[Staff] Get Staffs From Query',
  GET_STAFFS_QUERY_SUCCESS = '[Staff] Get Staffs From Query Success',
  GET_STAFFS_QUERY_FAILURE = '[Staff] Get Staffs From Query Fail',

  GET_STAFF = '[Staff] Get Staff',
  GET_STAFF_SUCCESS = '[Staff] Get Staff Success',
  GET_STAFF_FAILURE = '[Staff] Get Staff Fail',

  CREATE_ACCOUNT = '[Auth] CreateAccount',
  CREATE_ACCOUNT_SUCCESS = '[Auth] CreateAccountSuccess',
  CREATE_ACCOUNT_FAILURE = '[Auth] CreateAccountFailure',

  CREATE_CAMPAIGN = '[Campaign] Create Campaign',
  CREATE_CAMPAIGN_SUCCESS = '[Campaign] Create Campaign Success',
  CREATE_CAMPAIGN_FAILURE = '[Campaign] Create Campaign Failure',

  GET_CAMPAIGN = '[Campaign] Get Campaign',
  GET_CAMPAIGN_SUCCESS = '[Campaign] Get Campaign Success',
  GET_CAMPAIGN_FAILURE = '[Campaign] Get Campaign Failure',

  GET_CAMPAIGN_DETAIL = '[Campaign] Get Campaign Detail',
  GET_CAMPAIGN_DETAIL_SUCCESS = '[Campaign] Get Campaign Detail Success',
  GET_CAMPAIGN_DETAIL_FAILURE = '[Campaign] Get Campaign Detail Failure',

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
  DELETE_CAMPAIGN_FAILURE = '[Campaign] Delete Campaign Failure'
}

export class GetStaffs implements Action {
  public readonly type = StaffActionsType.GET_STAFFS;
  constructor(public payload?: any) {}
}

export class GetStaffsSuccess implements Action {
  public readonly type = StaffActionsType.GET_STAFFS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetStaffsFail implements Action {
  public readonly type = StaffActionsType.GET_STAFFS_FAILURE;
  constructor(public payload: Error) {}
}

export class GetStaff implements Action {
  public readonly type = StaffActionsType.GET_STAFF;
  constructor(public payload: number) {}
}

export class GetStaffSuccess implements Action {
  public readonly type = StaffActionsType.GET_STAFF_SUCCESS;
  constructor(public payload: Staff) {}
}

export class GetStaffFail implements Action {
  public readonly type = StaffActionsType.GET_STAFF_FAILURE;
  constructor(public payload: Error) {}
}

export class CreateAccount implements Action {
  readonly type = StaffActionsType.CREATE_ACCOUNT;
  constructor(public payload: any) {}
}

export class CreateAccountSuccess implements Action {
  readonly type = StaffActionsType.CREATE_ACCOUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateAccountFailure implements Action {
  readonly type = StaffActionsType.CREATE_ACCOUNT_FAILURE;
  constructor(public payload: any) {}
}

export class CreateCampaign implements Action {
  public readonly type = StaffActionsType.CREATE_CAMPAIGN;
  constructor(public payload: any) {}
}
export class CreateCampaignSuccess implements Action {
  public readonly type = StaffActionsType.CREATE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class CreateCampaignFail implements Action {
  public readonly type = StaffActionsType.CREATE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaign implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN;
  constructor(public payload?: any) {}
}
export class GetCampaignSuccess implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class GetCampaignFail implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_FAILURE;
  constructor(public payload: Error) {}
}

export class GetCampaignDetail implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_DETAIL;
  constructor(public payload: any) {}
}

export class GetCampaignDetailSuccess implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_DETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCampaignDetailFailure implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_DETAIL_FAILURE;
  constructor(public payload: any) {}
}

export class GetCampaignListStaff implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_LIST_STAFF;
  constructor(public payload: any) {}
}

export class GetCampaignListStaffSuccess implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_LIST_STAFF_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCampaignListStaffFailure implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_LIST_STAFF_FAILURE;
  constructor(public payload: Error) {}
}

export class GetVotingHistory implements Action {
  public readonly type = StaffActionsType.GET_VOTING_HISTORY;
  constructor(public payload: { id: number; userId: number }) {}
}

export class GetVotingHistorySuccess implements Action {
  public readonly type = StaffActionsType.GET_VOTING_HISTORY_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVotingHistoryFailure implements Action {
  public readonly type = StaffActionsType.GET_VOTING_HISTORY_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateCampaign implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN;
  constructor(public payload: { id: number; campaign: Campaign }) {}
}
export class UpdateCampaignSuccess implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateCampaignFail implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteCampaign implements Action {
  public readonly type = StaffActionsType.DELETE_CAMPAIGN;
  constructor(public payload: number) {}
}

export class DeleteCampaignSuccess implements Action {
  public readonly type = StaffActionsType.DELETE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCampaignFailure implements Action {
  public readonly type = StaffActionsType.DELETE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export type StaffActions =
  | GetStaffs
  | GetStaffsSuccess
  | GetStaffsFail
  | GetStaff
  | GetStaffSuccess
  | GetStaffFail
  | CreateAccount
  | CreateAccountSuccess
  | CreateAccountFailure
  | CreateCampaign
  | CreateCampaignSuccess
  | CreateCampaignFail
  | GetCampaign
  | GetCampaignSuccess
  | GetCampaignFail
  | GetCampaignDetail
  | GetCampaignDetailSuccess
  | GetCampaignDetailFailure
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
  | DeleteCampaignFailure;
