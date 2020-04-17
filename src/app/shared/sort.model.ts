export type SortDirection = 'asc' | 'desc' | '';
export const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};

export class SortEvent {
  sortBy: string;
  sortDesc: SortDirection | boolean | string;

  constructor() {
    this.sortBy = '';
    this.sortDesc = '';
  }
}
