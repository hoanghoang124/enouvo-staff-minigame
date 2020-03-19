import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AuthGuardService as AuthGuard } from './Auth/Services/auth-guard.service';
import { RoleGuardService as AdminGuard } from './Auth/Services/role-guard.service';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { CreateAccountComponent } from './Auth/create-account/create-account.component';
import { StaffAddFromCsvComponent } from './Main/staff-add-from-csv/staff-add-from-csv.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: UserSiteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminSiteComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/create',
    component: StaffAddComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/csv',
    component: StaffAddFromCsvComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/:id/detail',
    component: StaffDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/:id/edit',
    component: StaffEditComponent,
    canActivate: [AdminGuard]
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
