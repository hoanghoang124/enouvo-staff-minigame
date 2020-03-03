import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Role } from "./Auth/Models/role";

import { StaffAddComponent } from "./Main/staff-add/staff-add.component";
import { StaffDetailComponent } from "./Main/staff-detail/staff-detail.component";
import { StaffEditComponent } from "./Main/staff-edit/staff-edit.component";
import { LoginComponent } from "./Auth/login/login.component";
import { AdminSiteComponent } from "./Main/admin-site/admin-site.component";
import { UserSiteComponent } from "./Main/user-site/user-site.component";
import { AuthGuardService as AuthGuard } from "./Auth/Services/auth-guard.service";

const routes: Routes = [

  {
    path: "dashboard",
    component: AdminSiteComponent,
    canActivate: [AuthGuard],
    children: [

    ]
  },
  { path: "new", component: StaffAddComponent },
  { path: "dashboard/:id/detail", component: StaffDetailComponent },
  { path: "dashboard/:id/edit", component: StaffEditComponent },
  { path: "voting", component: UserSiteComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  // { path: "**", redirectTo: "dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
