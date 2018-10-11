  import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { LocalStorage, LocalStorageService } from "ngx-webstorage";
import { NgForm } from '../../../../node_modules/@angular/forms';
import { NgProgress } from "ngx-progressbar";

@Component({
  selector: 'app-businesshome',
  templateUrl: './businesshome.component.html',
  styleUrls: ['./businesshome.component.css']
})
export class BusinesshomeComponent implements OnInit {
  user:any;
  orders = [];
  bookings = [];
  title;
  order;
  booking;
  revenuesources:any;
  expensesources:any;
  noOrders:boolean = false;
  noBookings: boolean = false;
  click:any;
  constructor(private api:ApiBaseService, private local:LocalStorageService, private progress:NgProgress) { }

  ngOnInit() {
    this.user = this.local.retrieve('user_info');

    console.log(this.user);
    
    this.api.getDashboard().subscribe(
      res => {
        console.log(res);
        this.orders = res[0];
        this.bookings = res[1];
        this.revenuesources = res[2];
        this.expensesources = res[3];
        console.log(this.revenuesources, this.expensesources);
        console.log(this.bookings.length, this.orders);
        if(this.orders.length == 0){
          this.noOrders = true;
        }

        if (this.bookings.length == 0) {
          console.log(this.bookings.length);
          this.noBookings = true;
        }
      }
    )


  }

  postRevenue(form:NgForm){
    var week_day = moment().format('dddd');
    var month = moment().format('MMMM');
    var year = moment().format('YYYY');
    this.progress.start();
    this.api.postRevenue(form.value.amount, form.value.source, form.value.staff, week_day, month, year).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success'){
          this.progress.done();
          this.click = document.getElementById('revClose');
          this.click.click();
        }else{
          this.progress.done();
        }
      }
    )
  }

  postExpense(form: NgForm) {
    var week_day = moment().format('dddd');
    var month = moment().format('MMMM');
    var year = moment().format('YYYY');
    this.progress.start();
    this.api.postExpense(form.value.amount, form.value.source, week_day, month, year).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.click = document.getElementById('expClose');
          this.click.click();
        } else {
          this.progress.done();
        }
      }
    )
  }

}
