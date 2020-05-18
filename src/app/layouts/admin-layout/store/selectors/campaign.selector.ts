import { createSelector } from '@ngrx/store';
import { selectPageState } from '../reducers/index';

export const selectCampaignState = createSelector(
  selectPageState,
  state => state.campaignState
);

export const getAllCampaigns = createSelector(
  selectCampaignState,
  state => state.campaigns
);

export const getCampaignDetail = createSelector(
  selectCampaignState,
  state => state.selectedCampaign
);

export const getCampaignDetailForVoting = createSelector(
  selectCampaignState,
  state => state.selectedCampaign
);

export const getCampaignListStaff = createSelector(
  selectCampaignState,
  state => state.staffs
);

export const getTotalCampaigns = createSelector(
  selectCampaignState,
  state => state.totalCampaigns
);

export const getVotingHistory = createSelector(
  selectCampaignState,
  state => state.selectedStaff
);

export const getStarLimit = createSelector(
  selectCampaignState,
  state => state.starLimit
);

export const getVotedStar = createSelector(
  selectCampaignState,
  state => state.votedStar
);

export const getIsCrtCmpLoading = createSelector(
  selectCampaignState,
  state => state.isCrtCmpLoading
);

export const getIsGtAllCmpLoading = createSelector(
  selectCampaignState,
  state => state.isGtAllCmpLoading
);

export const getIsCmpDtlLoading = createSelector(
  selectCampaignState,
  state => state.isGtCmpDtlLoading
);

export const getIsCmpDtlVtgLoading = createSelector(
  selectCampaignState,
  state => state.isGtCmpDtlVtgLoading
);

export const getIsCmpLstStfLoading = createSelector(
  selectCampaignState,
  state => state.isGtCmpLstStfLoading
);

export const getIsVtgHsrLoading = createSelector(
  selectCampaignState,
  state => state.isGtVtgHsrLoading
);

export const getIsUpdCmpLoading = createSelector(
  selectCampaignState,
  state => state.isUpdCmpLoading
);

export const getIsDltCmpLoading = createSelector(
  selectCampaignState,
  state => state.isDltCmpLoading
);

export const getIsVtgLoading = createSelector(
  selectCampaignState,
  state => state.isVtgLoading
);

export const getErrorCrtCmpMessage = createSelector(
  selectCampaignState,
  state => state.errorCrtCmpMessage
);

export const getErrorGtAllCmpMessage = createSelector(
  selectCampaignState,
  state => state.errorGtAllCmpMessage
);

export const getErrorGtCmpDtlMessage = createSelector(
  selectCampaignState,
  state => state.errorGtCmpDtlMessage
);

export const getErrorGtCmpDtlVtgMessage = createSelector(
  selectCampaignState,
  state => state.errorGtCmdDtlVtgMessage
);

export const getErrorGtCmpLstStf = createSelector(
  selectCampaignState,
  state => state.errorGtCmpLstStfMessage
);

export const getErrorVtgHsrMessage = createSelector(
  selectCampaignState,
  state => state.errorGtVtgHsrMessage
);

export const getErrorUpdCmpMessage = createSelector(
  selectCampaignState,
  state => state.errorUpdCmpMessage
);

export const getErrorDltCmpMessage = createSelector(
  selectCampaignState,
  state => state.errorDltCmpMessage
);

export const getErrorVtgMessage = createSelector(
  selectCampaignState,
  state => state.errorVtgMessage
);
