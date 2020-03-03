import * as AuthActions from '../actions/auth.action';
import { Role } from 'src/app/Auth/models/enum-type';

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
        errorMessage: 'Incorrect username and/or password.'
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
