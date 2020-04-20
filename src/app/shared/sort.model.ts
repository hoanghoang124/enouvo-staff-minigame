export type SortDirection = 0 | 1;
export const rotate: { [key: string]: SortDirection } = {
  asc: 1,
  desc: 0
};

export class SortEvent {
  orderBy: string;
  order: SortDirection | number;

  constructor() {
    this.orderBy = '';
    this.order = 0;
  }
}
