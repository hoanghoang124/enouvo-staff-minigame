import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { StaffService } from 'src/app/Shared/Services/staff.service';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {

  staffForm: FormGroup;
  id = 0;
  name = '';
  information = '';
  star = 0;
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private staffService: StaffService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getstaff(this.route.snapshot.params.id);
    this.staffForm = this.formBuilder.group({
    name : [null, Validators.required],
    information : [null, Validators.required],
    star : [null, Validators.required]
  });
  }

  getstaff(id) {
    this.staffService.getStaff(id).subscribe(data => {
      this.id = Number(data.id);
      this.staffForm.setValue({
        name: data.name,
        information: data.information,
        star: data.star
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.staffService.updateStaff(form)
      .subscribe(res => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/admin', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productdetails() {
    this.router.navigate(['/admin', this.id]);
  }
}
