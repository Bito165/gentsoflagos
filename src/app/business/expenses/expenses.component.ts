import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart} from "chart.js";
import * as moment from 'moment';
import { ApiBaseService } from "../../../services/apibase/api-base.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef;
  chart: any;
  @ViewChild('myChart2') myChart2: ElementRef;
  chart2: any;
  response:any;
  yearexpenses:any;
  yearAmount:any;
  monthexpenses:any;
  monthAmount:any;
  weekexpenses:any;
  weekAmount:any;
  dayexpenses:any;
  dayAmount:any;
  mondayCount:number = 0;
  tuesdayCount:number = 0;
  wednesdayCount:number = 0;
  thursdayCount:number = 0;
  fridayCount:number = 0;
  saturdayCount:number = 0;
  sundayCount:number = 0;
  sources:any;
  items: Array <{source:any, count:any}> = [];
  constructor(public webServ:ApiBaseService) { }

  ngOnInit() {
    this.yearexpenses = [];
    this.getData();

    console.log(moment().year());
    console.log(moment().day());
    console.log(moment('12/21/2018').month());
    console.log(moment('12/31/2018').isoWeek());
  }


  getData(){
    this.webServ.getExpensesHistory().subscribe(
      res => {
        console.log(res);
        this.response = res[0];
        this.sources = res[1];
        this.yearAmount = 0;
        for (let index = 0; index < this.response.length; index++) {

          if(this.response[index].year == moment().year()){
            this.yearexpenses.push(this.response[index]);
            this.yearAmount = +this.yearAmount + +this.response[index].amount;
            if(index == this.response.length - 1){
              this.getMonthData();
              this.getWeekData();
              this.getDayData();
              this.daySort();
            }
          } 
        }
    })
  }

  getMonthData(){
    this.monthexpenses = [];
    this.monthAmount = 0;
    var month = moment().format('MMMM');
    this.yearexpenses.forEach(element => {
      if(element.month == month){
        this.monthexpenses.push(element)
        this.monthAmount = +this.monthAmount + +element.amount;
      }
    });
  }
  
  getWeekData(){
    this.weekexpenses = [];
    this.weekAmount = 0;
    this.yearexpenses.forEach(element => {
      if(moment(element.createddate).isoWeek() == moment().isoWeek()){
        this.weekexpenses.push(element)
        this.weekAmount = +this.weekAmount + +element.amount;
      }
    });
  }
  
  getDayData(){
    this.dayexpenses = [];
    this.dayAmount = 0;
    this.yearexpenses.forEach(element => {
      if(moment(element.createddate).month() == moment().month() && moment(element.createddate).day() == moment().day()){
        this.dayexpenses.push(element)
        this.dayAmount = +this.dayAmount + +element.amount;
      }
    });
    console.log(this.dayAmount, this.dayexpenses);
  }

  daySort(){

    this.yearexpenses.forEach(element => {
      switch (element.week_day) {
        case 'Monday':
            this.mondayCount++;
          break;
        case 'Tuesday':
            this.tuesdayCount++;
          break;
        case 'Wednesday':
            this.wednesdayCount++;
          break;
        case 'Thursday':
            this.thursdayCount++;
          break;
        case 'Friday':
            this.fridayCount++;
          break;
        case 'Saturday':
            this.saturdayCount++;
          break;
        case 'Sunday':
            this.sundayCount++;
          break;
      
        default:
          break;
      }
      
      
    
    });


    for (let index = 0; index < this.sources.length; index++) {
      
      
      this.items.push({source: this.sources[index].source, count: 0})

      this.yearexpenses.forEach(element => {
        
        if(element.source == this.sources[index].source){
          this.items[index].count = +element.amount + +this.items[index].count;
        }
      });
      
      if(index == this.sources.length - 1){
        this.getCharts();
      }

    }

    
  }

  getCharts(){

    var src = [];
      var count = [];

      for (let index = 0; index < this.items.length; index++) {
        src[index] = this.items[index].source;
        count[index] = this.items[index].count;

        if(index == this.items.length - 1){
          this.chart = new Chart(this.myChart.nativeElement, {
 
            type: 'pie',
            data: {
              datasets: [{
                data: count,
                backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe'],
              }],
     
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: src
            }
     
          });
     
          this.chart2 = new Chart(this.myChart2.nativeElement, {
     
            type: 'pie',
            data: {
              datasets: [{
                data: [this.mondayCount, this.tuesdayCount, this.wednesdayCount, this.thursdayCount, this.fridayCount, this.saturdayCount, this.sundayCount],
                backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', 'green', 'blue', 'purple', 'black'],
              }],
     
              // These labels appear in the legend and in the tooltips when hovering different arcs
              labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ]
            }
     
          });
        }
      }
  }
  
}