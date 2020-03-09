import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './Auth/Services/auth.service';
import {
  TokenInterceptor,
  ErrorInterceptor
} from './Auth/Services/token.service';
import { AuthGuardService as AuthGuard } from './Auth/Services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './Auth/Services/role-guard.service';
import { LoginComponent } from './Auth/login/login.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { HeaderComponent } from './Main/header/header.component';
import { FooterComponent } from './Main/footer/footer.component';
import { SharedModule } from './Shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './Store/reducers';
import { appEffect } from './Store/effects';
import { AngularMaterialModule } from './Shared/Angular-Material/Angular-Material.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { ErrorPageComponent } from './Main/error-page/error-page.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserSiteComponent,
    AdminSiteComponent,
    StaffDetailComponent,
    StaffAddComponent,
    StaffEditComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(appEffect),
    StoreDevtoolsModule.instrument({
      // commented out by default... import {StoreDevtoolsModule} from '@ngrx/store-devtools';
      maxAge: 25 //  Retains last 25 states
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
