import { Role } from "src/app/Auth/Models/role";
import { User } from "../../../Auth/Models/user";
import { AuthActionTypes, All } from "../actions/auth.action";

export interface AuthState {
  // user: User;
  // error message
  role: Role;
  errorMessage: string;
}
export const initialState: AuthState = {
  role: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): AuthState {
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
        errorMessage: "Incorrect username and/or password."
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
