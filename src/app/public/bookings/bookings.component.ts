import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms'; 
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  maxDate:any
  maxTime:any;
  services:any;
  staff:any;
  customer_name:any;
  client_phone_number:any;
  price:any;
  current_service:any = 0;
  modalmsg:any;
  constructor(private api:ApiBaseService) { }

  ngOnInit() {
    this.maxDate = moment().format('YYYY-MM-DD');
    this.maxTime = new Date().getTime();
    console.log(this.maxTime);
    this.api.getPreBooking().subscribe(
      res => {
        this.services = res[0];
        this.staff = res[1];
      }
    )
  }

  postBooking(form:NgForm){
    console.log(this.customer_name)
    console.log(this.client_phone_number)
    console.log(this.current_service)
    console.log(this.price);
    console.log(form.value);

    this.modalmsg = "Booking Your Appointment";

       
    this.api.postBooking(form.value.barber, this.current_service, this.price, this.customer_name, form.value.date, form.value.time, this.client_phone_number).subscribe(
      res => {
        console.log(res);
        if(res['message']=="Success"){
          this.modalmsg = "Your Appointment with " + form.value.barber + " on " + form.value.date + " by " + form.value.time + " has been booked.";
          form.reset()
          this.customer_name = "";
          this.client_phone_number = "";
        }else{
          this.modalmsg = "An Error Occured while booking your appointment. Please Try Again"
        }
      }
    )

  }

  setPrice(){
    console.log(this.current_service);
    console.log(this.services);
    for (let index = 0; index < this.services.length; index++) {
      if(this.current_service == this.services[index].service_name){
        this.price = this.services[index].service_price;
      }
    }
    console.log(this.price)
  }
}
