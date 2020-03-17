import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] LoginSuccess',
  LOGIN_FAILURE = '[Auth] LoginFailure',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  CREATE = '[Auth] Create',
  CREATE_SUCCESS = '[Auth] CreateSuccess',
  CREATE_FAILURE = '[Auth] CreateFailure',
  RESET_PASSWORD = '[Auth] ResetPassword',
  RESET_PASSWORD_SUCCESS = '[Auth] ResetPasswordSuccess',
  RESET_PASSWORD_FAILURE = '[Auth] ResetPasswordFailure',
  CHANGE_PASSWORD = '[Auth] ChangePassword',
  CHANGE_PASSWORD_SUCCESS = '[Auth] ChangePasswordSuccess',
  CHANGE_PASSWORD_FAILURE = '[Auth] ChangePasswordFailure'
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class Create implements Action {
  readonly type = AuthActionTypes.CREATE;
  constructor(public payload: any) {}
}

export class CreateSuccess implements Action {
  readonly type = AuthActionTypes.CREATE_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateFailure implements Action {
  readonly type = AuthActionTypes.CREATE_FAILURE;
  constructor(public payload: any) {}
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD;
  constructor(public payload: any) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}
export class ResetPasswordFailure implements Action {
  readonly type = AuthActionTypes.RESET_PASSWORD_FAILURE;
  constructor(public payload: any) {}
}
export class ChangePassword implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD;
  constructor(public payload: any) {}
}
export class ChangePasswordSuccess implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export class ChangePasswordFailure implements Action {
  readonly type = AuthActionTypes.CHANGE_PASSWORD_FAILURE;
  constructor(public payload: any) {}
}
export type AuthActions =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | GetStatus
  | Create
  | CreateSuccess
  | CreateFailure
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailure;
