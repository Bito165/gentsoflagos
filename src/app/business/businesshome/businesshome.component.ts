import { Component, OnInit } from '@angular/core';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import * as moment from 'moment'
import { LocalStorage, LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-businesshome',
  templateUrl: './businesshome.component.html',
  styleUrls: ['./businesshome.component.css']
})
export class BusinesshomeComponent implements OnInit {
  user:any;
  constructor(private api:ApiBaseService, private local:LocalStorageService) { }

  ngOnInit() {
    this.user = this.local.retrieve('user_info');

    console.log(this.user);
    
    this.api.dashboard().subscribe(
      res => {
        console.log(res);
      }
    )
  }

}
