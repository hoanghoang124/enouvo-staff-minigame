import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { UserSiteComponent } from "./user-site/user-site.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, UserSiteComponent],
  imports: [BrowserModule, AppRoutingModule, DataTablesModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
