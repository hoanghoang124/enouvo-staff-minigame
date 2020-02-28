import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { AppState } from 'src/app/Main/Store/reducers';
import { GetStaffs } from 'src/app/Main/Store/actions';
import { getAllStaffs } from 'src/app/Main/Store/selectors/staff.selector';
import { MatPaginator, MatSort } from '@angular/material';

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
