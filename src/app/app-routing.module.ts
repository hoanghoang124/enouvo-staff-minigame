import { Routes, RouterModule } from '@angular/router';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AuthGuard } from './Shared/Helpers/auth.guard';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { Role } from './Shared/Models/role';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { LoginComponent } from './Auth/login/login.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path: '', component: UserSiteComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminSiteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    children: [
      { path: 'new', component: StaffAddComponent },
      { path: ':id/detail', component: StaffDetailComponent },
      { path: ':id/edit', component: StaffEditComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
