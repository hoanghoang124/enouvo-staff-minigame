import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { State } from 'src/app/Store/reducers';
import * as fromStaff from '../../Store';
import { Staff } from '../Models/staff.model';
import Chart from 'chart.js';
import { fadeInAnimation } from '../animation/fade-in.animation';
import * as _ from 'lodash';
import { StarService } from '../Services/star.service';

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

  constructor(private store: Store<State>, private star: StarService) {}

  ngOnInit() {
    this.star.getStars().subscribe(res => {
      const name = _.map(res, 'name');
      const star = _.map(res, 'star');

      const chart = document.getElementById('myChart');
      this.myChart = new Chart(chart, {
        type: 'bar',
        data: {
          labels: name,
          datasets: [
            {
              label: 'number of stars',
              data: star,
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
