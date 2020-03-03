import { createSelector } from "@ngrx/store";

import { selectAuthState } from "../reducers/app.state";

export const getAuthState = createSelector(
  selectAuthState,
  state => state.authState
);

export const getRole = createSelector(getAuthState, state => getAuthState.role);
