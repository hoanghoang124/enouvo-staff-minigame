import { Action } from '@ngrx/store';
import { Staff } from '../../models/staff.model';

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

  UPDATE_CAMPAIGN = '[Campaign] Update Campaign',
  UPDATE_CAMPAIGN_SUCCESS = '[Campaign] Update Campaign Success',
  UPDATE_CAMPAIGN_FAILURE = '[Campaign] Update Campaign Failure',

  DELETE_STAFF = '[Staff] Deletes Staff',
  DELETE_STAFF_SUCCESS = '[Staff] Deletes Staff Success',
  DELETE_STAFF_FAILURE = '[Staff] Deletes Staff Failure',

  UPDATE_STAFF = '[Staff] Updates Staff',
  UPDATE_STAFF_SUCCESS = '[Staff] Updates Staff Success',
  UPDATE_STAFF_FAILURE = '[Staff] Updates Staff Failure',

  UPLOAD_IMAGE = '[Image] Upload Image',
  UPLOAD_IMAGE_SUCCESS = '[Image] Upload Image Success',
  UPLOAD_IMAGE_FAILURE = '[Image] Upload Image Failure'
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
}
export class GetCampaignSuccess implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class GetCampaignFail implements Action {
  public readonly type = StaffActionsType.GET_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateCampaign implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN;
  constructor(public payload: any) {}
}
export class UpdateCampaignSuccess implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateCampaignFail implements Action {
  public readonly type = StaffActionsType.UPDATE_CAMPAIGN_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteStaff implements Action {
  public readonly type = StaffActionsType.DELETE_STAFF;
  constructor(public payload: Staff) {}
}

export class DeleteStaffSuccess implements Action {
  public readonly type = StaffActionsType.DELETE_STAFF_SUCCESS;
  constructor(public payload: Staff) {}
}

export class DeleteStaffFail implements Action {
  public readonly type = StaffActionsType.DELETE_STAFF_FAILURE;
  constructor(public payload: Error) {}
}

export class UpdateStaff implements Action {
  public readonly type = StaffActionsType.UPDATE_STAFF;
  constructor(public payload: Staff) {}
}

export class UpdateStaffSuccess implements Action {
  public readonly type = StaffActionsType.UPDATE_STAFF_SUCCESS;
  constructor(public payload: Staff) {}
}

export class UpdateStaffFail implements Action {
  public readonly type = StaffActionsType.UPDATE_STAFF_FAILURE;
  constructor(public payload: Error) {}
}

export type StaffActions =
  | GetStaffs
  | GetStaffsSuccess
  | GetStaffsFail
  | DeleteStaff
  | DeleteStaffSuccess
  | DeleteStaffFail
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
  | UpdateCampaign
  | UpdateCampaignSuccess
  | UpdateCampaignFail
  | UpdateStaff
  | UpdateStaffSuccess
  | UpdateStaffFail;
