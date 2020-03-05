import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AuthGuardService as AuthGuard } from './Auth/Services/auth-guard.service';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { ErrorPageComponent } from './Main/error-page/error-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard]
  },
  { path: 'dashboard', component: UserSiteComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminSiteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/create',
    component: StaffAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/:id/detail',
    component: StaffDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/:id/edit',
    component: StaffEditComponent,
    canActivate: [AuthGuard]
  },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
