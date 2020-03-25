import { AuthEffects } from './store/auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/index';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutes } from './auth-layout.routing';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthLayoutModule {}
