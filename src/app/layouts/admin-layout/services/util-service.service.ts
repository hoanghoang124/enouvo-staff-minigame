import { Injectable, QueryList } from '@angular/core';
import * as _ from 'lodash';
import { SortEvent } from 'src/app/shared/sort.model';
import { SortableDirective } from 'src/app/shared/ngbd-sortable-header.directive';

@Injectable({ providedIn: 'root' })
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
    { sortDesc, sortBy }: SortEvent,
    headers: QueryList<SortableDirective>
  ): SortEvent {
    headers.forEach(header => {
      if (header.sortable !== sortBy) {
        header.direction = '';
      }
    });
    return {
      sortBy: sortDesc && sortBy,
      sortDesc: sortDesc === '' ? null : sortDesc === 'desc' ? true : false
    };
  }

  updateSortHeaders(sort: SortEvent, headers: QueryList<SortableDirective>) {
    headers.forEach(header => {
      if (header.sortable === sort.sortBy) {
        header.direction =
          sort.sortDesc === 'true'
            ? 'desc'
            : sort.sortDesc === 'false'
            ? 'asc'
            : '';
      }
    });
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
