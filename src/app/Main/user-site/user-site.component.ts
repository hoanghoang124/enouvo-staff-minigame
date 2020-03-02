import { AuthGuardService } from "../../Auth/Services/auth-guard.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Auth/Models/user";
import { UserService } from "src/app/Auth/Services/user.service";

import { first } from "rxjs/operators";
import { PageEvent } from "@angular/material";
import { StaffService } from "../Services/staff.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-user-site",
  templateUrl: "./user-site.component.html",
  styleUrls: ["./user-site.component.css"]
})
export class UserSiteComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  staffs: any[] = [
    {
      id: "1",
      name: "name 1",
      information: "information 1",
      star: 22
    },
    {
      id: "2",
      name: "name 2",
      information: "information 2",
      star: 96
    },
    {
      id: "3",
      name: "name 3",
      information: "information 3",
      star: 3
    },
    {
      id: "4",
      name: "name 4",
      information: "information 4",
      star: 1
    },
    {
      id: "5",
      name: "name 5",
      information: "information 5",
      star: 17
    },
    {
      id: "6",
      name: "name 6",
      information: "information 6",
      star: 68
    },
    {
      id: "7",
      name: "name 7",
      information: "information 7",
      star: 25
    },
    {
      id: "8",
      name: "name 8",
      information: "information 8",
      star: 46
    },
    {
      id: "9",
      name: "name 9",
      information: "information 9",
      star: 87
    },
    {
      id: "10",
      name: "name 10",
      information: "information 10",
      star: 85
    }
  ];

  constructor(
    private staffService: StaffService,
    private userService: UserService,
    private authGuardService: AuthGuardService
  ) {
    this.currentUser = this.authGuardService.currentUserValue;
  }

  ngOnInit() {
    this.userService
      .getById(this.currentUser.id)
      .pipe(first())
      .subscribe(user => {
        this.userFromApi = user;
      });
    //   this.data.data = source;
    //   this.data.paginator = this.paginator;
    //   this.data.sort = this.sort;
    // }
  }
}
export class PaginatorConfigurableExample {
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map(str => +str);
    }
  }
}

export class GridListDynamicExample {
  tiles: Tile[] = [
    { text: "One", cols: 3, rows: 1, color: "lightblue" },
    { text: "Two", cols: 1, rows: 2, color: "lightgreen" },
    { text: "Three", cols: 1, rows: 1, color: "lightpink" },
    { text: "Four", cols: 2, rows: 1, color: "#DDBDF1" }
  ];
}
