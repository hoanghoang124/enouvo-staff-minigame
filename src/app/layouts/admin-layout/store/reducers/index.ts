import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromStaff from './staff.reducer';
import * as fromCampaign from './campaign.reducer';
export interface State {
  staffState: fromStaff.StaffState;
  campaignState: fromCampaign.CampaignState;
}

export const reducers: ActionReducerMap<State> = {
  staffState: fromStaff.staffReducer,
  campaignState: fromCampaign.campaignReducer
};

export const selectPageState = createFeatureSelector<State>('page');
