import { Staff } from 'src/app/Main/Models/staff.model';
import * as staffActions from '../actions/staff.action';
import * as _ from 'lodash';

export interface StaffState {
  data: Staff[];
  selected: Staff;
  action: string;
  done: boolean;
  error?: Error;
}

export const initialState: StaffState = {
  data: [
    {
      id: 1,
      name: 'name 1',
      information: 'information 1',
      star: 22
    },
    {
      id: 2,
      name: 'name 2',
      information: 'information 2',
      star: 96
    },
    {
      id: 3,
      name: 'name 3',
      information: 'information 3',
      star: 3
    },
    {
      id: 4,
      name: 'name 4',
      information: 'information 4',
      star: 1
    },
    {
      id: 5,
      name: 'name 5',
      information: 'information 5',
      star: 17
    },
    {
      id: 6,
      name: 'name 6',
      information: 'information 6',
      star: 68
    },
    {
      id: 7,
      name: 'name 7',
      information: 'information 7',
      star: 25
    },
    {
      id: 8,
      name: 'name 8',
      information: 'information 8',
      star: 46
    },
    {
      id: 9,
      name: 'name 9',
      information: 'information 9',
      star: 87
    },
    {
      id: 10,
      name: 'name 10',
      information: 'information 10',
      star: 85
    }
  ],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function staffReducer(state = initialState, action: staffActions.StaffActions): StaffState {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all Staffs actions
     ************************/
    case staffActions.StaffActionsType.GET_STAFFS:
      return {
        ...state,
        action: staffActions.StaffActionsType.GET_STAFFS,
        done: false,
        selected: null,
        error: null
      };
    case staffActions.StaffActionsType.GET_STAFFS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        done: true,
        selected: null,
        error: null
      };
    case staffActions.StaffActionsType.GET_STAFFS_FAILURE:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * GET Staff by id actions
     ************************/
    case staffActions.StaffActionsType.GET_STAFF:
      return {
        ...state,
        action: staffActions.StaffActionsType.GET_STAFF,
        done: false,
        selected: null,
        error: null
      };
    case staffActions.StaffActionsType.GET_STAFF_SUCCESS:
      return {
        ...state,
        selected: action.payload,
        done: true,
        error: null
      };
    case staffActions.StaffActionsType.GET_STAFF_FAILURE:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * CREATE Staff actions
     ************************/
    case staffActions.StaffActionsType.CREATE_STAFF:
      return {
        ...state,
        selected: action.payload,
        action: staffActions.StaffActionsType.CREATE_STAFF,
        done: false,
        error: null
      };
    case staffActions.StaffActionsType.CREATE_STAFF_SUCCESS: {
        const newStaff = {
          ...state.selected,
          id: action.payload
        };
        const data = [
          ...state.data,
          newStaff
        ];
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case staffActions.StaffActionsType.CREATE_STAFF_FAILURE:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };

      /*************************
     * UPDATE Staff actions
     ************************/
    case staffActions.StaffActionsType.UPDATE_STAFF:
      return {
        ...state,
        selected: action.payload,
        action: staffActions.StaffActionsType.UPDATE_STAFF,
        done: false,
        error: null
      };
    case staffActions.StaffActionsType.UPDATE_STAFF_SUCCESS: {
        const index = state
          .data
          .findIndex(h => h.id === state.selected.id);
        if (index >= 0) {
          const data = [
            ...state.data.slice(0, index),
            state.selected,
            ...state.data.slice(index + 1)
          ];
          return {
            ...state,
            data,
            done: true,
            selected: null,
            error: null
          };
        }
        return state;
      }
    case staffActions.StaffActionsType.UPDATE_STAFF_FAILURE:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload
      };

      /*************************
     * DELETE Staff actions
     ************************/
    case staffActions.StaffActionsType.DELETE_STAFF: {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: staffActions.StaffActionsType.DELETE_STAFF,
          done: false,
          error: null
        };
      }
    case staffActions.StaffActionsType.DELETE_STAFF_SUCCESS: {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case staffActions.StaffActionsType.DELETE_STAFF_FAILURE:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
      default:
        return state;
  }
}
