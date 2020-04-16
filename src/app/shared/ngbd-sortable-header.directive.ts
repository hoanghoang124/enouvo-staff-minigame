import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';
import { SortDirection, SortEvent } from '../shared/sort.model';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};

@Directive({
  selector: 'th[sortable]'
})
export class NgbdSortableHeaderDirective {
  @HostBinding('class.asc') get ascClass() {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc') get descClass() {
    return this.direction === 'desc';
  }

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
  constructor() {}
}
