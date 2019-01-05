import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

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
  revenue:any;
  yearRev:any;
  start:boolean = true;
  drillHold:any;
  loader:boolean = true;
  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {

    this.webServ.getStaffList().subscribe(
      res => {
        this.loader = false;
        this.staff = res[0];
        this.revenue = res[1];
        this.filter();
        this.webServ.getStaffCat().subscribe(
          res => {
            this.staffcategories = res;
          }
        )
        this.staff.forEach(element => {
          element.createddate = moment(element.createddate).format('DD/MM/YY')
        });

      }
    )
  }

  postStaff(form:NgForm){
    console.log(form);

    this.webServ.postNewStaff(form.value.staff_name, form.value.staff_bio, form.value.staff_category, this.file1, form.value.commission_rate, form.value.contact).subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }

  drillDown(staff:any){
    this.drillHold = staff;
    this.start = false;
  }

  filter(){

    console.log(this.revenue);

     this.yearRev = [];

    this.revenue.forEach(element => {
      if(element.year == moment().year() && moment(element.createddate).month() == moment().month()){
        this.yearRev.push(element);
      }
    });

    setTimeout(() => {
      console.log(this.revenue);
      this.sortCom();
    }, 500);

  }

  sortCom(){

    for (let index = 0; index < this.staff.length; index++) {
      this.staff[index].com = 0;
      this.staff[index].transactions = [];
      this.yearRev.forEach(element => {
        if(element.staff == this.staff[index].staff_name){
          element.commission = element.amount * (this.staff[index].commission_rate / 100) 
          this.staff[index].transactions.push(element);
          this.staff[index].com = (+this.staff[index].com + (+element.amount * (this.staff[index].commission_rate / 100) )) ;
          console.log(this.staff[index]);
        }
        
      });
        
    }
  }

  deleteStaff(id){
    this.webServ.postDeleteStaff(id).subscribe(
      res => {
        this.ngOnInit();
      }
    )
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
