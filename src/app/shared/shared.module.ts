import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDateAdapter,
  NgbDateNativeUTCAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './providers/date.adapter';
import { directives } from './directives';

@NgModule({
  declarations: [directives],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [HttpClientModule, ReactiveFormsModule, FormsModule, directives],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    },
    { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter }
  ]
})
export class SharedModule {}
