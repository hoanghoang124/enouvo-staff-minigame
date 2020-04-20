import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() {}

  sort(arrayItems, orderBy: string, order: string | boolean | number) {
    if (order === '') {
      return arrayItems;
    } else {
      return [...arrayItems].sort((a, b) => {
        const res = this.compare(a[orderBy], b[orderBy]);
        return order === 'asc' ? res : -res;
      });
    }
  }
  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  paginate(arrayItems, pageSize, pageNumber) {
    return arrayItems.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );
  }
}
