import { Staff } from 'src/app/Main/Models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  staffs: Staff[];
  selectedStaff: Staff;
  isLoading: boolean;
  error?: Error;
}

export const initialState: StaffState = {
  staffs: [],
  selectedStaff: null,
  isLoading: false,
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
        isLoading: true,
        selectedStaff: null
      };
    case staffActions.StaffActionsType.GET_STAFFS_SUCCESS:
      return {
        ...state,
        staffs: action.payload,
        isLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFFS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case staffActions.StaffActionsType.GET_STAFF:
      return {
        ...state,
        isLoading: true,
        selectedStaff: null,
        error: null
      };
    case staffActions.StaffActionsType.GET_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isLoading: false
      };
    case staffActions.StaffActionsType.GET_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case staffActions.StaffActionsType.CREATE_STAFF:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case staffActions.StaffActionsType.CREATE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: [...state.staffs, action.payload],
        error: null,
        isLoading: false
      };
    }
    case staffActions.StaffActionsType.CREATE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_SUCCESS:
      return {
        ...state,
        selectedStaff: action.payload,
        isLoading: false
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case staffActions.StaffActionsType.DELETE_STAFF: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_SUCCESS: {
      return {
        ...state,
        staffs: _.filter(state.staffs, staff => staff.id !== action.payload.id),
        selectedStaff: null,
        isLoading: false
      };
    }
    case staffActions.StaffActionsType.DELETE_STAFF_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.payload
      };
    default:
      return state;
  }
}
