import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Main/Store/reducers';
import { GetStaffs } from 'src/app/Main/Store/actions';
import { MatPaginator, MatSort } from '@angular/material';
import { StaffService } from '../Services/staff.service';
import { getAllStaffs } from '../Store/reducers/staff.reducer';

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

  getStaffs() {
    return this.staffService.getStaffs().subscribe((staffs: {}) => {
      this.data = staffs;
    });
  }

  constructor(private staffService: StaffService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.getStaffs();
    this.store.dispatch(new GetStaffs());
    this.stafflist$ = this.store.pipe(select(getAllStaffs));
  }
}
