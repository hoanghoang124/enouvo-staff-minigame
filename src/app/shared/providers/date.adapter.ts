import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateStruct,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day
      : null;
  }
}

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
