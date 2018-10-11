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
  number:number = 0;
  press:any;
  constructor(private local:LocalStorageService) { }

  ngOnInit() {
    this.user = this.local.retrieve('User_info');
    console.log("Relaunching");
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
    if(this.number == 0){
      this.number = 1;
      this.local.store("number", this.number)
      this.holder.style.transform = "translate(0px, 0)"
      console.log(this.holder.style.transform)
    }else if(this.number == 1){
      this.number = 0;
      this.local.store("number", this.number)
      this.holder.style.transform = "translate(-230px, 0)";
      console.log(this.holder.style.transform)
    }
  }


}
