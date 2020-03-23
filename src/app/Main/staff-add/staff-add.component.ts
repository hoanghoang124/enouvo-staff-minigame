import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Staff } from '../Models/staff.model';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store';
import * as appStore from '../../Store';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

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

  options: string[] = [
    'Tran',
    'Nguyen',
    'Le',
    'Pham',
    'Hoang',
    'Huynh',
    'Phan',
    'Vu',
    'Vo',
    'Dang',
    'Bui',
    'Do',
    'Ho',
    'Ngo',
    'Duong'
  ];

  filteredLastName: Observable<string[]>;

  cities: string[] = [
    'An Giang',
    'Ba Ria - Vung Tau',
    'Bac Giang',
    'Bac Kan',
    'Bac Lieu',
    'Bac Ninh',
    'Ben tre',
    'Binh Dinh',
    'Binh Duong',
    'Binh Phuoc',
    'Binh Thuan',
    'Ca Mau',
    'Cao Bang',
    'Can Tho',
    'Da Nang',
    'Dong Lam',
    'Dien Bien',
    'Dong Nai',
    'Dong Thap',
    'Gia Lai',
    'Ha Giang',
    'Ha Nam',
    'Ha Tinh',
    'Ha Noi',
    'Hai Duong',
    'Hai Phong',
    'Hau Giang',
    'Ho Chi Minh3',
    'Hoa Binh',
    'Hung Yen',
    'Khanh Hoa',
    'Kien Giang',
    'Kon Tum',
    'Ky Dong',
    'Lai Chau',
    'Lam Dong',
    'Lang Son',
    'Lao Cai',
    'Long An',
    'Nam Dinh',
    'Nghe An',
    'Ninh Binh',
    'Ninh Thuan',
    'Phu Hue',
    'Phu Yen',
    'Quang Binh',
    'Quang Nam',
    'Quang Ngai',
    'Quang Ninh',
    'Quang Tri',
    'Soc Trang',
    'Son La',
    'Tay Ninh',
    'Thai Binh',
    'Thai Nguyen',
    'Thanh Hoa',
    'Thua Thien Hue',
    'Tien Giang',
    'Tra Vinh',
    'Tuyen Quang',
    'Vinh Long',
    'Vinh Phuc',
    'Yen Bai'
  ];

  filteredCityName: Observable<string[]>;

  positions: string[] = ['Accountant', 'Admin', 'HR', 'Staff'];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    public dialogRef: MatDialogRef<StaffAddComponent>
  ) {}

  ngOnInit() {
    this.staffForm = this.formBuilder.group({
      id: [null, Validators.required],
      firstName: [null, Validators.required],
      middleName: null,
      lastName: [null, Validators.required],
      avatar: 'https://i.imgur.com/OONhP9c.jpg',
      email: [null, [Validators.required, Validators.email]],
      quote: null,
      birthday: [null, Validators.required],
      phone: [null, Validators.required],
      addressStreet: [null, Validators.required],
      addressCity: [null, Validators.required],
      position: [null, Validators.required]
    });
    this.errorMessage$ = this.store.select(appStore.getErrorMessage);

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
      map(cityName =>
        cityName ? this.__filter(cityName) : this.cities.slice()
      )
    );
    this.isLoadingResults$ = this.store.select(appStore.getIsLoading);
  }

  displayLastName(user: string): string {
    return user;
  }

  private _filterLastName(lastName: string): string[] {
    const filterValue = lastName.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayCity(user: string): string {
    return user;
  }

  private __filter(cityName: string): string[] {
    const filterValue = cityName.toLowerCase();

    return this.cities.filter(
      city => city.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onFormSubmit() {
    this.store.dispatch(new appStore.CreateStaff(this.staffForm.value));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
