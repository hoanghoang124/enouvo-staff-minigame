import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../staff.service';
import { Staff } from '../staff.model';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private staffService: StaffService, private router: Router) { }

  staff: Staff = { id: '0', name: '', information: '', star: 0 };
  isLoadingResults = true;

  getstaff(id) {
    this.staffService.getStaff(id)
      .subscribe(data => {
        this.staff = data;
        this.isLoadingResults = false;
      });
  }

  deletestaff(id) {
    this.isLoadingResults = true;
    this.staffService.deleteStaff(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/admin']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  ngOnInit() {
    this.getstaff(this.route.snapshot.params.id);
  }

}
