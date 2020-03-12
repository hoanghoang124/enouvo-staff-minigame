import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { State } from 'src/app/Store/reducers';
import * as fromStaff from '../../Store';
import { Staff } from '../Models/staff.model';
import { Star } from '../Models/star.model';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'position', 'actions'];
  data = new MatTableDataSource<Staff>();
  stafflist$: Observable<any>;
  isLoadingResults$: Observable<boolean>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  data1: Star[];
  url = 'http://5e55e20836450d001428865d.mockapi.io/star';
  name = [];
  star = [];
  barchart: any;
  myChart: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http: HttpClient, private store: Store<State>) {}

  ngOnInit() {
    const chart = document.getElementById('myChart');
    this.myChart = new Chart(chart, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

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
  goto(id) {
    this.store.dispatch(new fromStaff.GetStaff(id));
  }
}
