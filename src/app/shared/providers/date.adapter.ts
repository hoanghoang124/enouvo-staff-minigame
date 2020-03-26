import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DT_FORMAT = 'DD-MM-YYYY';
  parse(value: string): NgbDateStruct {
    if (value) {
      value = value.trim();
    }
    return null;
  }
  format(date: NgbDateStruct): string {
    if (!date) {
      return '';
    }
    const mdt = moment([date.year, date.month - 1, date.day]);
    if (!mdt.isValid()) {
      return '';
    }
    return mdt.format(this.DT_FORMAT);
  }
}
