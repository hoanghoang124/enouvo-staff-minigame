export type SortDirection = 'asc' | 'desc' | '';
export const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};

export class SortEvent {
  orderBy: string;
  order: SortDirection | string | number | boolean;

  constructor() {
    this.orderBy = '';
    this.order = '';
  }
}
