import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {
  NgbDateParserFormatter,
  NgbDateAdapter,
  NgbDateNativeUTCAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './providers/date.adapter';
import { directives } from './directives';

@NgModule({
  declarations: [directives],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      positionClass: 'toast-top-right'
    })
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    directives
  ],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    },
    { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter }
  ]
})
export class SharedModule {}
