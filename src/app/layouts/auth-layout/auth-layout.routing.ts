import { ChangePasswordComponent } from './change-password/change-password.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export const AuthLayoutRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];
