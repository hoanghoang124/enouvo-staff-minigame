import { Staff } from '../../models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';

export interface StaffState extends EntityState<Staff> {
  staffs: Staff[];
  selectedStaff: Staff;
  total: number;
  isGtStfLoading: boolean;
  isGtAllStfLoading: boolean;
  isUpdStfLoading: boolean;
  isDltStfLoading: boolean;
  errorGtAllStfMessage: any;
  errorGtStfMessage: any;
  errorUpdStfMessage: any;
  errorDltStfMessage: any;
}

const adapter: EntityAdapter<Staff> = createEntityAdapter<Staff>();

const initialState: StaffState = adapter.getInitialState({
  staffs: [],
  selectedStaff: null,
  total: 0,
  isGtStfLoading: false,
  isGtAllStfLoading: false,
  isUpdStfLoading: false,
  isDltStfLoading: false,
  errorGtStfMessage: null,
  errorGtAllStfMessage: null,
  errorUpdStfMessage: null,
  errorDltStfMessage: null
});

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
      return adapter.setAll(action.payload.results, {
        ...state,
        staffs: action.payload,
        total: action.payload.total,
        isGtAllStfLoading: false
      });
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
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
