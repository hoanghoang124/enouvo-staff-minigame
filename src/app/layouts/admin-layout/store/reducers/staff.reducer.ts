import { Staff } from '../../models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  isStaffLoading: boolean;
  error?: Error;
}

export const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  isStaffLoading: false,
  error: null
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
        error: action.payload
      };
    case staffActions.StaffActionsType.GET_STAFF:
      return {
        ...state,
        isStaffLoading: true,
        selectedStaff: null,
        error: null
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
        error: action.payload
      };
    case staffActions.StaffActionsType.CREATE_STAFF:
      return {
        ...state,
        isStaffLoading: true,
        error: null
      };
    case staffActions.StaffActionsType.CREATE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: [...state.staffs, action.payload],
        error: null,
        isStaffLoading: false
      };
    }
    case staffActions.StaffActionsType.CREATE_STAFF_FAILURE:
      return {
        ...state,
        isStaffLoading: false,
        error: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        isStaffLoading: false,
        error: null
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
        error: action.payload
      };
    case staffActions.StaffActionsType.DELETE_STAFF: {
      return {
        ...state,
        isStaffLoading: true,
        error: null
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
        error: action.payload
      };
    default:
      return state;
  }
}
