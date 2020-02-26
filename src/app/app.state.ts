import * as fromStaff from './store/reducers/staff.reducer';

export interface AppState {
  staff: fromStaff.StaffState;
}
