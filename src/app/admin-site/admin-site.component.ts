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
@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {

  displayedColumns: string[] = ['name', 'information', 'star'];
  data = new MatTableDataSource<Staff>(source);

  isLoadingResults = true;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  constructor(private staffService: StaffService) {}

  ngOnInit() {

    // this.staffService.getStaffs()
    //   .subscribe(res => {
    //     this.data = res;
    //     this.isLoadingResults = false;
    //   }, err => {
    //     console.log(err);
    //     this.isLoadingResults = false;
    //   });
    this.data.data = source;
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;

  }
}
const source: Staff[] = [
  {
    id: '1',
    name: 'name 1',
    information: 'information 1',
    star: 22
  },
  {
    id: '2',
    name: 'name 2',
    information: 'information 2',
    star: 96
  },
  {
    id: '3',
    name: 'name 3',
    information: 'information 3',
    star: 3
  },
  {
    id: '4',
    name: 'name 4',
    information: 'information 4',
    star: 1
  },
  {
    id: '5',
    name: 'name 5',
    information: 'information 5',
    star: 17
  },
  {
    id: '6',
    name: 'name 6',
    information: 'information 6',
    star: 68
  },
  {
    id: '7',
    name: 'name 7',
    information: 'information 7',
    star: 25
  },
  {
    id: '8',
    name: 'name 8',
    information: 'information 8',
    star: 46
  },
  {
    id: '9',
    name: 'name 9',
    information: 'information 9',
    star: 87
  },
  {
    id: '10',
    name: 'name 10',
    information: 'information 10',
    star: 85
  },
  {
    id: '11',
    name: 'name 11',
    information: 'information 11',
    star: 79
  },
  {
    id: '12',
    name: 'name 12',
    information: 'information 12',
    star: 2
  },
  {
    id: '13',
    name: 'name 13',
    information: 'information 13',
    star: 9
  },
  {
    id: '14',
    name: 'name 14',
    information: 'information 14',
    star: 29
  },
  {
    id: '15',
    name: 'name 15',
    information: 'information 15',
    star: 14
  },
  {
    id: '16',
    name: 'name 16',
    information: 'information 16',
    star: 52
  },
  {
    id: '17',
    name: 'name 17',
    information: 'information 17',
    star: 76
  },
  {
    id: '18',
    name: 'name 18',
    information: 'information 18',
    star: 71
  },
  {
    id: '19',
    name: 'name 19',
    information: 'information 19',
    star: 86
  },
  {
    id: '20',
    name: 'name 20',
    information: 'information 20',
    star: 78
  },
  {
    id: '21',
    name: 'name 21',
    information: 'information 21',
    star: 61
  },
  {
    id: '22',
    name: 'name 22',
    information: 'information 22',
    star: 15
  },
  {
    id: '23',
    name: 'name 23',
    information: 'information 23',
    star: 67
  },
  {
    id: '24',
    name: 'name 24',
    information: 'information 24',
    star: 7
  },
  {
    id: '25',
    name: 'name 25',
    information: 'information 25',
    star: 20
  },
  {
    id: '26',
    name: 'name 26',
    information: 'information 26',
    star: 92
  },
  {
    id: '27',
    name: 'name 27',
    information: 'information 27',
    star: 11
  },
  {
    id: '28',
    name: 'name 28',
    information: 'information 28',
    star: 38
  },
  {
    id: '29',
    name: 'name 29',
    information: 'information 29',
    star: 29
  },
  {
    id: '30',
    name: 'name 30',
    information: 'information 30',
    star: 79
  },
  {
    id: '31',
    name: 'name 31',
    information: 'information 31',
    star: 10
  },
  {
    id: '32',
    name: 'name 32',
    information: 'information 32',
    star: 20
  },
  {
    id: '33',
    name: 'name 33',
    information: 'information 33',
    star: 39
  },
  {
    id: '34',
    name: 'name 34',
    information: 'information 34',
    star: 67
  },
  {
    id: '35',
    name: 'name 35',
    information: 'information 35',
    star: 98
  },
  {
    id: '36',
    name: 'name 36',
    information: 'information 36',
    star: 85
  },
  {
    id: '37',
    name: 'name 37',
    information: 'information 37',
    star: 33
  },
  {
    id: '38',
    name: 'name 38',
    information: 'information 38',
    star: 72
  },
  {
    id: '39',
    name: 'name 39',
    information: 'information 39',
    star: 98
  },
  {
    id: '40',
    name: 'name 40',
    information: 'information 40',
    star: 47
  },
  {
    id: '41',
    name: 'name 41',
    information: 'information 41',
    star: 39
  },
  {
    id: '42',
    name: 'name 42',
    information: 'information 42',
    star: 48
  },
  {
    id: '43',
    name: 'name 43',
    information: 'information 43',
    star: 89
  },
  {
    id: '44',
    name: 'name 44',
    information: 'information 44',
    star: 19
  },
  {
    id: '45',
    name: 'name 45',
    information: 'information 45',
    star: 62
  },
  {
    id: '46',
    name: 'name 46',
    information: 'information 46',
    star: 57
  },
  {
    id: '47',
    name: 'name 47',
    information: 'information 47',
    star: 35
  },
  {
    id: '48',
    name: 'name 48',
    information: 'information 48',
    star: 37
  },
  {
    id: '49',
    name: 'name 49',
    information: 'information 49',
    star: 29
  },
  {
    id: '50',
    name: 'name 50',
    information: 'information 50',
    star: 44
  }
];
