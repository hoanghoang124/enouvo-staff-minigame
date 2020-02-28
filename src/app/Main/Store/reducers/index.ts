import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { StaffState, initialState, staffReducer } from './staff.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  router?: RouterReducerState;
  book: StaffState;
}

export const initialAppState: AppState = {
  book: initialState,
};

export function getInitialState(): AppState {
  return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  book: staffReducer
};
