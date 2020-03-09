import * as AuthActions from '../actions/auth.action';
import { Role } from 'src/app/Auth/Models/role.model';

const { AuthActionTypes } = AuthActions;

export interface AuthState {
  role: Role;
  errorMessage: string;
}
export const initialState: AuthState = {
  role: null,
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
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.RESET_PASSWORD: {
      return {
        ...state,
        role: action.payload.id,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}
