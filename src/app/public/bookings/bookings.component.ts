import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";
import * as moment from 'moment'; 

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  customer_name:any;
  client_phone_number:any;
  currentService:any = '';
  currentBarber:any = '';
  staff:any;
  currentDate:any;
  currentTime:any;
  currentPrice:any;
  services:any;
  schedule:any;
  loader:boolean = true;
  maxDate:any;
  errMsg:any;
  title:any;
  status:any;
  constructor(public webServ:ApiBaseService, public local:LocalStorageService) { }

  ngOnDestroy(){
    this.local.clear('staff');
    this.local.clear('service');
  }

  ngOnInit() {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.getService();
    this.getBarber();
    this.webServ.getPreBooking().subscribe(
      res => {
        this.loader = false;
        console.log(res);
        this.services = res[0]
        this.staff = res[1]
        this.schedule = res[2]
      }
    )
  }

  setPrice(){
    for (let index = 0; index < this.services.length; index++) {
      if(this.services[index].service_name == this.currentService){
        this.currentPrice = this.services[index].service_price;
        console.log(this.currentPrice);
        return;
      }else{
        this.currentPrice = 0;
      }
    }
  }

  getService(){
    this.currentService = this.local.retrieve('service');
    if(this.currentService != null){
      this.currentPrice = this.currentService.service_price;
      this.currentService = this.currentService.service_name; 
    }else{
      this.currentService = ''
      this.currentPrice = 0;
    }
  }

  getBarber(){
    this.currentBarber = this.local.retrieve('staff');
    if(this.currentBarber != null){
      this.currentBarber = this.currentBarber.staff_name; 
    }else{
      this.currentBarber = '';
    }
  }

  bookAppointment(){
   
    this.title = 'Booking';
    this.errMsg = 'Booking Your Appointment. Please Wait';
    this.status = 'info';
    if(this.customer_name == '' || this.client_phone_number  == ''|| this.currentService=='' || this.currentBarber=='' || this.currentDate=='' || this.currentPrice == 0 || this.currentTime == ''){
      this.title = 'Error';
      this.errMsg = 'Please Fill In All The Fields';
      this.status = 'danger';
    }else
      if(this.client_phone_number.length != 10){
        this.title = 'Error';
        this.errMsg = 'Phone Number Invalid';
        this.status = 'danger';
      }
    else{
      this.currentDate = moment(this.currentDate).format('DD/MM/YY');
      this.webServ.postBooking(this.currentBarber, this.currentService, this.currentPrice, this.customer_name, this.currentDate, this.currentTime, this.client_phone_number, 0)
      .subscribe(
        res => {
          console.log(res);
          if(res['message'] == "Success"){
            this.title = 'Success';
            this.errMsg = 'Hey ' + this.customer_name + ', your booking with ' + this.currentBarber + ' for ' + this.currentDate + ' by ' + this.currentTime + ' has been confirmed';
            this.status = 'success';
            this.customer_name = ''; this.client_phone_number  = ''; this.currentService =''; this.currentBarber = ''; this.currentDate =''; this.currentPrice = 0; this.currentTime = '';
          }else if(res['message'] == "Invalid"){
            this.title = 'Error';
            this.errMsg = this.currentBarber + ' has already been booked for that time slot';
            this.status = 'danger';
          }
          else{
            this.title = 'Error';
            this.errMsg = 'An Error Occured While Booking Your Appointment. Please Try Again';
            this.status = 'danger';
          }
        }, 
        err => {
          this.title = 'Error';
            this.errMsg = 'A Network Error Occured While Booking Your Appointment. Please Try Again';
            this.status = 'danger';
        }
      )
    }
    
  }

}
