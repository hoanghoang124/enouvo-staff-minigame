import { createSelector } from '@ngrx/store';
import { State } from '../reducers';

const selectAuthState = (state: State) => state.auth;

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
