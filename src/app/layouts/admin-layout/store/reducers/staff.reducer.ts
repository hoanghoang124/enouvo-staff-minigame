import { Staff } from '../../models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  isGtStfLoading: boolean;
  isGtAllStfLoading: boolean;
  isUpdStfLoading: boolean;
  isDltStfLoading: boolean;
  errorGtAllStfMessage: any;
  errorGtStfMessage: any;
  errorUpdStfMessage: any;
  errorDltStfMessage: any;
}

export const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  isGtStfLoading: false,
  isGtAllStfLoading: false,
  isUpdStfLoading: false,
  isDltStfLoading: false,
  errorGtStfMessage: null,
  errorGtAllStfMessage: null,
  errorUpdStfMessage: null,
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

    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        isGtAllStfLoading: false,
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
        isGtAllStfLoading: true,
        errorDltStfMessage: action.payload
      };
    default:
      return state;
  }
}
