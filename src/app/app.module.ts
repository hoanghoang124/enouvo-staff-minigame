
import { AngularMaterialModule } from './Shared/Angular-Material/Angular-Material.module';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { StaffService } from './Shared/Services/staff.service';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { JwtInterceptor } from './Shared/Helpers/jwt.interceptor';
import { ErrorInterceptor } from './Shared/Helpers/error.interceptor';
import { fakeBackendProvider } from './Shared/Helpers/fake-backend';

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
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    EffectsModule,
    StoreModule,
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StaffService,

    // fake back-end
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
