import * as AuthActions from '../actions/auth.action';
import { Role } from 'src/app/Auth/Models/role.model';
import { User } from 'src/app/Auth/Models/user.model';

const { AuthActionTypes } = AuthActions;

export interface AuthState {
  role: Role;
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
      console.log('zo day');
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
