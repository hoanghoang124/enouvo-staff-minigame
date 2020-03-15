import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Auth/Services/auth.service';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/Store/actions/auth.action';
import { State } from 'src/app/Store/reducers';
import { Role } from 'src/app/Auth/Models/role.model';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  role: string;
  roles = Role;
  @Output() sidenavClose = new EventEmitter();
  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
