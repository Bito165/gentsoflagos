import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { NgForm } from '../../../../node_modules/@angular/forms';
import { NgProgress } from "ngx-progressbar";
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
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
        this.loader = false;
        this.orders = res[1];
        this.local.store('orders',this.orders.length);
        if(this.orders.length > 0){
          this.noOrders = false;
          for (let index = 0; index < this.orders.length; index++) {
            this.orders[index].date_due = moment(this.orders[index].date_due).format('DD/MM/YY');
            switch (this.orders[index].status) {
              case 0:
                  this.orders[index].state = 'Recieved';
                break;
              case 1:
                  this.orders[index].state = 'Processing';
                break;
              case 2:
                  this.orders[index].state = 'In Transit';
                break;
              case 3:
                  this.orders[index].state = 'Delivered';
                break;
            
              default:
                break;
            }
          }
        }else{
          this.noOrders = true;
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


  viewOrder(order:object){
    this.resetModal();
    console.log(order);
    this.orderUpdate = true;
    this.modalTitle = 'Update Order';
    this.order = order;
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

