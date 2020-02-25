import { JwtInterceptor } from "./login/_helpers/jwt.interceptor";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { fakeBackendProvider } from "./login/_helpers/fake-backend";

import { AppComponent } from "./app.component";
import { appRoutingModule } from "./app-routing.module";

import { ErrorInterceptor } from "./login/_helpers/error.interceptor";
import { UserSiteComponent } from "../app/user-site/user-site.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";

@NgModule({
  declarations: [
    AppComponent,
    UserSiteComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    //fake back-end
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
