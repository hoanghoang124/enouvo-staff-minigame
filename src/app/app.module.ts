import { JwtInterceptor } from "./login/_helpers/jwt.interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { fakeBackendProvider } from "./login/_helpers/fake-backend";
import { AppComponent } from "./app.component";
import { appRoutingModule } from "./app-routing.module";

import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { BasicAuthInterceptor } from "./login/_helpers/basic-auth.interceptor";
import { ErrorInterceptor } from "./login/_helpers/error.interceptor";
import { LoginComponent } from "./login/login.component";
import { UserSiteComponent } from "./user-site/user-site.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminSiteComponent } from "./admin-site/admin-site.component";

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from "@angular/material";
import { StaffDetailComponent } from "./admin-site/staff-detail/staff-detail.component";
import { StaffAddComponent } from "./admin-site/staff-add/staff-add.component";
import { StaffEditComponent } from "./admin-site/staff-edit/staff-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    UserSiteComponent,
    LoginComponent,
    AdminSiteComponent,
    StaffDetailComponent,
    StaffAddComponent,
    StaffEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // fake back-end
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
