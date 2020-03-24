import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }), //  Retains last 25 states
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }) // name of reducer key
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
