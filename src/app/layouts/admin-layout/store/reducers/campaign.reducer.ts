import { Staff } from 'src/app/layouts/admin-layout/models/staff.model';
import { Campaign } from '../../models/campaign.model';
import * as campaignActions from '../actions/campaign.action';
import * as _ from 'lodash';

export interface CampaignState {
  campaigns: Campaign[];
  selectedCampaign: Campaign;
  staffs: Staff[];
  selectedStaff: Staff;
  starLimit: number;
  votedStar: number;
  starLeft: number;
  totalCampaigns: number;
  isCrtCmpLoading: boolean;
  isGtAllCmpLoading: boolean;
  isGtCmpDtlLoading: boolean;
  isGtCmpDtlVtgLoading: boolean;
  isGtCmpLstStfLoading: boolean;
  isGtVtgHsrLoading: boolean;
  isUpdCmpLoading: boolean;
  isDltCmpLoading: boolean;
  isVtgLoading: boolean;
  errorGtAllCmpMessage: any;
  errorGtCmpDtlMessage: any;
  errorGtCmdDtlVtgMessage: any;
  errorGtCmpLstStfMessage: any;
  errorGtVtgHsrMessage: any;
  errorCrtCmpMessage: any;
  errorUpdCmpMessage: any;
  errorDltCmpMessage: any;
  errorVtgMessage: any;
}

const initialState: CampaignState = {
  staffs: [],
  selectedStaff: null,
  campaigns: [],
  selectedCampaign: null,
  starLimit: 0,
  votedStar: 0,
  starLeft: 0,
  totalCampaigns: 0,
  isCrtCmpLoading: false,
  isGtAllCmpLoading: false,
  isGtCmpDtlLoading: false,
  isGtCmpDtlVtgLoading: false,
  isGtCmpLstStfLoading: false,
  isGtVtgHsrLoading: false,
  isUpdCmpLoading: false,
  isDltCmpLoading: false,
  isVtgLoading: false,
  errorCrtCmpMessage: null,
  errorGtAllCmpMessage: null,
  errorGtCmpDtlMessage: null,
  errorGtCmdDtlVtgMessage: null,
  errorGtCmpLstStfMessage: null,
  errorGtVtgHsrMessage: null,
  errorUpdCmpMessage: null,
  errorDltCmpMessage: null,
  errorVtgMessage: null
};

export function campaignReducer(
  state = initialState,
  action: campaignActions.CampaignActions
): CampaignState {
  switch (action.type) {
    case campaignActions.CampaignActionsType.CREATE_CAMPAIGN: {
      return {
        ...state,
        isCrtCmpLoading: true,
        errorCrtCmpMessage: null
      };
    }
    case campaignActions.CampaignActionsType.CREATE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        isCrtCmpLoading: false,
        campaigns: [...state.campaigns, action.payload]
      };
    }
    case campaignActions.CampaignActionsType.CREATE_CAMPAIGN_FAILURE: {
      return {
        ...state,
        isCrtCmpLoading: false,
        errorCrtCmpMessage: action.payload
      };
    }
    case campaignActions.CampaignActionsType.GET_CAMPAIGN:
      return {
        ...state,
        isGtAllCmpLoading: true,
        selectedCampaign: null
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaigns: action.payload.campaigns,
        totalCampaigns: action.payload.totalCampaigns,
        isGtAllCmpLoading: false
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_FAILURE:
      return {
        ...state,
        isGtAllCmpLoading: false,
        errorGtAllCmpMessage: action.payload
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_DETAIL:
      return {
        ...state,
        isGtCmpDtlLoading: true,
        selectedCampaign: null
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_DETAIL_SUCCESS:
      return {
        ...state,
        selectedCampaign: action.payload,
        isGtCmpDtlLoading: false
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_DETAIL_FAILURE:
      return {
        ...state,
        isGtCmpDtlLoading: false,
        errorGtCmpDtlMessage: action.payload
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_DETAIL_FOR_VOTING:
      return {
        ...state,
        isGtCmpDtlLoading: true,
        selectedCampaign: null
      };
    case campaignActions.CampaignActionsType
      .GET_CAMPAIGN_DETAIL_FOR_VOTING_SUCCESS:
      return {
        ...state,
        selectedCampaign: action.payload,
        starLimit: action.payload.campaign.starLimitation,
        starLeft: action.payload.campaign.starLimitation,
        isGtCmpDtlLoading: false
      };
    case campaignActions.CampaignActionsType
      .GET_CAMPAIGN_DETAIL_FOR_VOTING_FAILURE:
      return {
        ...state,
        isGtCmpDtlLoading: false,
        errorGtCmpDtlMessage: action.payload
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_LIST_STAFF:
      return {
        ...state,
        isGtCmpLstStfLoading: true,
        selectedStaff: null
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_LIST_STAFF_SUCCESS:
      return {
        ...state,
        isGtCmpLstStfLoading: false,
        staffs: action.payload.staffs
      };
    case campaignActions.CampaignActionsType.GET_CAMPAIGN_LIST_STAFF_FAILURE:
      return {
        ...state,
        isGtCmpLstStfLoading: false,
        errorGtCmpLstStfMessage: action.payload
      };
    case campaignActions.CampaignActionsType.GET_VOTING_HISTORY:
      return {
        ...state,
        isGtVtgHsrLoading: true,
        selectedStaff: null,
        errorGtVtgHsrMessage: null
      };
    case campaignActions.CampaignActionsType.GET_VOTING_HISTORY_SUCCESS:
      return {
        ...state,
        isGtVtgHsrLoading: false,
        selectedStaff: action.payload
      };
    case campaignActions.CampaignActionsType.GET_VOTING_HISTORY_FAILURE:
      return {
        ...state,
        isGtVtgHsrLoading: false,
        errorGtVtgHsrMessage: action.payload
      };
    case campaignActions.CampaignActionsType.UPDATE_CAMPAIGN:
      return {
        ...state,
        isUpdCmpLoading: true,
        errorUpdCmpMessage: null
      };
    case campaignActions.CampaignActionsType.UPDATE_CAMPAIGN_SUCCESS:
      const updateCampaign = _.map(state.campaigns, item => {
        if (item.id === action.payload.id) {
          return { id: item.id, ...action.payload };
        }
        return item;
      });

      return {
        ...state,
        isUpdCmpLoading: false,
        selectedCampaign: action.payload,
        campaigns: updateCampaign
      };
    case campaignActions.CampaignActionsType.UPDATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        isUpdCmpLoading: false,
        errorUpdCmpMessage: action.payload
      };
    case campaignActions.CampaignActionsType.DELETE_CAMPAIGN:
      return {
        ...state,
        isDltCmpLoading: true,
        errorDltCmpMessage: null
      };
    case campaignActions.CampaignActionsType.DELETE_CAMPAIGN_SUCCESS:
      const deleteCampaigns = _.remove(state.campaigns, function(campaign) {
        return campaign.id !== action.payload.id;
      });
      return {
        ...state,
        isDltCmpLoading: false,
        campaigns: deleteCampaigns
      };
    case campaignActions.CampaignActionsType.DELETE_CAMPAIGN_FAILURE:
      return {
        ...state,
        isDltCmpLoading: false,
        errorDltCmpMessage: action.payload
      };

    case campaignActions.CampaignActionsType.VOTE:
      return {
        ...state,
        isVtgLoading: true
      };
    case campaignActions.CampaignActionsType.VOTE_SUCCESS:
      const updateVoting = _.map(state.staffs, item => {
        if (item.id === action.payload.receiverId) {
          return {
            id: item.id,
            firstName: item.firstName,
            lastName: item.lastName,
            scope: item.scope,
            votedStar: action.payload.voting.numberOfStars
          }; //get list staff nen tra ve votedStars cua tung staff nua
        }
        return item;
      });
      return {
        ...state,
        isVtgLoading: false,
        staffs: updateVoting
        // votedStar: votedStar,
        // starLeft: state.starLimit - votedStar
      };
    case campaignActions.CampaignActionsType.VOTE_FAILURE:
      return {
        ...state,
        isVtgLoading: false,
        errorVtgMessage: action.payload
      };
    default:
      return state;
  }
}
