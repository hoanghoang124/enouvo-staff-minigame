import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../login/_models/user';
import { UserService } from '../login/_services/user.service';
import { AuthenticationService } from '../login/_services/authentication.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Staff } from '../shared/staff.model';
import { StaffService } from '../shared/staff.service';


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


