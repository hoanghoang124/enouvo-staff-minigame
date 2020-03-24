import { AuthState } from "./auth.reducer";
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  authState: AuthState;
}

export const reducers: ActionReducerMap<State> = {
    authState: 
}
