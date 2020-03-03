import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AuthGuardService as AuthGuard } from './Auth/Services/auth-guard.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'staffs',
    component: AdminSiteComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: StaffAddComponent },
      { path: ':id/detail', component: StaffDetailComponent },
      { path: ':id/edit', component: StaffEditComponent }
    ]
  },
  { path: 'user', component: UserSiteComponent },
  { path: 'admin', component: AdminSiteComponent },
  { path: '', redirectTo: 'staffs', pathMatch: 'full' },
  { path: '**', redirectTo: 'staffs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
