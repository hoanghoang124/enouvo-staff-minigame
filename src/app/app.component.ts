import { AuthService } from './Auth/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/Store/actions/auth.action';
import { State } from 'src/app/Store/reducers';
import { Role } from 'src/app/Auth/Models/role.model';
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	role: string;
	roles = Role;
	constructor(private store: Store<State>, public authService: AuthService) {}

	ngOnInit() {
		this.role = localStorage.getItem('role');
	}

	logOut(): void {
		this.store.dispatch(new LogOut());
	}
}
