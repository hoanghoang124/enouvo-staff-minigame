import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  constructor(private store: Store<State>, private router: Router) {}

  ngOnInit() {}
  back() {
    this.router.navigate(['/dashboard']);
  }
}
