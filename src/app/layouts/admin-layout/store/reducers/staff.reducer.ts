import { Staff } from '../../models/staff.model';
import * as staffActions from '../actions/staff.action';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  starLimit: number;
  totalProfiles: number;
  isGtStfLoading: boolean;
  isGtAllStfLoading: boolean;
  isCrtStfLoading: boolean;
  errorGtAllStfMessage: any;
  errorGtStfMessage: any;
  errorCrtStfMessage: any;
}

const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  starLimit: null,
  totalProfiles: 0,
  isGtStfLoading: false,
  isGtAllStfLoading: false,
  isCrtStfLoading: false,
  errorGtStfMessage: null,
  errorGtAllStfMessage: null,
  errorCrtStfMessage: null
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
    case staffActions.StaffActionsType.CREATE_STAFF: {
      return {
        ...state,
        isCrtStfLoading: true,
        errorCrtStfMessage: null
      };
    }
    case staffActions.StaffActionsType.CREATE_STAFF_SUCCESS: {
      return {
        ...state,
        isCrtStfLoading: false,
        staffs: [...state.staffs, action.payload]
      };
    }
    case staffActions.StaffActionsType.CREATE_STAFF_FAILURE: {
      return {
        ...state,
        isCrtStfLoading: false,
        errorCrtStfMessage: action.payload
      };
    }
    default:
      return state;
  }
}
