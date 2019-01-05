import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart} from "chart.js";
import * as moment from 'moment';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-p-l',
  templateUrl: './p-l.component.html',
  styleUrls: ['./p-l.component.css']
})
export class PLComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef;
  chart: any;
  @ViewChild('myChart2') myChart2: ElementRef;
  chart2: any;
  response:any;
  yearExpenses:any;
  yearRevenue:any;
  yearExpenseAmount:number = 0;
  yearRevenueAmount:number = 0;
  position:any;
  janExpenseAmount:number = 0;
  janRevenueAmount:number = 0;
  janposition:any;
  febExpenseAmount:number = 0;
  febRevenueAmount:number = 0;
  febposition:any;
  marExpenseAmount:number = 0;
  marRevenueAmount:number = 0;
  marposition:any;
  aprExpenseAmount:number = 0;
  aprRevenueAmount:number = 0;
  aprposition:any;
  mayExpenseAmount:number = 0;
  mayRevenueAmount:number = 0;
  mayposition:any;
  juneExpenseAmount:number = 0;
  juneRevenueAmount:number = 0;
  juneposition:any;
  julyExpenseAmount:number = 0;
  julyRevenueAmount:number = 0;
  julyposition:any;
  augExpenseAmount:number = 0;
  augRevenueAmount:number = 0;
  augposition:any;
  septExpenseAmount:number = 0;
  septRevenueAmount:number = 0;
  septposition:any;
  octExpenseAmount:number = 0;
  octRevenueAmount:number = 0;
  octposition:any;
  novExpenseAmount:number = 0;
  novRevenueAmount:number = 0;
  novposition:any;
  decExpenseAmount:number = 0;
  decRevenueAmount:number = 0;
  decposition:any;
  positionColor:any;

  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {
    
    this.getData();
  }


  getData(){
    this.webServ.getProfitLossHistory().subscribe(
      res => {
        this.response = res;
        this.yearRevenue = [];
        this.yearExpenses = []; 

        for (let index = 0; index < this.response[0].length; index++) {
          
          if(this.response[0][index].year == moment().year()){
            this.yearRevenue.push(this.response[0][index])
          }

          
        }

        for (let index = 0; index < this.response[1].length; index++) {
          
          if(this.response[1][index].year == moment().year()){
            this.yearExpenses.push(this.response[1][index])
          }

          if(index == this.response[1].length - 1){
            this.getExpense();
            this.getRevenue();
            setTimeout(() => {
              this.getDifference();
            }, 500);
          }
          
        }
      
      }
    )

  }


  getRevenue(){
    this.yearRevenueAmount = 0;
    this.yearRevenue.forEach(element => {
      this.yearRevenueAmount = +this.yearRevenueAmount + +element.amount;
    });

  }


  getExpense(){
    this.yearExpenseAmount = 0;
    this.yearExpenses.forEach(element => {
      this.yearExpenseAmount = +this.yearExpenseAmount + +element.amount;
    });
    
  }

  getDifference(){
   this.position =  +this.yearRevenueAmount - +this.yearExpenseAmount;

   if (this.position > 0) {
     this.positionColor = 'success'
   }else{
     this.positionColor = 'danger';
   }

   this.sortRevenue();
   this.sortExpense();
   this.sortDifferences();
   this.getCharts();
  }


  sortRevenue(){
    this.yearRevenue.forEach(element => {
    
      switch (element.month) {
        case 'January':
            this.janRevenueAmount = +this.janRevenueAmount + +element.amount
          break;
        case 'February':
            this.febRevenueAmount = +this.febRevenueAmount + +element.amount
          break;
        case 'March':
            this.marRevenueAmount = +this.marRevenueAmount + +element.amount
          break;
        case 'April':
            this.aprRevenueAmount = +this.aprRevenueAmount + +element.amount
          break;
        case 'May':
            this.mayRevenueAmount = +this.mayRevenueAmount + +element.amount
          break;
        case 'June':
            this.juneRevenueAmount = +this.juneRevenueAmount + +element.amount
          break;
        case 'July':
            this.julyRevenueAmount = +this.julyRevenueAmount + +element.amount
          break;
        case 'August':
          this.augRevenueAmount = +this.augRevenueAmount + +element.amount
          break;
        case 'September':
            this.septRevenueAmount = +this.septRevenueAmount + +element.amount
          break;
        case 'October':
            this.octRevenueAmount = +this.octRevenueAmount + +element.amount
          break;
        case 'November':
            this.novRevenueAmount = +this.novRevenueAmount + +element.amount
          break;
        case 'December':
            this.decRevenueAmount = +this.decRevenueAmount + +element.amount
          break;
        
      
        default:
          break;
      }
  
     });
  }

  sortExpense(){
    this.yearExpenses.forEach(element => {
    
      switch (element.month) {
        case 'January':
            this.janExpenseAmount = +this.janExpenseAmount + +element.amount
          break;
        case 'February':
            this.febExpenseAmount = +this.febExpenseAmount + +element.amount
          break;
        case 'March':
            this.marExpenseAmount = +this.marExpenseAmount + +element.amount
          break;
        case 'April':
            this.aprExpenseAmount = +this.aprExpenseAmount + +element.amount
          break;
        case 'May':
            this.mayExpenseAmount = +this.mayExpenseAmount + +element.amount
          break;
        case 'June':
            this.juneExpenseAmount = +this.juneExpenseAmount + +element.amount
          break;
        case 'July':
            this.julyExpenseAmount = +this.julyExpenseAmount + +element.amount
          break;
        case 'August':
          this.augExpenseAmount = +this.augExpenseAmount + +element.amount
          break;
        case 'September':
            this.septExpenseAmount = +this.septExpenseAmount + +element.amount
          break;
        case 'October':
            this.octExpenseAmount = +this.octExpenseAmount + +element.amount
          break;
        case 'November':
            this.novExpenseAmount = +this.novExpenseAmount + +element.amount
          break;
        case 'December':
            this.decExpenseAmount = +this.decExpenseAmount + +element.amount
          break;
        
      
        default:
          break;
      }
  
     });
  }


  sortDifferences(){
    this.janposition = +this.janRevenueAmount - +this.janExpenseAmount;
    this.febposition = +this.febRevenueAmount - +this.febExpenseAmount;
    this.marposition = +this.marRevenueAmount - +this.marExpenseAmount;
    this.aprposition = +this.aprRevenueAmount - +this.aprExpenseAmount;
    this.mayposition = +this.mayRevenueAmount - +this.mayExpenseAmount;
    this.juneposition = +this.juneRevenueAmount - +this.juneExpenseAmount;
    this.julyposition = +this.julyRevenueAmount - +this.julyExpenseAmount;
    this.augposition = +this.augRevenueAmount - +this.augExpenseAmount;
    this.septposition = +this.septRevenueAmount - +this.septExpenseAmount;
    this.octposition = +this.octRevenueAmount - +this.octExpenseAmount;
    this.novposition = +this.novRevenueAmount - +this.novExpenseAmount;
    this.decposition = +this.decRevenueAmount - +this.decExpenseAmount;
  }


  getCharts(){

    if(this.position > 0){
      var chartColor = '#00a65a';
    }else{
      chartColor = '#dd4b39'
    }

    this.chart = new Chart(this.myChart.nativeElement, {

      type: 'line',
      data: {
        datasets: [{
          data: [10, 2, 20, 45],
          labels: ['Profit'],
          borderColor: ['#00a65a'],
        }, {
            data: [5, 10, 3, 35],
            borderColor: ['#dd4b39'],
            
          }
      ],
        labels: ['Week 1','Week 2','Week 3', 'Week 4']}
    });

    this.chart2 = new Chart(this.myChart2.nativeElement, {

      type: 'line',
      data: {
        datasets: [{
          data: [this.janposition, this.febposition, this.marposition, this.aprposition, this.mayposition, this.juneposition, this.julyposition, this.augposition, this.septposition, this.octposition, this.novposition, this.decposition],
          borderColor: [chartColor]}
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    });
  }

}
