import { Component, OnInit, ViewChild } from '@angular/core';
import 'rxjs';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
// import { GetStaffs } from 'src/app/Main/Store/actions';
// import { getAllStaffs } from 'src/app/Store/selectors/staff.selector';
import { MatPaginator, MatSort } from '@angular/material';
import { StaffService } from '../Services/staff.service';
import { State } from 'src/app/Store/reducers';
import * as fromStaff from '../../Store';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ['name', 'information', 'star'];
  data: any = [];
  stafflist$: Observable<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  getStaffs() {
    return this.staffService.getStaffs().subscribe((staffs: {}) => {
      this.data = staffs;
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }

  constructor(
    private staffService: StaffService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    // this.staffService.getStaffs()
    //   .subscribe(res => {
    //     this.data = res;
    //     this.isLoadingResults = false;
    //   }, err => {
    //     console.log(err);
    //     this.isLoadingResults = false;
    //   });
    this.getStaffs();
    this.store.dispatch(new fromStaff.GetStaffs());
    this.stafflist$ = this.store.pipe(select(fromStaff.getAllStaffs));
    // this.data.paginator = this.paginator;
    // this.data.sort = this.sort;
    // this.store
    //   .select(getRole)
    //   .pipe()
    //   .subscribe(val => console.log(val));
  }
}
