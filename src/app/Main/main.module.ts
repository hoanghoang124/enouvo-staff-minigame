import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./../../../.history/src/app/Shared/shared.module_20200228175203";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AngularMaterialModule } from "../Shared/Angular-Material/Angular-Material.module";
import { UserSiteComponent } from "./user-site/user-site.component";
import { StaffDetailComponent } from "./staff-detail/staff-detail.component";
import { AdminSiteComponent } from "./admin-site/admin-site.component";
import { StaffAddComponent } from "./staff-add/staff-add.component";
import { StaffEditComponent } from "./staff-edit/staff-edit.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { routes } from "../app-routing.module";
@NgModule({
  declarations: [
    UserSiteComponent,
    AdminSiteComponent,
    StaffDetailComponent,
    StaffAddComponent,
    StaffEditComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule {}
