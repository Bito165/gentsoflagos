import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { RevenueComponent } from "../revenue.component";
@Component({
  selector: 'app-weekly-revenue',
  templateUrl: './weekly-revenue.component.html',
  styleUrls: ['./weekly-revenue.component.css']
})
export class WeeklyRevenueComponent implements OnInit {
  transactions:any;
  mondayTransactions:any = [];
  mondayAmount:number = 0;
  tuesdayTransactions:any = [];
  tuesdayAmount:number = 0;
  wednesdayTransactions:any = [];
  wednesdayAmount:number = 0;
  thursdayTransactions:any = [];
  thursdayAmount:number = 0;
  fridayTransactions:any = [];
  fridayAmount:number = 0;
  sundayTransactions:any = [];
  sundayAmount:number = 0;
  saturdayTransactions:any = [];
  saturdayAmount:number = 0;
  constructor(public local:LocalStorageService, public home:RevenueComponent) { }

  ngOnInit() {
   
    this.transactions = this.local.retrieve('weekrevenue');

    this.daySort();

  }

  daySort(){

    this.transactions.forEach(element => {
      

      switch (element.week_day) {
        case 'Monday':
            this.mondayTransactions.push(element);
            this.mondayAmount = +this.mondayAmount + +element.amount;
            
          break;
        case 'Tuesday':
            this.tuesdayTransactions.push(element);
            this.tuesdayAmount = +this.tuesdayAmount + +element.amount
          break;
        case 'Wednesday':
            this.wednesdayTransactions.push(element);
            this.wednesdayAmount = +this.wednesdayAmount + +element.amount
          break;
        case 'Thursday':
            this.thursdayTransactions.push(element);
            this.thursdayTransactions = +this.thursdayAmount + +element.amount
          break;
        case 'Friday':
            this.fridayTransactions.push(element);
            this.fridayAmount = +this.fridayAmount + +element.amount
          break;
        case 'Saturday':
            this.saturdayTransactions.push(element);
            this.saturdayAmount = +this.saturdayAmount + +element.amount;
          break;
        case 'Sunday':
            this.sundayTransactions.push(element);
            this.sundayAmount = +this.sundayAmount + +element.amount
          break;
      
        default:
          break;
      }
      
    });


   

    
  }

  drillDown(scenario:string){
  
    switch (scenario) {

      case 'monday':
        this.local.store('dayRevenue', this.mondayTransactions);
        this.local.store('dayAmount', this.mondayAmount);
        this.local.store('day','Monday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'tuesday':
        this.local.store('dayRevenue', this.tuesdayTransactions);
        this.local.store('dayAmount', this.tuesdayAmount);
        this.local.store('day','Tuesday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'wednesday':
        this.local.store('dayRevenue', this.wednesdayTransactions);
        this.local.store('dayAmount', this.wednesdayAmount);
        this.local.store('day','Wednesday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'thursday':
        this.local.store('dayRevenue', this.thursdayTransactions);
        this.local.store('dayAmount', this.thursdayAmount);
        this.local.store('day','Thursday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'friday':
        this.local.store('dayRevenue', this.fridayTransactions);
        this.local.store('dayAmount', this.fridayAmount);
        this.local.store('day','Friday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'saturday':
        this.local.store('dayRevenue', this.saturdayTransactions);
        this.local.store('dayAmount', this.saturdayAmount);
        this.local.store('day','Saturday');
        this.home.week = false;
        this.home.day = true;
        break;
      case 'sunday':
        this.local.store('dayRevenue', this.sundayTransactions);
        this.local.store('dayAmount', this.sundayAmount);
        this.local.store('day','Sunday');
        this.home.week = false;
        this.home.day = true;
        break;

     
      default:
        break;
    }
  }

  reset(){
    this.home.reset();
  }

}

