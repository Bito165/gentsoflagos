import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { RevenueComponent } from "../revenue.component";
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-revenue',
  templateUrl: './monthly-revenue.component.html',
  styleUrls: ['./monthly-revenue.component.css']
})
export class MonthlyRevenueComponent implements OnInit {
  transactions:any;
  month:any;
  monthlyTransactions: Array <{week:any, transactions:any, value:any}> = [];
  index2:number = 0;
  constructor(public local:LocalStorageService, public home:RevenueComponent) { }

  ngOnInit() {
    this.transactions = this.local.retrieve('monthrevenue');
    this.month = this.local.retrieve('month');
    this.monthlyTransactions = [];

    this.transactions.forEach(element => {
      element.week = moment(element.createddate).isoWeek();
    });

    console.log(this.transactions);

    for (let index = 0; index < this.transactions.length; index++) {
      if(index == 0){
        this.monthlyTransactions.push({week: this.transactions[index].week, transactions:[], value:0})
      }else if(index > 0){
        if(this.transactions[index].week != this.monthlyTransactions[this.index2].week){
          this.monthlyTransactions.push({week: this.transactions[index].week, transactions:[], value:0})
        }
      }
      console.log(index);
      if(index == this.transactions.length - 1){
        console.log(this.monthlyTransactions);
        this.sort();
      }
    }
    

  }

  sort(){
    

    for (let index = 0; index < this.monthlyTransactions.length; index++) {
      this.transactions.forEach(item => {
        if (this.monthlyTransactions[index].week == item.week) {
          this.monthlyTransactions[index].transactions.push(item) 
        }
      });

      if(index == this.monthlyTransactions.length -1){
        this.monthlyTransactions[index].transactions.forEach(items => {
          this.monthlyTransactions[index].value = +this.monthlyTransactions[index].value + +items.amount;
        });
      }
      
    }

  }

  reset(){
    this.home.reset();
  }

  drillDown(week:any){
    this.local.store('weekRevenue', week.transactions);
    this.local.store('weekName', week.week);
    this.home.month = false;
    this.home.week = true;
  }
 
}
