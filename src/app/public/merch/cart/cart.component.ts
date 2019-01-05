import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { ApiBaseService } from "../../../../services/apibase/api-base.service";
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
declare var PaystackPop;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any;
  start:boolean = true;
  total:any;
  amount:any = 0;
  emptycart:boolean = false;
  begin:number = 0;
  end:number = 3;
  reason:any;
  private PayStack = PaystackPop;
  buttonMessage:any = 'Pay Now';
  errMsg:any;
  userDetails:any;
  posted:boolean = true;
  customer_name:any;
  client_phone_number:any;
  delivery_address:any;
  checksOut:boolean = false;
  noStock: Array<{item_ordered: string, item_size: string, item_quantity: string}> = [];
  constructor(public local:LocalStorageService, public webService:ApiBaseService) { }


  ngOnInit() {
    this.cart = this.local.retrieve('cart');
    if(this.cart == null || this.cart.length == 0){
      this.emptycart = true;
    }else{
      for (let index = 0; index < this.cart.length; index++) {
        this.amount = +this.amount + +(this.cart[index].price * this.cart[index].item_quantity);
      }
  
      this.total = 1000 + +this.amount;
    }
  }

  loadmore(){
    this.end = +this.end + 3;
    if(this.cart.length <= this.end){
      document.getElementById('load-more').style.display = 'none';
    }
  }

  checkOut(){
    this.errMsg = '';
    if(this.customer_name == '', this.client_phone_number == '', this.delivery_address == ''){
      this.errMsg = 'Please Fill In All Fields';
    }else{
      this.buttonMessage = 'Working...';
      this.noStock = [];
      
      for (let index = 0; index < this.cart.length; index++) {
        this.webService.postCheckItemAvailability(this.cart[index].item_ordered, this.cart[index].item_size, this.cart[index].item_quantity, this.cart[index].item_color)
         .subscribe(
           res => {
             console.log(res);
             if(res['status'] == '1'){
               this.checksOut = true;
             }else{
               this.checksOut = false;
               this.noStock.push({item_ordered:this.cart[index].item_ordered, item_size:this.cart[index].item_size, item_quantity:this.cart[index].item_quantity});
             }
             console.log(this.checksOut);
             if(index == +this.cart.length - 1){
                this.trial();
             }
           }
         )        
       }
     
    }
  }

  trial(){
     if(this.checksOut == true){
       
       const handler = this.PayStack.setup(
         {
           key: 'pk_live_aed873b1b130026d4db81086bfcfc612795a35a4',
           email: 'gentsoflagos@gmail.com',
           amount: this.total * 100,
           callback: (iresponse) => {
             console.log(iresponse);
             this.createOrder(iresponse)
           }, 
           onClose: () => {
             this.buttonMessage = "Pay Now";
           }
         });
       handler.openIframe();
       
     }else{
       this.buttonMessage = 'Pay Now';
       document.getElementById('modal-trigg').click();
     }
  }

  clearNoStock(){
    this.noStock = [];
  }

  createOrder(transaction_ref:any){
    var week_day = moment().format('dddd');
    var month = moment().format('MMMM');
    var year = moment().format('YYYY');
    var date_due = moment().add('6', 'days').format('DD/MM/YY');

    for (let index = 0; index < this.cart.length; index++) {
        console.log('start');
        this.webService.postOrder(this.cart[index].item_ordered, this.cart[index].item_quantity, this.cart[index].item_color,this.cart[index].item_size, this.customer_name, date_due, 0, this.delivery_address, this.client_phone_number, transaction_ref.reference, this.total, week_day,month, year)
        .subscribe(
          res =>{
            if (res['message'] == 'Success'){
              this.posted = true;
            }else{
              this.errMsg = 'An Error Occured. Please Try Again';
              this.posted = false
            }
          },
          err => {
            this.posted = false;
            this.errMsg = 'A Network Error Occured. Please Try Again';
          }
        )
    }
    console.log('start');
    this.emptycart = true;
    if(this.posted == true){
      document.getElementById('modal-trigger').click();
      this.local.clear('cart');
      this.cart = this.local.retrieve('cart')
      if(this.cart == null || this.cart.length == 0){
        this.emptycart = true;
      }
    }
  }

  removeItem(index:any){
    console.log(index);
    this.cart.splice(index, 1);
    this.local.store('cart', this.cart);
    console.log(this.cart.length)
    if(this.cart.length == 0){
      this.emptycart = true;
    }else{
      this.amount = 0;
      for (let index = 0; index < this.cart.length; index++) {
        this.amount = +this.amount + +(this.cart[index].price * this.cart[index].item_quantity);
      }
      this.total = 1000 + +this.amount;
    }
    
  }

}
