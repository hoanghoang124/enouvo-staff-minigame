import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import * as auth from "../../../Auth/Store/reducers/auth.reducer";
import { StaffState, initialState, staffReducer } from "./staff.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  router?: RouterReducerState;
  staff: StaffState;
}

export const initialAppState: AppState = {
  staff: initialState
};

export function getInitialState(): AppState {
  return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  staff: staffReducer
};
