import { createSelector } from '@ngrx/store';
import { selectPageState } from '../reducers/index';

export const selectStaffState = createSelector(
  selectPageState,
  state => state.staffState
);

export const getTotalStaffs = createSelector(
  selectStaffState,
  state => state.totalProfiles
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

export const getIsCrtStfLoading = createSelector(
  selectStaffState,
  state => state.isCrtStfLoading
);

export const getErrorGtAllStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtAllStfMessage
);

export const getErrorGtStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtStfMessage
);

export const getErrorCrtStfMessage = createSelector(
  selectStaffState,
  state => state.errorCrtStfMessage
);
