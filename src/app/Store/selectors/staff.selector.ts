import { createSelector } from '@ngrx/store';
import { State } from '../reducers';

const getStaffsState = (state: State) => state.staff;

export const getAllStaffs = createSelector(
  getStaffsState,
  state => state.staffs
);
export const getStaff = createSelector(
  getStaffsState,
  state => state.selectedStaff
);
export const getIsStaffLoading = createSelector(
  getStaffsState,
  state => state.isStaffLoading
);
export const getError = createSelector(getStaffsState, state => state.error);
