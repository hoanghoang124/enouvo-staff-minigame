import { createSelector } from "@ngrx/store";
import { selectAuthState } from "./index";

export const selectAuthenState = createSelector(
  selectAuthState,
  state => state.authState
);

export const getRole = createSelector(selectAuthenState, state => state.role);

export const getId = createSelector(selectAuthenState, state => state.id);

export const getUsername = createSelector(
  selectAuthenState,
  state => state.username
);

export const getIsLoading = createSelector(
  selectAuthenState,
  state => state.isLoading
);

export const getErrorMessage = createSelector(
  selectAuthenState,
  state => state.errorMessage
);
