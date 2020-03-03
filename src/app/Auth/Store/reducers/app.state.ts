import * as fromAuth from "./auth.reducer";
import { createFeatureSelector, ActionReducerMap } from "@ngrx/store";

export interface State {
  authState: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  authState: fromAuth.AuthState
};

export const selectAuthState = createFeatureSelector<State>("auth");
