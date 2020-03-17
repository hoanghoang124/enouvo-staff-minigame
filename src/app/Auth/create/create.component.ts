import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/Store/reducers';
import * as fromAuth from '../../Store';
import { slideInOutAnimation } from '../../Main/animation/slide-in-out.animation';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class CreateComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  registerForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuth.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuth.getIsLoading);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(new fromAuth.Create(this.registerForm.value));
  }
}