import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  merch:any;
  noMerch:boolean  = true;
  loader:boolean = true;
  constructor(public webServ:ApiBaseService, public local:LocalStorageService) { }

  ngOnInit() {
    this.webServ.getPublicMerch().subscribe(
      res => {
        console.log(res);
        this.merch = res;
        this.loader = false;
        if(this.merch.length == 0){
          this.noMerch = true;
        }else{
          this.noMerch = false;
        }

      }
    )
  }

  selectMerch(merch:any){
    this.local.store('merch', merch);
  }

}
