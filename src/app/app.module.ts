import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { AuthService } from './layouts/auth-layout/services/auth.service';
import {
  TokenInterceptor,
  ErrorInterceptor
} from './core/services/token.service';
import { AuthGuard } from './layouts/auth-layout/services/auth-guard.service';
import { AdminGuard } from './layouts/auth-layout/services/role-guard.service';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { ShareModule } from './share/share.module';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    ShareModule,
    AuthLayoutModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }), //  Retains last 25 states
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }) // name of reducer key
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthService,
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
