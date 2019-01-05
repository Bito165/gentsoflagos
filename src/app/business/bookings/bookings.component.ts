import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { NgForm } from '../../../../node_modules/@angular/forms';
import { NgProgress } from "ngx-progressbar";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings:any;
  orders:any;
  noBookings:boolean = true;
  noOrders:boolean = true;
  bookingUpdate:boolean = false;
  orderUpdate:boolean = false;
  modalTitle:any;
  booking:any;
  order:any;
  errorMessage:any;
  loader:boolean = true;
  constructor(public api:ApiBaseService, public progress:NgProgress, public local:LocalStorageService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getBookingsOrders().subscribe(
      res => {
        console.log(res);
        this.bookings = res[0];
        this.loader = false;
        this.local.store('bookings',this.bookings.length);
        if(this.bookings.length > 0){
          this.noBookings = false;
          
          for (let index = 0; index < this.bookings.length; index++) {
            
            switch (this.bookings[index].status) {
              case 0:
                  this.bookings[index].state = 'Uncompleted';
                break;
              case 1:
                  this.bookings[index].state = 'Completed';
                break;
            
              default:
                break;
            }
          }
          console.log(this.bookings);
        }else{
          this.noBookings = true;
        }
      },
      err => {
        this.getData();
      }
    )
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

}
