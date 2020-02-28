import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
  ]
})

export class SharedModule {}
