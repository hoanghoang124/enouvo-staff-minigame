import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-site',
  templateUrl: './admin-site.component.html',
  styleUrls: ['./admin-site.component.css']
})
export class AdminSiteComponent implements OnInit {
  url = 'http://5e44b0ece85a4e001492c1b1.mockapi.io/Staff';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get(this.url);
  }
}
