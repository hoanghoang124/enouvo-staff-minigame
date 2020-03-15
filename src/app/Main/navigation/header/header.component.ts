import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../Auth/Services/auth.service';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/Store/actions/auth.action';
import { State } from 'src/app/Store/reducers';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(new LogOut());
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
