import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaffService } from '../Main/Services/staff.service';


@NgModule({
  imports: [],
  providers: [
    StaffService,
  ]
})

export class CoreModule {}
