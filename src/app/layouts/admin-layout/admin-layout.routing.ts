import { CampaignComponent } from './campaign/campaign.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TablesComponent } from './tables/tables.component';
import { AdminGuard } from '../auth-layout/services/role-guard.service';
import { AuthGuard } from '../auth-layout/services/auth-guard.service';
import { CampaignDetailAdminComponent } from './campaign-detail-admin/campaign-detail-admin.component';
export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tables/:id',
    component: UserProfileComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'table', component: TablesComponent, canActivate: [AdminGuard] },
  { path: 'campaign', component: CampaignComponent, canActivate: [AdminGuard] },
  {
    path: 'campaign/:id',
    component: CampaignDetailAdminComponent,
    canActivate: [AdminGuard]
  }
];
