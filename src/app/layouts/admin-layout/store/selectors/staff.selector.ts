import { createSelector } from '@ngrx/store';
import { selectPageState } from '../reducers/index';
import * as fromStaff from '../reducers/staff.reducer';

export const selectStaffState = createSelector(
  selectPageState,
  state => state.staffState
);

export const getStaffsQuery = createSelector(
  selectStaffState,
  fromStaff.selectAll
);

export const getAllStaffs = createSelector(
  selectStaffState,
  state => state.staffs
);

export const getStaff = createSelector(
  selectStaffState,
  state => state.selectedStaff
);

export const getIsGtStfLoading = createSelector(
  selectStaffState,
  state => state.isGtStfLoading
);

export const getIsGtAllStfLoading = createSelector(
  selectStaffState,
  state => state.isGtAllStfLoading
);

export const getIsUpdStfStfLoading = createSelector(
  selectStaffState,
  state => state.isUpdStfLoading
);

export const getIsDltStfStfLoading = createSelector(
  selectStaffState,
  state => state.isDltStfLoading
);

export const getErrorGtAllStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtAllStfMessage
);

export const getErrorGtStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtStfMessage
);

export const getErrorMessage = createSelector(
  selectStaffState,
  state => state.errorUpdStfMessage
);

export const getErrorDltStfMessage = createSelector(
  selectStaffState,
  state => state.errorDltStfMessage
);
