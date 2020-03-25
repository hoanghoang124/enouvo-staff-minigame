import { Action } from '@ngrx/store';
import { Staff } from '../../models/staff.model';

export enum StaffActionsType {
  GET_STAFFS = '[Staff] Get Staffs',
  GET_STAFFS_SUCCESS = '[Staff] Get Staffs Success',
  GET_STAFFS_FAILURE = '[Staff] Get Staffs Fail',

  GET_STAFF = '[Staff] Get Staff',
  GET_STAFF_SUCCESS = '[Staff] Get Staff Success',
  GET_STAFF_FAILURE = '[Staff] Get Staff Fail',

  DELETE_STAFF = '[Staff] Deletes Staff',
  DELETE_STAFF_SUCCESS = '[Staff] Deletes Staff Success',
  DELETE_STAFF_FAILURE = '[Staff] Deletes Staff Failure',

  CREATE_STAFF = '[Staff] Create Staff',
  CREATE_STAFF_SUCCESS = '[Staff] Creates Staff Success',
  CREATE_STAFF_FAILURE = '[Staff] Create Staff Failure',

  UPDATE_STAFF = '[Staff] Updates Staff',
  UPDATE_STAFF_SUCCESS = '[Staff] Updates Staff Success',
  UPDATE_STAFF_FAILURE = '[Staff] Updates Staff Failure',

  UPLOAD_IMAGE = '[Image] Upload Image',
  UPLOAD_IMAGE_SUCCESS = '[Image] Upload Image Success',
  UPLOAD_IMAGE_FAILURE = '[Image] Upload Image Failure'
}

export class GetStaffs implements Action {
  public readonly type = StaffActionsType.GET_STAFFS;
}

export class GetStaffsSuccess implements Action {
  public readonly type = StaffActionsType.GET_STAFFS_SUCCESS;
  constructor(public payload: Staff[]) {}
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

export class CreateStaff implements Action {
  public readonly type = StaffActionsType.CREATE_STAFF;
  constructor(public payload: Staff) {}
}

export class CreateStaffSuccess implements Action {
  public readonly type = StaffActionsType.CREATE_STAFF_SUCCESS;
  constructor(public payload: Staff) {}
}

export class CreateStaffFail implements Action {
  public readonly type = StaffActionsType.CREATE_STAFF_FAILURE;
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
  | CreateStaff
  | CreateStaffSuccess
  | CreateStaffFail
  | GetStaff
  | GetStaffSuccess
  | GetStaffFail
  | UpdateStaff
  | UpdateStaffSuccess
  | UpdateStaffFail;
