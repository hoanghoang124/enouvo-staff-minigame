import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import * as fromStaff from './staff.reducer';
import * as fromAuth from './auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  router?: RouterReducerState;
  auth: fromAuth.AuthState;
  staff: fromStaff.StaffState;
}

export const initialAppState: State = {
  auth: fromAuth.initialState,
  staff: fromStaff.initialState
};

export function getInitialState(): State {
  return initialAppState;
}

export const reducers: ActionReducerMap<State, any> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  staff: fromStaff.staffReducer
};
