import { createSelector } from "@ngrx/store";
import { selectAuthState} from './index';

const selectAuthState = createSelector(
  selectAuthState,
  state => state.
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
