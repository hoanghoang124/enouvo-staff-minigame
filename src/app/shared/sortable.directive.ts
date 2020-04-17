import {
  Directive,
  EventEmitter,
  Input,
  Output,
  HostListener,
  HostBinding
} from '@angular/core';
import { SortDirection, SortEvent, rotate } from './sort.model';

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
    this.sort.emit({ orderBy: this.sortable, order: this.direction });
  }
}
