import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:any;
  loader:boolean = true;
  constructor(public webServ:ApiBaseService, public local:LocalStorageService) { }

  ngOnInit() {
    this.webServ.getPublicServices().subscribe(
      res => {
        this.loader = false;
        console.log(res);
        this.services = res;
      }
    )
  }

   bookService(service:any){
     this.local.store('service', service)
   }

}
