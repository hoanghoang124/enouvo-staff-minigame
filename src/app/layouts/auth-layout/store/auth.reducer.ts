import * as AuthActions from './auth.action';
import { RoleId } from '../models/role.model';
import { User } from '../models/user.model';

const { AuthActionTypes } = AuthActions;

export interface AuthState {
  role: RoleId;
  id: User;
  isLoading: boolean;
  errorMessage: string;
}
export const initialState: AuthState = {
  role: null,
  id: null,
  isLoading: false,
  errorMessage: null
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        role: action.payload.scope,
        id: action.payload.userId,
        isLoading: false
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case AuthActionTypes.CREATE_ACCOUNT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    }
    case AuthActionTypes.RESET_PASSWORD: {
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        id: action.payload.id,
        isLoading: false
      };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
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
