import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment';
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
  bookingUpdate:boolean = false;
  orderUpdate:boolean = false;
  modalTitle:any;
  revenuesources:any;
  expensesources:any;
  noOrders:boolean = false;
  noBookings: boolean = false;
  click:any;
  staff:any;
  errorMessage:any;
  loader:boolean = true;
  academy:any;
  constructor(private api:ApiBaseService, private local:LocalStorageService, private progress:NgProgress) { }

  ngOnInit() {

    this.user = this.local.retrieve('user_info');

    console.log(this.user);

    var next = moment().subtract(22, 'days').calendar();

    console.log(moment('Sun Dec 20 2018 11:23:08 GMT+0100 (West Africa Standard Time)').month());
    
    this.getData();


  }


  getData(){

    this.loader = true;

    this.api.getDashboard().subscribe(
      res => {
        console.log(res);
        this.loader = false;
        this.orders = res[0];
        this.bookings = res[1];
        this.academy = res[2];
        this.revenuesources = res[3];
        this.expensesources = res[4];
        this.staff = res[5];
        this.local.store('orders',this.orders.length);
        this.local.store('bookings',this.bookings.length);
        this.local.store('academy',this.academy.length)
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
    this.errorMessage = '';
    var week_day = moment().format('dddd');
    var month = moment().format('MMMM');
    var year = moment().format('YYYY');

    this.progress.start();
    if(form.value.amount == '' || form.value.amount <= 0 || form.value.source == '' || form.value.staff == ''){
      this.progress.done();

      if(form.value.amount <= 0){
        this.errorMessage = 'Invalid Amount Entered';
      }else{
        this.errorMessage = 'All Fields Are Required';
      }

    }else{
      this.api.postRevenue(form.value.amount, form.value.source, form.value.staff, week_day, month, year).subscribe(
        res => {
          console.log(res);
          if (res['message'] == 'Success'){
            this.progress.done();
            this.click = document.getElementById('revClose');
            this.click.click();
            form.reset();
          }else{
            this.progress.done();
            this.errorMessage = 'An Error Occured. Please Try Again';
          }
        },
        err => {
          this.progress.done();
          form.reset();
          this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
        }
      )
    }
  }

  postExpense(form: NgForm) {
    this.errorMessage = '';
    var week_day = moment().format('dddd');
    var month = moment().format('MMMM');
    var year = moment().format('YYYY');
    this.progress.start();
    if(form.value.amount == '' || form.value.amount <= 0 || form.value.source == ''){
      this.progress.done();
      if(form.value.amount <= 0){
        this.errorMessage = 'Invalid Amount Entered';
      }else{
        this.errorMessage = 'All Fields Are Required';
      }

    }else{

    this.api.postExpense(form.value.amount, form.value.source, week_day, month, year).subscribe(
      res => {
        console.log(res);
        if (res['message'] == 'Success') {
          this.progress.done();
          this.click = document.getElementById('expClose');
          this.click.click();
          form.reset();
        }else{
          this.progress.done();
          this.errorMessage = 'An Error Occured. Please Try Again';
        }
      },
      err => {
        this.progress.done();
        form.reset();
        this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
      }
    )

    }


  }

  resetModal(){
    this.bookingUpdate = false;
    this.orderUpdate = false;
    this.modalTitle = '';
  }

  viewBooking(booking:object){
    console.log(booking);
    this.resetModal();
    this.bookingUpdate = true;
    this.modalTitle = 'Update Booking';
    this.booking = booking;
  }

  viewOrder(order:object){
    this.resetModal();
    console.log(order);
    this.orderUpdate = true;
    this.modalTitle = 'Update Order';
    this.order = order;
  }

  updateBookingStatus(){
    this.errorMessage = ''
    this.progress.start();
    this.api.postBookingStatusUpdate(this.booking.id, this.booking.status).subscribe(
      res => {
        if(res['message']== 'Success'){
          this.progress.done();
          this.getData();
          document.getElementById('clsBooking').click();
        }else{
          this.progress.done();
          this.errorMessage = 'An Error Occured. Please Try Again';
        }
      },
      err => {
        this.progress.done();
        this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
      }
    )
  }

  updateOrderStatus(){
    this.errorMessage = ''
    this.progress.start();
    this.api.postOrderStatusUpdate(this.order.id, this.order.status).subscribe(
      res => {
        if(res['message']== 'Success'){
          this.progress.done();
          this.getData();
          document.getElementById('ordercls').click();
        }else{
          this.progress.done();
          this.errorMessage = 'An Error Occured. Please Try Again';
        }
      },
      err => {
        this.progress.done();
        this.errorMessage = 'A Network Error Occured. Please Check Your Connection And Try Again';
      }
    )
  }
  

}
