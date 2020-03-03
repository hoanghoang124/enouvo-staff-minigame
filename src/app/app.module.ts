import { reducers } from "./Store/router.reducer";
import { reducersLogin } from "./Auth/Store/app.state";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AngularMaterialModule } from "./Shared/Angular-Material/Angular-Material.module";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { StaffDetailComponent } from "./Main/staff-detail/staff-detail.component";
import { StaffAddComponent } from "./Main/staff-add/staff-add.component";
import { StaffEditComponent } from "./Main/staff-edit/staff-edit.component";
import { AppComponent } from "./app.component";
import { UserSiteComponent } from "./Main/user-site/user-site.component";
import { LoginComponent } from "./Auth/login/login.component";
import { AdminSiteComponent } from "./Main/admin-site/admin-site.component";
import { HeaderComponent } from "./Shared/Components/header/header.component";
import { FooterComponent } from "./Shared/Components/footer/footer.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { appReducers } from "./Main/Store/reducers";
import { appEffect } from "./Main/Store/effects";
import { SharedModule } from "./Shared/shared.module";
import { AuthEffects } from "./Auth/Store/effects/auth.effect";
import { AuthService } from "./Auth/Services/auth.service";
import { TokenInterceptor } from "./Auth/Services/token.service";
import { AuthGuardService as AuthGuard } from "./Auth/Services/auth-guard.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    UserSiteComponent,
    LoginComponent,
    AdminSiteComponent,
    StaffDetailComponent,
    StaffAddComponent,
    StaffEditComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot(appEffect),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducers),
    StoreModule.forRoot(reducersLogin, {}),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    AngularMaterialModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
