import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Staff } from '../Models/staff.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store';
import * as appStore from '../../Store';
import * as fromAuth from '../../Store';
import { startWith, map, tap } from 'rxjs/operators';

export interface LastName {
  lastName: string;
}

export interface City {
  cityName: string;
}

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  staffForm: FormGroup;
  isLoadingResults$: Observable<boolean>;
  errorMessage$: Observable<string>;
  staff$: Observable<Staff>;
  hide = true;

  options: LastName[] = [
    { lastName: 'Tran' },
    { lastName: 'Nguyen' },
    { lastName: 'Le' },
    { lastName: 'Pham' },
    { lastName: 'Hoang' },
    { lastName: 'Huynh' },
    { lastName: 'Phan' },
    { lastName: 'Vu' },
    { lastName: 'Vo' },
    { lastName: 'Dang' },
    { lastName: 'Bui' },
    { lastName: 'Do' },
    { lastName: 'Ho' },
    { lastName: 'Ngo' },
    { lastName: 'Duong' }
  ];

  filteredLastName: Observable<LastName[]>;

  cities: City[] = [
    { cityName: 'An Giang' },
    { cityName: 'Ba Ria - Vung Tau' },
    { cityName: 'Bac Giang' },
    { cityName: 'Bac Kan' },
    { cityName: 'Bac Lieu' },
    { cityName: 'Bac Ninh' },
    { cityName: 'Ben tre' },
    { cityName: 'Binh Dinh' },
    { cityName: 'Binh Duong' },
    { cityName: 'Binh Phuoc' },
    { cityName: 'Binh Thuan' },
    { cityName: 'Ca Mau' },
    { cityName: 'Cao Bang' },
    { cityName: 'Dong Lam' },
    { cityName: 'Ky Dong' }
  ];

  filteredCityName: Observable<City[]>;

  positions: string[] = ['Staff', 'Admin', 'HR', 'Accountant'];

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: [null, Validators.required],
      lastName: [null, Validators.required],
      avatar: [null],
      email: [null, [Validators.required, Validators.email]],
      quote: [null, Validators.required],
      birthday: [{ value: null }, Validators.required],
      phone: [null, Validators.required],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);

    this.filteredLastName = this.staffForm.get('lastName').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.lastName)),
      map(lastName =>
        lastName ? this._filterLastName(lastName) : this.options.slice()
      )
    );

    this.filteredCityName = this.staffForm.get('addressCity').valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.cityName)),
      tap(city => console.log(city)),
      map(cityName =>
        cityName ? this.__filter(cityName) : this.cities.slice()
      )
    );
  }

  displayLastName(user: LastName): string {
    return user && user.lastName ? user.lastName : '';
  }

  private _filterLastName(lastName: string): LastName[] {
    const filterValue = lastName.toLowerCase();

    return this.options.filter(
      option => option.lastName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayCity(user: City): string {
    return user && user.cityName ? user.cityName : '';
  }

  private __filter(cityName: string): City[] {
    const filterValue = cityName.toLowerCase();

    return this.cities.filter(
      city => city.cityName.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onFormSubmit() {
    const register = {
      username: this.staffForm.get('username').value,
      email: this.staffForm.get('email').value
    };
    const staff: Staff = {
      id: this.staffForm.get('id').value,
      firstName: this.staffForm.get('firstName').value,
      middleName: this.staffForm.get('middleName').value,
      lastName: this.staffForm.get('lastName').value,
      avatar: this.staffForm.get('avatar').value,
      email: this.staffForm.get('email').value,
      quote: this.staffForm.get('quote').value,
      birthday: this.staffForm.get('birthday').value,
      phone: this.staffForm.get('phone').value,
      addressStreet: this.staffForm.get('addressStreet').value,
      addressCity: this.staffForm.get('addressCity').value,
      position: this.staffForm.get('position').value
    };
    console.log(register);
    this.isLoadingResults$ = this.store.select(appStore.getIsLoading);
    this.store.dispatch(new appStore.CreateAccount(register));
    this.store.dispatch(new appStore.CreateStaff(staff));
  }
}
