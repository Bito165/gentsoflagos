import { Component, OnInit } from '@angular/core';
import { LocalStorage,LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'business-nav',
  templateUrl: './business-nav.component.html',
  styleUrls: ['./business-nav.component.css']
})
export class BusinessNavComponent implements OnInit {
  user:any;
  holder:any;
  number:boolean = false;
  press:any;
  academy;
  bookings;
  orders;
  constructor(private local:LocalStorageService) { }

  ngOnInit() {
    this.user = this.local.retrieve('User_info');
   
    setInterval(() => {
      this.academy = this.local.retrieve('academy')
      this.bookings = this.local.retrieve('bookings')
      this.orders = this.local.retrieve('orders')
    }, 500);
    
    if (this.local.retrieve('number')){
      this.number = this.local.retrieve('number');
      this.press = document.getElementById('press');
      this.press.click();
    }
  }

  bito(){
    console.log(this.number)
    this.holder = document.getElementById('ashad');
    console.log(this.holder);
    if(this.number == false){
      this.number = true;
      this.local.store("number", this.number)
      this.holder.style.transform = "translate(0px, 0)"
      console.log(this.holder.style.transform)
    }else if(this.number == true){
      this.number = false;
      this.local.store("number", this.number)
      this.holder.style.transform = "translate(-230px, 0)";
      console.log(this.holder.style.transform)
    }
  }


}
