import { CampaignComponent } from './campaign/campaign.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TablesComponent } from './tables/tables.component';
import { AdminGuard } from '../auth-layout/services/role-guard.service';
export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:id',
    component: UserProfileComponent
  },
  {
    path: 'tables/:id',
    component: UserProfileComponent,
    canActivate: [AdminGuard]
  },
  { path: 'tables', component: TablesComponent, canActivate: [AdminGuard] },
  { path: 'campaign', component: CampaignComponent, canActivate: [AdminGuard] }
];
