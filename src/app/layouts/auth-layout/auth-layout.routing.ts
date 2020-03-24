import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "create-account", component: CreateAccountComponent }
];
