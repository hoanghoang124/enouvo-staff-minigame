import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TablesComponent } from './tables/tables.component';
import { AdminGuard } from '../auth-layout/services/role-guard.service';
export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'tables/:id/user-profile',
    component: UserProfileComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  { path: 'tables', component: TablesComponent },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AdminGuard]
  }
];
