import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./login/helpers/auth.guard";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./login/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "*", redirectTo: "" }
];

export const appRoutingModule = RouterModule.forRoot(routes);
