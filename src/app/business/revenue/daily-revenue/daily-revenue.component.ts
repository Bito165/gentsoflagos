import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { RevenueComponent } from "../revenue.component";
import * as moment from "moment";

@Component({
  selector: 'app-daily-revenue',
  templateUrl: './daily-revenue.component.html',
  styleUrls: ['./daily-revenue.component.css']
})
export class DailyRevenueComponent implements OnInit {
  transactions:any;
  total:any;
  today:any;
  constructor(public local:LocalStorageService, public home:RevenueComponent) { }

  ngOnInit() {
   this.transactions = this.local.retrieve('dayRevenue');
   this.total = this.local.retrieve('dayAmount');
   this.today = this.local.retrieve('day')
  }

  reset(){
    this.home.reset();
  }
}
