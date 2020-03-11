import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { State } from 'src/app/Store/reducers';
import * as fromStaff from '../../Store';
import { Staff } from '../Models/staff.model';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ['full name', 'position', 'star'];
  data = new MatTableDataSource<Staff>();
  stafflist$: Observable<any>;
  isLoadingResults$: Observable<boolean>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new fromStaff.GetStaffs());
    this.stafflist$ = this.store.select(fromStaff.getAllStaffs);
    this.stafflist$.subscribe(res => {
      this.isLoadingResults$ = this.store.select(fromStaff.getIsLoading);
      this.data.data = res as Staff[];
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }
}
