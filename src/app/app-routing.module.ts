
import { UserSiteComponent } from "./user-site/user-site.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./login/_helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { AdminSiteComponent } from './admin-site/admin-site.component';

const routes: Routes = [
  { path: '', component: UserSiteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminSiteComponent },
  { path: '*', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
