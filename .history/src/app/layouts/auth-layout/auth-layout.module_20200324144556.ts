import { AuthEffects } from "./store/auth.effect";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./store/index";
import { State } from "./store/auth.selector";
import { StoreModule } from "@ngrx/store";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    StoreModule.forFeature("auth", reducers),
    EffectsModule.forFeature([AuthEffects]),
    FormsModule
    // NgbModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthLayoutModule {}
