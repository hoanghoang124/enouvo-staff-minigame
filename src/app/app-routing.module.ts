import { Role } from "./login/_models/role";
import { UserSiteComponent } from "./user-site/user-site.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./login/_helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { AdminSiteComponent } from "./admin-site/admin-site.component";
import { StaffDetailComponent } from "./admin-site/staff-detail/staff-detail.component";
import { StaffAddComponent } from "./admin-site/staff-add/staff-add.component";
import { StaffEditComponent } from "./admin-site/staff-edit/staff-edit.component";

const routes: Routes = [
  { path: "", component: UserSiteComponent, canActivate: [AuthGuard] },
  {
    path: "admin",
    component: AdminSiteComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: "login", component: LoginComponent },
  { path: "admin/new", component: StaffAddComponent },
  { path: "admin/:id", component: StaffDetailComponent },
  { path: "admin/:id/edit", component: StaffEditComponent },
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
