import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserSiteComponent } from './user-site/user-site.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminSiteComponent } from './admin-site/admin-site.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserSiteComponent, AdminSiteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
