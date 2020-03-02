import { AngularMaterialModule } from './Shared/Angular-Material/Angular-Material.module';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { StaffDetailComponent } from './Main/staff-detail/staff-detail.component';
import { StaffAddComponent } from './Main/staff-add/staff-add.component';
import { StaffEditComponent } from './Main/staff-edit/staff-edit.component';
import { AppComponent } from './app.component';
import { UserSiteComponent } from './Main/user-site/user-site.component';
import { LoginComponent } from './Auth/login/login.component';
import { AdminSiteComponent } from './Main/admin-site/admin-site.component';
import { HeaderComponent } from './Shared/Components/header/header.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';

import { appReducers } from './Main/Store/reducers';
import { appEffect } from './Main/Store/effects';
import { CoreModule } from './Core/core.module';
import { SharedModule } from './Shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    EffectsModule.forRoot(appEffect),
    StoreModule.forRoot(appReducers),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    AngularMaterialModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule, FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
