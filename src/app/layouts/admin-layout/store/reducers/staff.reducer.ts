import { Staff } from '../../models/staff.model';
import { Campaign } from '../../models/campaign.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  selectedCampaign: Campaign;
  total: number;
  isGtStfLoading: boolean;
  isGtAllStfLoading: boolean;
  isUpdStfLoading: boolean;
  isCrtAccLoading: boolean;
  isCrtCmpLoading: boolean;
  isUpdCmpLoading: boolean;
  isDltStfLoading: boolean;
  errorGtAllStfMessage: any;
  errorGtStfMessage: any;
  errorUpdStfMessage: any;
  errorCrtAccMessage: any;
  errorCrtCmpMessage: any;
  errorUpdCmpMessage: any;
  errorDltStfMessage: any;
}

export const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  selectedCampaign: null,
  total: 0,
  isGtStfLoading: false,
  isGtAllStfLoading: false,
  isUpdStfLoading: false,
  isCrtAccLoading: false,
  isCrtCmpLoading: false,
  isUpdCmpLoading: false,
  isDltStfLoading: false,
  errorGtStfMessage: null,
  errorGtAllStfMessage: null,
  errorUpdStfMessage: null,
  errorCrtAccMessage: null,
  errorCrtCmpMessage: null,
  errorUpdCmpMessage: null,
  errorDltStfMessage: null
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
        staffs: action.payload,
        isGtAllStfLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFFS_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false,
        errorGtAllStfMessage: action.payload
      };
    case staffActions.StaffActionsType.GET_STAFFS_QUERY:
      return { ...state, isGtAllStfLoading: true, selectedStaff: null };
    case staffActions.StaffActionsType.GET_STAFFS_QUERY_SUCCESS:
      return {
        ...state,
        staffs: action.payload,
        total: staffActions.GetStaffsQuery.length + 1,
        isGtAllStfLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFFS_QUERY_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false
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
        isCrtAccLoading: false
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
        isCrtCmpLoading: false
      };
    }
    case staffActions.StaffActionsType.CREATE_CAMPAIGN_FAILURE: {
      return {
        ...state,
        isCrtCmpLoading: false,
        errorCrtCmpMessage: action.payload
      };
    }
    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        isGtAllStfLoading: true,
        errorUpdStfMessage: null
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isGtAllStfLoading: false
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false,
        errorUpdStfMessage: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN:
      return {
        ...state,
        isUpdCmpLoading: true,
        errorUpdCmpMessage: null
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN_SUCCESS:
      return {
        ...state,
        isUpdCmpLoading: false,
        selectedCampaign: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_CAMPAIGN_FAILURE:
      return {
        ...state,
        isUpdCmpLoading: false,
        errorUpdCmpMessage: action.payload
      };
    case staffActions.StaffActionsType.DELETE_STAFF: {
      return {
        ...state,
        isGtAllStfLoading: true,
        errorDltStfMessage: null
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: _.filter(state.staffs, staff => staff.id !== action.payload.id),
        selectedStaff: null,
        isGtAllStfLoading: false
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_FAILURE:
      return {
        ...state,
        isGtAllStfLoading: false,
        errorDltStfMessage: action.payload
      };
    default:
      return state;
  }
}
