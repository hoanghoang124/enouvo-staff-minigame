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

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    },
    { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter }
  ]
})
export class ShareModule {}
