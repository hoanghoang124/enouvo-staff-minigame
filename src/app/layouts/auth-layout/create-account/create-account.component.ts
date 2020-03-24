import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Store } from "@ngrx/store";
import { State } from "../store";
import * as fromAuthSelector from "../store/auth.selector";
import * as fromAuthAction from "../store/auth.action";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"]
})
export class CreateAccountComponent implements OnInit {
  errorMessage$: Observable<string>;
  isLoadingResults$: Observable<boolean>;
  createAccountForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.createAccountForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      birthday: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      roleId: ["", Validators.required],
      addressCity: ["", Validators.required],
      addressStreet: ["", Validators.required]
    });
    this.errorMessage$ = this.store.select(fromAuthSelector.getErrorMessage);
    this.isLoadingResults$ = this.store.select(fromAuthSelector.getIsLoading);
  }

  onSubmit() {
    if (this.createAccountForm.invalid) {
      console.log("Form invalid");

      return;
    } else {
      console.log("Form valid");
    }

    this.store.dispatch(
      new fromAuthAction.CreateAccount(this.createAccountForm.value)
    );
  }
}
