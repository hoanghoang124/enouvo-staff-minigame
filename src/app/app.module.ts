import { MainModule } from "./Main/main.module";
// import { reducers } from "./Store/router.reducer";
import { reducers } from "./Auth/Store/reducers/app.state";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { AngularMaterialModule } from "./Shared/Angular-Material/Angular-Material.module";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { AppComponent } from "./app.component";
// import { HeaderComponent } from "./Shared/Components/header/header.component";
// import { FooterComponent } from "./Shared/Components/footer/footer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { appReducers } from "./Main/Store/reducers";
import { appEffect } from "./Main/Store/effects";
import { SharedModule } from "./Shared/shared.module";
import { AuthEffects } from "./Auth/Store/effects/auth.effect";
import { AuthService } from "./Auth/Services/auth.service";
import { TokenInterceptor } from "./Auth/Services/token.service";
import { AuthGuardService as AuthGuard } from "./Auth/Services/auth-guard.service";
import { AuthModule } from "./Auth/auth.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(appEffect),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducers),
    StoreModule.forRoot(reducers, {}),
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    SharedModule,
    MainModule,
    AuthModule
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
