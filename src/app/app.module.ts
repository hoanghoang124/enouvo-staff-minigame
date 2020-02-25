import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { fakeBackendProvider } from "./login/helpers/fake-backend";

import { appRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./login/home/home.component";
import { BasicAuthInterceptor } from "./login/helpers/basic-auth.interceptor";
import { ErrorInterceptor } from "./login/helpers/error.interceptor";
import { LoginComponent } from "./login/login.component";
import { UserSiteComponent } from "./user-site/user-site.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminSiteComponent } from "./admin-site/admin-site.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserSiteComponent,
    AdminSiteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
