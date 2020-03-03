import { AppRoutingModule } from "./../app-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "./Angular-Material/Angular-Material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})
export class SharedModule {}
