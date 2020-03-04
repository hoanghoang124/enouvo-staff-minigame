import { createSelector } from "@ngrx/store";
import { State } from "../reducers";

const selectAuthState = (state: State) => state.auth;

export const getRole = createSelector(selectAuthState, state => state.role);

export const getErrorMessage = createSelector(
  selectAuthState,
  state => state.errorMessage
);
