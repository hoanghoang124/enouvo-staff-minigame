import { Staff } from '../../models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  isStaffLoading: boolean;
  errorMessage: any;
}

export const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  isStaffLoading: false,
  errorMessage: null
};

export function staffReducer(
  state = initialState,
  action: staffActions.StaffActions
): StaffState {
  switch (action.type) {
    case staffActions.StaffActionsType.GET_STAFFS:
      return {
        ...state,
        isStaffLoading: true,
        selectedStaff: null
      };
    case staffActions.StaffActionsType.GET_STAFFS_SUCCESS:
      return {
        ...state,
        staffs: action.payload,
        isStaffLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFFS_FAILURE:
      return {
        ...state,
        isStaffLoading: false,
        errorMessage: action.payload
      };
    case staffActions.StaffActionsType.GET_STAFF:
      return {
        ...state,
        isStaffLoading: true,
        selectedStaff: null,
        errorMessage: null
      };
    case staffActions.StaffActionsType.GET_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isStaffLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFF_FAILURE:
      return {
        ...state,
        isStaffLoading: false,
        errorMessage: action.payload
      };
    case staffActions.StaffActionsType.CREATE_STAFF:
      return {
        ...state,
        isStaffLoading: true,
        errorMessage: null
      };
    case staffActions.StaffActionsType.CREATE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: [...state.staffs, action.payload],
        errorMessage: null,
        isStaffLoading: false
      };
    }
    case staffActions.StaffActionsType.CREATE_STAFF_FAILURE:
      return {
        ...state,
        isStaffLoading: false,
        errorMessage: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        isStaffLoading: false,
        errorMessage: null
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isStaffLoading: false
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_FAILURE:
      return {
        ...state,
        isStaffLoading: false,
        errorMessage: action.payload
      };
    case staffActions.StaffActionsType.DELETE_STAFF: {
      return {
        ...state,
        isStaffLoading: true,
        errorMessage: null
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: _.filter(state.staffs, staff => staff.id !== action.payload.id),
        selectedStaff: null,
        isStaffLoading: false
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_FAILURE:
      return {
        ...state,
        isStaffLoading: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
