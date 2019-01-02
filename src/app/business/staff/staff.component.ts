import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffcategories:any;
  staff:any;
  currentBarber:any;
  barberID:any;
  file1:any;
  currentCat:any;
  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {
    this.webServ.getStaffCat().subscribe(
      res => {
        this.staffcategories = res;
      }
    )

    this.webServ.getStaffList().subscribe(
      res => {
        this.staff = res[0];
      }
    )
  }

  postStaff(form:NgForm){
    console.log(form);

    this.webServ.postNewStaff(form.value.staff_name, form.value.staff_bio, form.value.staff_category, this.file1).subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }

  fill(){

  }

  deleteStaff(){

  }

  postSchedule(){

  }

  handleUpload(e: FileList) {
    console.log(e);
    this.file1 =  e.item(0);
    console.log(this.file1);
    console.log(this.file1);
  }

}
