import * as AuthActions from '../actions/auth.action';
import { Role } from 'src/app/Auth/Models/role.model';
import { User } from './../../Auth/Models/user.model';

const { AuthActionTypes } = AuthActions;

export interface AuthState {
  role: Role;
  id: User;
  errorMessage: string;
}
export const initialState: AuthState = {
  role: null,
  id: null,
  errorMessage: null
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        role: action.payload.scope,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Invalid Credentials.'
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        errorMessage: null
      };
    }
    case AuthActionTypes.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        errorMessage: 'Password does not match'
      };
    }
    case AuthActionTypes.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        id: action.payload.id,
        errorMessage: null
      };
    }
    case AuthActionTypes.RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        errorMessage: 'Invalid Credentials'
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
