import { StaffAddComponent } from './../staff-add/staff-add.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { State } from 'src/app/Store/reducers';
import * as fromStaff from '../../Store';
import { Staff } from '../Models/staff.model';
import { fadeInAnimation } from '../animation/fade-in.animation';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'position', 'actions'];
  data = new MatTableDataSource<Staff>();
  stafflist$: Observable<any>;
  isLoadingResults$: Observable<boolean>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  myChart: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  constructor(private store: Store<State>, public dialog: MatDialog) {}

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

  deletestaff(id) {
    this.store.dispatch(new fromStaff.DeleteStaff(id));
  }

  openDialog(): void {
    this.dialog.open(StaffAddComponent);
  }

  openDialog(): void {
    this.dialog.open(StaffAddComponent);
  }
}
