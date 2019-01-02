import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-merch-view',
  templateUrl: './merch-view.component.html',
  styleUrls: ['./merch-view.component.css']
})
export class MerchViewComponent implements OnInit, OnDestroy {
  merch:any;
  errMsg:any;
  buynow:boolean = false;
  cart: Array<{item_ordered: string, item_size: string, item_quantity: string, price:number, item_avatar:any, item_color:any}> = [];
  constructor(public local:LocalStorageService, public router:Router) { }

  ngOnInit() {
   
    this.merch = this.local.retrieve('merch');
    this.cart = this.local.retrieve('cart');
    if(this.cart == null){
      this.cart = [];
    }
    console.log( this.cart);
    if(this.merch == null){
      console.log(this.merch);
      this.router.navigate(['/merch']);
    }
  }


  addItem(form:NgForm){
    this.errMsg = '';
    if(form.value.size == '' || form.value.quantity == ''){
      this.errMsg = 'Please Fill All Fields';
      this.buynow = false;
    }else{ 
      this.cart.push({item_ordered: this.merch.item_name, item_size: form.value.size, item_quantity: form.value.quantity, price:this.merch.item_price, item_avatar:this.merch.item_avatar, item_color:this.merch.item_color});
      this.local.store('cart', this.cart);
      console.log(this.buynow)
      if(this.buynow == true){
        this.router.navigate(['/cart']);
      }else{
        document.getElementById('modal-trigger').click(); 
        form.reset();
      }
    }
  }

  ngOnDestroy(){
    // this.local.clear('merch');
  }

}
