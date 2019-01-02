import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {
  cart:any;
  count:any;
  constructor(public local:LocalStorageService) { }

  ngOnInit() {

      setInterval( () => {
      this.cart = this.local.retrieve('cart');
      if(this.cart == null){
        this.count = 0
      }else{
        this.count = this.cart.length;
      }
    }, 500)
  }

}

