import * as AuthActions from "./auth.action";
import { RoleId } from "../models/role.model";
import { User } from "../models/user.model";

const { AuthActionTypes } = AuthActions;

export interface AuthState {
  role: RoleId;
  id: User;
  username: string;
  isLgnLoading: boolean;
  isCrtAccLoading: boolean;
  isChgPswLoading: boolean;
  isRstPswLoading: boolean;
  errorLgnMessage: string;
  errorCrtAccMessage: string;
  errorChgPswMessage: string;
  errorRstPswMessage: string;
}
export const initialState: AuthState = {
  role: null,
  id: null,
  username: null,
  isLgnLoading: false,
  isCrtAccLoading: false,
  isChgPswLoading: false,
  isRstPswLoading: false,
  errorLgnMessage: null,
  errorCrtAccMessage: null,
  errorChgPswMessage: null,
  errorRstPswMessage: null
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        isLgnLoading: true,
        errorLgnMessage: null
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.scope,
        id: action.payload.userId,
        isLgnLoading: false
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLgnLoading: false,
        errorLgnMessage: action.payload
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT: {
      return {
        ...state,
        isCrtAccLoading: true,
        errorCrtAccMessage: null
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isCrtAccLoading: false
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT_FAILURE: {
      return {
        ...state,
        isCrtAccLoading: false,
        errorCrtAccMessage: action.payload
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        isChgPswLoading: true,
        errorChgPswMessage: null
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isChgPswLoading: false
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        isChgPswLoading: false,
        errorChgPswMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD: {
      return {
        ...state,
        isRstPswLoading: true,
        errorRstPswMessage: null
      };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        id: action.payload.id,
        isRstPswLoading: false
      };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isRstPswLoading: false,
        errorRstPswMessage: action.payload
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
