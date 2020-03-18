import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from './Shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './Shared/Angular-Material/Angular-Material.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './Auth/Services/auth.service';
import {
  TokenInterceptor,
  ErrorInterceptor
} from './Auth/Services/token.service';
import { AuthGuardService as AuthGuard } from './Auth/Services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './Auth/Services/role-guard.service';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './Auth/login/login.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './Auth/change-password/change-password.component';
import { HeaderComponent } from './Main/navigation/header/header.component';
import { FooterComponent } from './Main/navigation/footer/footer.component';
import { SidenavListComponent } from './Main/navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './Main/layout/layout.component';

import { reducers } from './Store/reducers';
import { appEffect } from './Store/effects';
import { RegisterComponent } from './Auth/register/register.component';
import { UploadFileService } from './Main/Services/upload.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StaffAddComponent,
    UserSiteComponent,
    StaffEditComponent,
    AdminSiteComponent,
    StaffDetailComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
    LayoutComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(appEffect),
    StoreDevtoolsModule.instrument({ maxAge: 25 }), //  Retains last 25 states
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }) // name of reducer key
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthService,
    UploadFileService,
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
