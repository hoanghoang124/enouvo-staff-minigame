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
export const getTotalQuestions = createSelector(
  selectStaffState,
  state => state.total
);

export const getAllStaffs = createSelector(
  selectStaffState,
  state => state.staffs
);

export const getAllCampaigns = createSelector(
  selectStaffState,
  state => state.campaigns
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

export const getIsCrtAccLoading = createSelector(
  selectStaffState,
  state => state.isCrtAccLoading
);

export const getIsCrtCmpLoading = createSelector(
  selectStaffState,
  state => state.isCrtCmpLoading
);

export const getIsGtAllCmpLoading = createSelector(
  selectStaffState,
  state => state.isGtAllCmpLoading
);

export const getIsUpdCmpLoading = createSelector(
  selectStaffState,
  state => state.isUpdCmpLoading
);

export const getErrorGtAllStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtAllStfMessage
);

export const getErrorGtStfMessage = createSelector(
  selectStaffState,
  state => state.errorGtStfMessage
);

export const getErrorCrtAccMessage = createSelector(
  selectStaffState,
  state => state.errorCrtAccMessage
);

export const getErrorCrtCmpMessage = createSelector(
  selectStaffState,
  state => state.errorCrtCmpMessage
);

export const getErrorGtAllCmpMessage = createSelector(
  selectStaffState,
  state => state.errorGtAllCmpMessage
);

export const getErrorUpdCmpMessage = createSelector(
  selectStaffState,
  state => state.errorUpdCmpMessage
);
