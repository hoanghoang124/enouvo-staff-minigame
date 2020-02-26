import { Component, OnInit } from "@angular/core";
import { DataTablesModule } from "angular-datatables";
import { BrowserModule } from "@angular/platform-browser";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import "rxjs";
import { Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { StaffService } from "./staff.service";
import { Staff } from "./staff.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-site",
  templateUrl: "./admin-site.component.html",
  styleUrls: ["./admin-site.component.css"]
})
export class AdminSiteComponent implements OnInit {
  displayedColumns: string[] = ["name", "information", "star"];
  data: Staff[] = [];
  isLoadingResults = true;

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.staffService.getStaffs().subscribe(
      res => {
        this.data = res;
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
