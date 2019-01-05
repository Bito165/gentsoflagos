import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart} from "chart.js";
import * as moment from 'moment';
import { ApiBaseService } from "../../../services/apibase/api-base.service";
import { LocalStorageService } from "ngx-webstorage";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  @ViewChild('myChart') myChart: ElementRef;
  chart: any;
  @ViewChild('myChart2') myChart2: ElementRef;
  chart2: any;
  timeFrame:any;
  first:boolean = true;
  loader:boolean = true;
  response:any;
  yearRevenue:any;
  yearAmount:any;
  monthRevenue:any;
  monthAmount:any;
  weekRevenue:any;
  weekAmount:any;
  dayRevenue:any;
  dayAmount:any;
  mondayCount:number = 0;
  tuesdayCount:number = 0;
  wednesdayCount:number = 0;
  thursdayCount:number = 0;
  fridayCount:number = 0;
  saturdayCount:number = 0;
  sundayCount:number = 0;
  sources:any;
  day:boolean = false;
  week:boolean = false;
  month:boolean = false;
  year:boolean = false;
  items: Array <{source:any, count:any}> = [];
  constructor(public webServ:ApiBaseService, public local:LocalStorageService) { }

  ngOnInit() {
    this.yearRevenue = [];
    this.getData();

    console.log(moment().year());
    console.log(moment().day());
    console.log(moment('12/21/2018').month());
    console.log(moment('12/31/2018').isoWeek());
  }


  getData(){
    this.webServ.getRevenueHistory().subscribe(
      res => {
        console.log(res);
        this.response = res[0];
        this.sources = res[1];
        this.yearAmount = 0;
        this.loader = false;
        for (let index = 0; index < this.response.length; index++) {

          if(this.response[index].year == moment().year()){
            this.yearRevenue.push(this.response[index]);
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
    this.monthRevenue = [];
    this.monthAmount = 0;
    var month = moment().format('MMMM');
    this.yearRevenue.forEach(element => {
      if(element.month == month){
        this.monthRevenue.push(element)
        this.monthAmount = +this.monthAmount + +element.amount;
      }
    });
  }
  
  getWeekData(){
    this.weekRevenue = [];
    this.weekAmount = 0;
    this.yearRevenue.forEach(element => {
      if(moment(element.createddate).isoWeek() == moment().isoWeek()){
        this.weekRevenue.push(element)
        this.weekAmount = +this.weekAmount + +element.amount;
      }
    });
  }
  
  getDayData(){
    this.dayRevenue = [];
    this.dayAmount = 0;
    this.yearRevenue.forEach(element => {
      if(moment(element.createddate).month() == moment().month() && moment(element.createddate).day() == moment().day()){
        this.dayRevenue.push(element)
        this.dayAmount = +this.dayAmount + +element.amount;
      }
    });
    console.log(this.dayAmount, this.dayRevenue);
  }

  daySort(){

    this.yearRevenue.forEach(element => {
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

      this.yearRevenue.forEach(element => {
        
        if(element.source == this.sources[index].source){
          this.items[index].count = +element.amount + +this.items[index].count;
        }
      });
      
      if(index == this.sources.length - 1){
       setTimeout(() => {
        this.getCharts();
       }, 500);
      }

    }

    
  }

  getCharts(){

    var src = [];
      var count = [];

      for (let index = 0; index < this.items.length; index++) {
        src[index] = this.items[index].source;
        count[index] = this.items[index].count;
        console.log(count, src)
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

  reset(){
    this.first = true;
    this.day = false;
    this.week = false;
    this.month = false;
    this.year = false;
    setTimeout(() => {
      this.getCharts();
    }, 500);
  }

  drillDown(scenario:string){
  
    switch (scenario) {
      case 'today':
          this.first = false;
          this.day = true;
          this.local.store('dayRevenue', this.dayRevenue);
          this.local.store('dayAmount', this.dayAmount);
          this.local.store('day', moment().format('dddd'));
        break;
      case 'week':
          this.first = false;
          this.week = true;
          this.local.store('weekRevenue', this.weekRevenue);
          this.local.store('week', moment().isoWeek())
        break;
      case 'month':
          this.first = false;
          this.month = true;
          this.local.store('monthRevenue', this.monthRevenue);
          this.local.store('month', moment().format('MMMM'));
        break;
      case 'year':
          this.first = false;
          this.year = true;
          this.local.store('yearRevenue', this.yearRevenue);
        break;
    
      default:
        break;
    }
  }

}
