import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { NgForm } from '@angular/forms';
import { NgProgress } from "ngx-progressbar";

declare var $;

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  
  staff:any
  staffcategories:any;
  click:any;
  getter:any;
  currentBarber:any;
  barberID:any;
  currentCat:any;
  constructor(
    private api:ApiBaseService,
    private progress:NgProgress
  ) { }

  ngOnInit() {
    this.api.getStaffList().subscribe(res => {
        console.log(res);
        this.staff = res;
        for (let index = 0; index < this.staff.length; index++) {
          this.staff[index].work_days = JSON.parse(this.staff[index].work_days);
        }
        
        console.log(this.staff);
    })

    this.api.getStaffCat().subscribe(res => {
        this.staffcategories = res;
    })

   

  }

  fill(staff){
    this.currentBarber = staff.staff_name;
    this.currentCat = staff.staff_category;
    this.barberID = staff.id;
    console.log(this.barberID);
  }


  postStaff(form:NgForm){
    this.progress.start();
    for (let index = 0; index < form.value.staff_bio.length; index++) {
      if (form.value.staff_bio[index] == "'"){
        var start = form.value.staff_bio.split("'");
        form.value.staff_bio = form.value.staff_bio.substr(0, index) + '/' + form.value.staff_bio.substr(index + 1, form.value.staff_bio.length - 1);
      }
    }
    this.api.postNewStaff(form.value.staff_name, form.value.staff_bio, form.value.staff_category, form.value.staff_avatar).subscribe(
      res => {
        this.progress.done();
        console.log(res);
        if (res['message'] == "Success") {
          this.ngOnInit();
          this.click = document.getElementById('addCls');
          this.click.click();
        }
      }
    )
  }

  deleteStaff(id){
    this.progress.start();
    this.api.postDeleteStaff(id).subscribe(
      res => {
        this.progress.done();
        console.log(res);
        if (res['message'] == "Success") {
          this.ngOnInit();
        }
      }
    )
  }

  postSchedule(form:NgForm){
    console.log(form.value)
    this.getter = document.getElementById('getter');
    console.log(this.getter.data);
    console.log($('#getter').select2('val'))
    var data = $('#getter').select2('val'); 

    data = JSON.stringify(data);
    console.log(data);

    this.progress.start()
    
    this.api.postStaffSchedule(data, this.barberID).subscribe(
      res => {
        this.progress.done();
        console.log(res);
        if (res['message'] == "Success") {
          this.ngOnInit();
          this.click = document.getElementById('newCls');
          this.click.click();
        }
      }
    )
  }


}
