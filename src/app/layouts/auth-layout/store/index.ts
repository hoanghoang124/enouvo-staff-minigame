import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
export interface State {
  authState: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  authState: fromAuth.reducer
};

export const selectAuthState = createFeatureSelector<State>('auth');
