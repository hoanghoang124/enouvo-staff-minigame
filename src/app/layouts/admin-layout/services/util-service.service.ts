import { Injectable, QueryList } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { SortEvent } from 'src/app/shared/sort.model';
import { SortableDirective } from 'src/app/shared/directives/sortable.directive';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {
  constructor() {}

  parseValueToObject<T>(target: T, query: any = {}): T {
    if (!query) {
      return target;
    }
    for (const key in target) {
      if (query.hasOwnProperty(key)) {
        target[key] = query[key];
      }
    }
    return target;
  }

  getSortQuery(
    { order, orderBy }: SortEvent,
    headers: QueryList<SortableDirective>
  ): SortEvent {
    headers.forEach(header => {
      if (header.sortable !== orderBy) {
        header.direction = '';
      }
    });
    return {
      orderBy: order && orderBy,
      order: order === '' ? null : order === 'desc' ? true : false
    };
  }

  updateSortHeaders(sort: SortEvent, headers: QueryList<SortableDirective>) {
    headers.forEach(header => {
      if (header.sortable === sort.orderBy) {
        header.direction =
          sort.order === 'true' ? '0' : sort.order === 'false' ? '1' : '';
      }
    });
  }

  formatDate(date: Date | string, format: string = 'yyyy-MM-dd'): string {
    if (!date || !this.isValidDate(date)) {
      return '';
    }
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  formatQuery<T>(query: T): T {
    return _.omitBy(
      query,
      q =>
        (_.isString(q) && _.isEmpty(q)) ||
        _.isUndefined(q) ||
        _.isNaN(q) ||
        _.isNull(q)
    );
  }
}
