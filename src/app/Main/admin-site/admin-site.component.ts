import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Main/Store/reducers';
import { GetStaffs } from 'src/app/Main/Store/actions';
import { getAllStaffs } from 'src/app/Main/Store/selectors/staff.selector';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { StaffService } from '../Services/staff.service';
import { Staff } from '../Models/staff.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ['name', 'information', 'star'];
  stafflist$: Observable<any>;
  datasource: Staff[] = [];
  stafflist: any = [];

  constructor(private staffService: StaffService,
              private ngZone: NgZone,
              private router: Router,
              private store: Store<AppState>) {}


  ngOnInit() {
    this.loadStaffs();
    this.store.dispatch(new GetStaffs());
    this.stafflist$ = this.store.pipe(select(getAllStaffs));
    console.log(this.stafflist$);
  }
  loadStaffs() {
    return this.staffService.getStaffs().subscribe((books: {}) => {
      this.stafflist = books;
    });
  }
  onNewbook() {
    this.ngZone.run(() => this.router.navigateByUrl('/new'));
  }
}
