export type SortDirection = 'desc' | 'asc' | '';
export const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};

export class SortEvent {
  orderBy: string;
  order: SortDirection | string | boolean | number;

  constructor() {
    this.orderBy = '';
    this.order = '';
  }
}
