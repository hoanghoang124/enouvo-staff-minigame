import { createSelector } from "@ngrx/store";
import { selectAppState } from "../reducers";

export const selectAuthState = createSelector(
  selectAppState,
  state => state.auth
);

export const getRole = createSelector(selectAuthState, state => state.role);

export const getErrorMessage = createSelector(
  selectAuthState,
  state => state.errorMessage
);
