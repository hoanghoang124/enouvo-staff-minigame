export type SortDirection = '0' | '1' | '';
export const rotate: { [key: string]: SortDirection } = {
  1: '0',
  0: '',
  '': '1'
};

export class SortEvent {
  orderBy: string;
  order: SortDirection | string | boolean | number;

  constructor() {
    this.orderBy = '';
    this.order = '';
  }
}
