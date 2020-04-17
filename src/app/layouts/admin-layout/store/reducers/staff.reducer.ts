import { Staff } from '../../models/staff.model';
import { Campaign } from '../../models/campaign.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  campaigns: Campaign[];
  selectedCampaign: Campaign;
  totalProfiles: number;
  isGtStfLoading: boolean;
  isGtAllStfLoading: boolean;
  isCrtAccLoading: boolean;
  isCrtCmpLoading: boolean;
  isGtAllCmpLoading: boolean;
  isUpdCmpLoading: boolean;
  errorGtAllStfMessage: any;
  errorGtStfMessage: any;
  errorCrtAccMessage: any;
  errorGtAllCmpMessage: any;
  errorCrtCmpMessage: any;
  errorUpdCmpMessage: any;
}

const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  campaigns: [],
  selectedCampaign: null,
  totalProfiles: 0,
  isGtStfLoading: false,
  isGtAllStfLoading: false,
  isCrtAccLoading: false,
  isCrtCmpLoading: false,
  isGtAllCmpLoading: false,
  isUpdCmpLoading: false,
  errorGtStfMessage: null,
  errorGtAllStfMessage: null,
  errorCrtAccMessage: null,
  errorCrtCmpMessage: null,
  errorGtAllCmpMessage: null,
  errorUpdCmpMessage: null
};

export function staffReducer(
  state = initialState,
  action: staffActions.StaffActions
): StaffState {
  switch (action.type) {
    case staffActions.StaffActionsType.GET_STAFFS:
      return {
        ...state,
        isGtAllStfLoading: true,
        selectedStaff: null
      };
    case staffActions.StaffActionsType.GET_STAFFS_SUCCESS:
      return {
        ...state,
        staffs: action.payload.profiles,
        totalProfiles: action.payload.totalProfiles,
        isGtAllStfLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFFS_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false,
        errorGtAllStfMessage: action.payload
      };
    case staffActions.StaffActionsType.GET_STAFF:
      return {
        ...state,
        isGtAllStfLoading: true,
        selectedStaff: null,
        errorGtStfMessage: null
      };
    case staffActions.StaffActionsType.GET_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isGtAllStfLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFF_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false,
        errorGtStfMessage: action.payload
      };
    case staffActions.StaffActionsType.CREATE_ACCOUNT: {
      return {
        ...state,
        isCrtAccLoading: true,
        errorCrtAccMessage: null
      };
    }
    case staffActions.StaffActionsType.CREATE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isCrtAccLoading: false,
        staffs: [...state.staffs, action.payload]
      };
    }
    case staffActions.StaffActionsType.CREATE_ACCOUNT_FAILURE: {
      return {
        ...state,
        isCrtAccLoading: false,
        errorCrtAccMessage: action.payload
      };
    }
    case staffActions.StaffActionsType.CREATE_CAMPAIGN: {
      return {
        ...state,
        isCrtCmpLoading: true,
        errorCrtCmpMessage: null
      };
    }
    case staffActions.StaffActionsType.CREATE_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        isCrtCmpLoading: false,
        campaigns: [...state.campaigns, action.payload]
      };
    }
    case staffActions.StaffActionsType.CREATE_CAMPAIGN_FAILURE: {
      return {
        ...state,
        isCrtCmpLoading: false,
        errorCrtCmpMessage: action.payload
      };
    }
    case staffActions.StaffActionsType.GET_CAMPAIGN:
      return {
        ...state,
        isGtAllCmpLoading: true,
        selectedCampaign: null
      };
    case staffActions.StaffActionsType.GET_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaigns: action.payload,
        isGtAllCmpLoading: false
      };
    case staffActions.StaffActionsType.GET_CAMPAIGN_FAILURE:
      return {
        ...state,
        isGtAllCmpLoading: false,
        errorGtAllCmpMessage: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN:
      return {
        ...state,
        isUpdCmpLoading: true,
        errorUpdCmpMessage: null
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN_SUCCESS:
      const newCampaign = _.map(state.campaigns, item => {
        if (item.id === action.payload.id) {
          return { id: item.id, ...action.payload.campaign };
        }
        return item;
      });

      return {
        ...state,
        isUpdCmpLoading: false,
        selectedCampaign: action.payload,
        campaigns: newCampaign
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        isUpdCmpLoading: false,
        errorUpdCmpMessage: action.payload
      };
    default:
      return state;
  }
}
