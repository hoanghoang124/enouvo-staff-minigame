import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromStaff from './staff.reducer';

export interface State {
  staffState: fromStaff.StaffState;
}

export const reducers: ActionReducerMap<State> = {
  staffState: fromStaff.staffReducer
};

export const selectPageState = createFeatureSelector<State>('page');
