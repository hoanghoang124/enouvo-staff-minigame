import { createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
// import { State } from "./auth.reducer";

export interface State {
  authState: AuthState;
}
const selectAuthState = (state: State) => state.authState;

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
