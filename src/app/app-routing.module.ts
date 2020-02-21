import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSiteComponent } from './user-site/user-site.component';
import { AdminSiteComponent } from './admin-site/admin-site.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'user', component: UserSiteComponent},
  {path: 'admin', component: AdminSiteComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
