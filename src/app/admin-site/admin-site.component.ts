import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  public empData: Object;
  public temp: Object=false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
  this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((resp: Response) => {
    this.empData = resp;
    this.temp = true;
    });
}
