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

export const getIsLgnLoading = createSelector(
  selectAuthenState,
  state => state.isLgnLoading
);

export const getIsCrtAccLoading = createSelector(
  selectAuthenState,
  state => state.isCrtAccLoading
);

export const getIsChgPswLoading = createSelector(
  selectAuthenState,
  state => state.isChgPswLoading
);

export const getIsRstPswLoading = createSelector(
  selectAuthenState,
  state => state.isRstPswLoading
);

export const getErrorLgnMessage = createSelector(
  selectAuthenState,
  state => state.errorLgnMessage
);

export const getErrorChgPswMessage = createSelector(
  selectAuthenState,
  state => state.errorChgPswMessage
);

export const getErrorCrtAccMessage = createSelector(
  selectAuthenState,
  state => state.errorChgPswMessage
);

export const getErrorRsPswMessage = createSelector(
  selectAuthenState,
  state => state.errorRstPswMessage
);
