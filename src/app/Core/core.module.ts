import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './Helpers/jwt.interceptor';
import { ErrorInterceptor } from './Helpers/error.interceptor';
import { StaffService } from '../Main/Services/staff.service';
import { fakeBackendProvider } from './Helpers/fake-backend';


@NgModule({
  imports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StaffService,

    // fake back-end
    fakeBackendProvider
  ]
})

export class CoreModule {}
