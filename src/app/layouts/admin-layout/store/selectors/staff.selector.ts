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

export const getTotalCampaigns = createSelector(
  selectStaffState,
  state => state.totalCampaigns
);

export const getAllStaffs = createSelector(
  selectStaffState,
  state => state.staffs
);

export const getAllCampaigns = createSelector(
  selectStaffState,
  state => state.campaigns
);

export const getCampaignDetail = createSelector(
  selectStaffState,
  state => state.selectedCampaign
);

export const getCampaignListStaff = createSelector(
  selectStaffState,
  state => state.staffs
);

export const getVotingHistory = createSelector(
  selectStaffState,
  state => state.selectedStaff
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

export const getIsCmpDtlLoading = createSelector(
  selectStaffState,
  state => state.isGtCmpDtlLoading
);

export const getIsCmpLstStfLoading = createSelector(
  selectStaffState,
  state => state.isGtCmpLstStfLoading
);

export const getIsVtgHsrLoading = createSelector(
  selectStaffState,
  state => state.isGtVtgHsrLoading
);

export const getIsUpdCmpLoading = createSelector(
  selectStaffState,
  state => state.isUpdCmpLoading
);

export const getIsDltCmpLoading = createSelector(
  selectStaffState,
  state => state.isDltCmpLoading
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

export const getErrorGtCmpDtlMessage = createSelector(
  selectStaffState,
  state => state.errorGtCmpDtlMessage
);

export const getErrorGtCmpLstStf = createSelector(
  selectStaffState,
  state => state.errorGtCmpLstStfMessage
);

export const getErrorVtgHsrMessage = createSelector(
  selectStaffState,
  state => state.errorGtVtgHsrMessage
);

export const getErrorUpdCmpMessage = createSelector(
  selectStaffState,
  state => state.errorUpdCmpMessage
);

export const getErrorDltCmpMessage = createSelector(
  selectStaffState,
  state => state.errorDltCmpMessage
);
