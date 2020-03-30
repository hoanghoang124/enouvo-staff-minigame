import { createSelector } from '@ngrx/store';
import { selectPageState } from '../reducers/index';

export const selectStaffState = createSelector(
  selectPageState,
  state => state.staffState
);

export const getAllStaffs = createSelector(
  selectStaffState,
  state => state.staffs
);
export const getStaff = createSelector(
  selectStaffState,
  state => state.selectedStaff
);
export const getIsStaffLoading = createSelector(
  selectStaffState,
  state => state.isStaffLoading
);
export const getError = createSelector(
  selectStaffState,
  state => state.errorMessage
);
