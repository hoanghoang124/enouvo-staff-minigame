import * as staffActions from '../actions/staff.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers';

const getStaffsState = (state: State) => state.staff;

export const getAllStaffs = createSelector(
  getStaffsState,
  state => state.data
);
export const getStaff = createSelector(
  getStaffsState,
  state => {
    if (
      state.action === staffActions.StaffActionsType.GET_STAFF &&
      state.done
    ) {
      return state.selected;
    } else {
      return null;
    }
  }
);
export const isDeleted = createSelector(
  getStaffsState,
  state =>
    state.action === staffActions.StaffActionsType.DELETE_STAFF &&
    state.done &&
    !state.error
);
export const isCreated = createSelector(
  getStaffsState,
  state =>
    state.action === staffActions.StaffActionsType.CREATE_STAFF &&
    state.done &&
    !state.error
);
export const isUpdated = createSelector(
  getStaffsState,
  state =>
    state.action === staffActions.StaffActionsType.UPDATE_STAFF &&
    state.done &&
    !state.error
);

export const getDeleteError = createSelector(
  getStaffsState,
  state => {
    return state.action === staffActions.StaffActionsType.DELETE_STAFF
      ? state.error
      : null;
  }
);
export const getCreateError = createSelector(
  getStaffsState,
  state => {
    return state.action === staffActions.StaffActionsType.CREATE_STAFF
      ? state.error
      : null;
  }
);
export const getUpdateError = createSelector(
  getStaffsState,
  state => {
    return state.action === staffActions.StaffActionsType.UPDATE_STAFF
      ? state.error
      : null;
  }
);
export const getStaffsError = createSelector(
  getStaffsState,
  state => {
    return state.action === staffActions.StaffActionsType.GET_STAFFS
      ? state.error
      : null;
  }
);
export const getStaffError = createSelector(
  getStaffsState,
  state => {
    return state.action === staffActions.StaffActionsType.GET_STAFF
      ? state.error
      : null;
  }
);
