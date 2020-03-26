import {
  CustomDateParserFormatter,
  CustomAdapter
} from './providers/date.adapter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NgbDateParserFormatter,
  NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  exports: [HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter
    },
    {
      provide: NgbDateAdapter,
      useClass: CustomAdapter
    }
  ]
})
export class SharedModule {}
