import { createSelector } from "@ngrx/store";
import {Aut}
// import { State } from "./auth.reducer";

// const selectAuthState = (state: State) => state.auth;

export const getRole = createSelector(AuthState, state => state.role);

export const getId = createSelector(selectAuthState, state => state.id);

export const getIsLoading = createSelector(
  selectAuthState,
  state => state.isLoading
);

export const getErrorMessage = createSelector(
  selectAuthState,
  state => state.errorMessage
);
