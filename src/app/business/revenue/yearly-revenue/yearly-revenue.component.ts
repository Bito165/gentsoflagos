import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "ngx-webstorage";
import { RevenueComponent } from "../revenue.component";

@Component({
  selector: 'app-yearly-revenue',
  templateUrl: './yearly-revenue.component.html',
  styleUrls: ['./yearly-revenue.component.css']
})
export class YearlyRevenueComponent implements OnInit {
  transactions:any;
  
  janRevenueAmount:number = 0;
  janposition:any = [];
  febRevenueAmount:number = 0;
  febposition:any = [];
  marRevenueAmount:number = 0;
  marposition:any = [];
  aprRevenueAmount:number = 0;
  aprposition:any = [];
  mayRevenueAmount:number = 0;
  mayposition:any = [];
  juneRevenueAmount:number = 0;
  juneposition:any = [];
  julyRevenueAmount:number = 0;
  julyposition:any = [];
  augRevenueAmount:number = 0;
  augposition:any = [];
  septRevenueAmount:number = 0;
  septposition:any = [];
  octRevenueAmount:number = 0;
  octposition:any = [];
  novRevenueAmount:number = 0;
  novposition:any = [];
  decRevenueAmount:number = 0;
  decposition:any = [];

  constructor(public local:LocalStorageService, public home:RevenueComponent) { }

  ngOnInit() {
    this.transactions = this.local.retrieve('yearRevenue');
    this.sortRevenue();
  }

  sortRevenue(){
    this.transactions.forEach(element => {
      console.log(element);
      switch (element.month) {
        case 'January':
            this.janposition.push(element);
            this.janRevenueAmount = +this.janRevenueAmount + +element.amount
          break;
        case 'February':
            this.febposition.push(element);
            this.febRevenueAmount = +this.febRevenueAmount + +element.amount
          break;
        case 'March':
            this.marposition.push(element)
            this.marRevenueAmount = +this.marRevenueAmount + +element.amount
          break;
        case 'April':
            this.aprposition.push(element)
            this.aprRevenueAmount = +this.aprRevenueAmount + +element.amount
          break;
        case 'May':
            this.mayposition.push(element)
            this.mayRevenueAmount = +this.mayRevenueAmount + +element.amount
          break;
        case 'June':
            this.juneposition.push(element)
            this.juneRevenueAmount = +this.juneRevenueAmount + +element.amount
          break;
        case 'July':
            this.julyposition.push(element)
            this.julyRevenueAmount = +this.julyRevenueAmount + +element.amount
          break;
        case 'August':
            this.augposition.push(element)
            this.augRevenueAmount = +this.augRevenueAmount + +element.amount
          break;
        case 'September':
            this.septposition.push(element)
            this.septRevenueAmount = +this.septRevenueAmount + +element.amount
          break;
        case 'October':
            this.octposition.push(element)
            this.octRevenueAmount = +this.octRevenueAmount + +element.amount
          break;
        case 'November':
            this.novposition.push(element)
            this.novRevenueAmount = +this.novRevenueAmount + +element.amount
          break;
        case 'December':
            this.decposition.push(element)
            this.decRevenueAmount = +this.decRevenueAmount + +element.amount
          break;
        
      
        default:
          break;
      }
  
     });
  }


  drillDown(scenario:string){
  
    switch (scenario) {

      case 'January':
        this.local.store('monthRevenue', this.janposition);
        this.local.store('month','January');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'February':
        this.local.store('monthRevenue', this.febposition);
        this.local.store('month','February');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'March':
        this.local.store('monthRevenue', this.marposition);
        this.local.store('month','March');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'April':
        this.local.store('monthRevenue', this.aprposition);
        this.local.store('month','April');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'May':
        this.local.store('monthRevenue', this.mayposition);
        this.local.store('month','May');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'June':
        this.local.store('monthRevenue', this.juneposition);
        this.local.store('month','June');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'July':
        this.local.store('monthRevenue', this.julyposition);
        this.local.store('month','July');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'August':
        this.local.store('monthRevenue', this.augposition);
        this.local.store('month','August');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'September':
        this.local.store('monthRevenue', this.septposition);
        this.local.store('month','September');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'October':
        this.local.store('monthRevenue', this.octposition);
        this.local.store('month','October');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'November':
        this.local.store('monthRevenue', this.novposition);
        this.local.store('month','February');
        this.home.year = false;
        this.home.month = true;
        break;
      case 'December':
        this.local.store('monthRevenue', this.decposition);
        this.local.store('month','December');
        this.home.year = false;
        this.home.month = true;
        break;
      

     
      default:
        break;
    }
  }

  reset(){
    this.home.reset();
  }

}
