import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Auth/Services/auth.service';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/Store/actions/auth.action';
import { State } from 'src/app/Store/reducers';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
  onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
