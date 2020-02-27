import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StaffService } from '../shared/staff.service';
import { Staff } from '../shared/staff.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { GetStaffs } from '../store/actions';
import { getAllStaffs } from '../store/selectors/staff.selector';
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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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

  constructor(private staffService: StaffService,
              private store: Store<AppState>) {}

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
    this.store.dispatch(new GetStaffs());
    this.stafflist$ = this.store.pipe(select(getAllStaffs));
    // this.data.paginator = this.paginator;
    // this.data.sort = this.sort;
  }
}
