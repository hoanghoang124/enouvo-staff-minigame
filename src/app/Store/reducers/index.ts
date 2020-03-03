import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import * as auth from './auth.reducer';
import * as fromStaff from './staff.reducer';
import * as fromAuth from './auth.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface State {
  router?: RouterReducerState;
  auth: fromAuth.AuthState;
  staff: fromStaff.StaffState;
}

export const initialAppState: State = {
  auth: fromAuth.initialState,
  staff: fromStaff.initialState
};

// export function getInitialState(): State {
//   return initialAppState;
// }

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: fromAuth.reducer,
  staff: fromStaff.staffReducer
};

export const selectAppState = createFeatureSelector<State>('app');
