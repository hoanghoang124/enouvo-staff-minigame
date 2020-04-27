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

  CREATE_STAFF = '[Staff] Create Staff',
  CREATE_STAFF_SUCCESS = '[Staff] Create Staff Success',
  CREATE_STAFF_FAILURE = '[Staff] Create Staff Failure'
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

export class CreateStaff implements Action {
  readonly type = StaffActionsType.CREATE_STAFF;
  constructor(public payload: any) {}
}

export class CreateStaffSuccess implements Action {
  readonly type = StaffActionsType.CREATE_STAFF_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateStaffFailure implements Action {
  readonly type = StaffActionsType.CREATE_STAFF_FAILURE;
  constructor(public payload: any) {}
}

export type StaffActions =
  | GetStaffs
  | GetStaffsSuccess
  | GetStaffsFail
  | GetStaff
  | GetStaffSuccess
  | GetStaffFail
  | CreateStaff
  | CreateStaffSuccess
  | CreateStaffFailure;
