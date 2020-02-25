import { Routes, RouterModule } from "@angular/router";

import { UserSiteComponent } from "./user-site/user-site.component";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/_helpers/auth.guard";
import { Role } from "./login/_models/role";

const routes: Routes = [
  { path: "", component: UserSiteComponent, canActivate: [AuthGuard] },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
