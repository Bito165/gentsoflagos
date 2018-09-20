  import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { LocalStorage, LocalStorageService } from "ngx-webstorage";
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-businesshome',
  templateUrl: './businesshome.component.html',
  styleUrls: ['./businesshome.component.css']
})
export class BusinesshomeComponent implements OnInit {
  user:any;
  orders = [];
  bookings = [];
  revenuesources:any;
  expensesources:any;
  noOrders:boolean = false;
  noBookings: boolean = false;
  constructor(private api:ApiBaseService, private local:LocalStorageService) { }

  ngOnInit() {
    this.user = this.local.retrieve('user_info');

    console.log(this.user);
    
    this.api.getDashboard().subscribe(
      res => {
        console.log(res);
        this.orders = res[0];
        this.bookings = res[1];
        this.revenuesources = res[2][0];
        this.expensesources = res[3][0];
        console.log(this.revenuesources, this.expensesources);
        console.log(this.revenuesources, this.expensesources);
      }
    )

    if(this.orders.length == 0){
      this.noOrders = true;
    }

    if (this.bookings.length == 0) {
      this.noBookings = true;
    }

  }

  postRevenue(form:NgForm){
    console.log(form.value)
    
  }

  postExpense(form: NgForm) {
    console.log(form.value)
  }

}
