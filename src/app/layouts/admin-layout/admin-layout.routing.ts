import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TablesComponent } from './tables/tables.component';
import { AdminGuard } from '../auth-layout/services/role-guard.service';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:id/user-profile',
    component: UserProfileComponent
  },
  {
    path: 'tables/:id/user-profile',
    component: UserProfileComponent,
    canActivate: [AdminGuard]
  },

  { path: 'tables', component: TablesComponent, canActivate: [AdminGuard] },
  { path: 'upload', component: UploadCSVComponent, canActivate: [AdminGuard] },

  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'edit-account',
    component: EditAccountComponent,
    canActivate: [AdminGuard]
  }
];
