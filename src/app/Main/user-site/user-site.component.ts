import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Auth/Models/user';
import { StaffService } from 'src/app/Core/Services/staff.service';
import { UserService } from 'src/app/Auth/Services/user.service';
import { AuthenticationService } from 'src/app/Auth/Services/authentication.service';
import { first } from 'rxjs/operators';
import { PageEvent } from '@angular/material';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {
  currentUser: User;
  userFromApi: User;

  constructor(
    private staffService: StaffService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
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
        .split(',')
        .map(str => +str);
    }
  }
}

export class GridListDynamicExample {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' }
  ];
}
