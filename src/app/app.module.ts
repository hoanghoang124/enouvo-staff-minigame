import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { UserSiteComponent } from "./user-site/user-site.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, LoginComponent, UserSiteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
