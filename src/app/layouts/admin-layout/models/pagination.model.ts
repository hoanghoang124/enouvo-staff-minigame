export const pageSizes = [5, 10, 15];
export class Page {
  pageNumber: number;
  pageSize: number;

  constructor() {
    this.pageNumber = 1;
    this.pageSize = 5;
  }
}
