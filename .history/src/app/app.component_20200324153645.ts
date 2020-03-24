import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
=======
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'enouvo-staff-minigame';
  role: string;
  roles = Role;
  constructor(private store: Store<State>, public authService: AuthService) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
>>>>>>> f0867d2c5f7eb7ecc80990bc5a5f81ad6027d152
}
