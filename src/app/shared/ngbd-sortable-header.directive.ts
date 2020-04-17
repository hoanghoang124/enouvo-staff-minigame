import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostListener,
  HostBinding
} from '@angular/core';
import { SortEvent, rotate, SortDirection } from '../shared/sort.model';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {
  @Input('appSortable') sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  @HostBinding('class.asc') get ascClass() {
    return this.direction === 'asc';
  }
  @HostBinding('class.desc') get descClass() {
    return this.direction === 'desc';
  }
  @HostListener('click') rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ sortBy: this.sortable, sortDesc: this.direction });
  }
}
