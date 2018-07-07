import { Component, OnInit } from '@angular/core';
import { LocalStorage,LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'business-nav',
  templateUrl: './business-nav.component.html',
  styleUrls: ['./business-nav.component.css']
})
export class BusinessNavComponent implements OnInit {
  user:any;

  constructor(private local:LocalStorageService) { }

  ngOnInit() {
    this.user = this.local.retrieve('User_info');
  }

}
