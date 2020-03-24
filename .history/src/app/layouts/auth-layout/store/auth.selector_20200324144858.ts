import { createSelector } from "@ngrx/store";
import { selectAuthState } from "./index";

export const selectAuthenState = createSelector(
  selectAuthState,
  state => state.authState
);

export const getRole = createSelector(selectAuthState, state => state.role);

export const getId = createSelector(selectAuthState, state => state.id);

export const getIsLoading = createSelector(
  selectAuthState,
  state => state.isLoading
);

export const getErrorMessage = createSelector(
  selectAuthState,
  state => state.errorMessage
);
