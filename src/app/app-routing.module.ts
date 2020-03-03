import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from './Auth/Models/role';

import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AuthGuard } from './Core/Helpers/auth.guard';

const routes: Routes = [
  { path: '', component: UserSiteComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminSiteComponent, canActivate: [AuthGuard],
  },
  { path: 'new', component: StaffAddComponent },
  { path: ':id/detail', component: StaffDetailComponent },
  { path: ':id/edit', component: StaffEditComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
