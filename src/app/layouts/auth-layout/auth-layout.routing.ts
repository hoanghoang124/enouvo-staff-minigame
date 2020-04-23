import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './auth-layout.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }]
  }
];
