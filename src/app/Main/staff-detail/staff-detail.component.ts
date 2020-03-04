import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/Store/reducers";
import { Staff } from "src/app/Main/Models/staff.model";
import { StaffService } from "../Services/staff.service";
import * as fromStaff from "../../Store";
@Component({
  selector: "app-staff-detail",
  templateUrl: "./staff-detail.component.html",
  styleUrls: ["./staff-detail.component.css"]
})
export class StaffDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router,
    private store: Store<State>
  ) {}

  staff: Observable<Staff>;
  isLoadingResults = true;

  // getstaff(id) {
  //   this.staffService.getStaff(id)
  //     .subscribe(data => {
  //       this.staff = data;
  //       this.isLoadingResults = false;
  //     });
  // }

  deletestaff(id) {
    this.isLoadingResults = true;
    this.staffService.deleteStaff(id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(["/admin"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  ngOnInit() {
    // this.getstaff(this.route.snapshot.params.id);
    this.route.params.subscribe(params => {
      this.store.dispatch(new fromStaff.GetStaff(params.id));
      this.isLoadingResults = false;
    });
    this.staff = this.store.select(fromStaff.getStaff);
  }
}
