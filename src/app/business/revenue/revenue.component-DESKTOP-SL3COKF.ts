import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart} from "chart.js";
<<<<<<< HEAD

=======
import * as moment from 'moment';
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
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
<<<<<<< HEAD
  
=======
  timeFrame:any;
  first:boolean = true;
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
  constructor() { }

  ngOnInit() {

<<<<<<< HEAD
    this.chart = new Chart(this.myChart.nativeElement, {

      type: 'pie',
      data: {
        datasets: [{
          data: [10, 10, 10],
          backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe'],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'In Total',
          'This Month',
          'This Week'
        ]
      }

    });

    this.chart2 = new Chart(this.myChart2.nativeElement, {

      type: 'pie',
      data: {
        datasets: [{
          data: [10, 10, 10, 10, 10, 10, 10],
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

=======
   setTimeout(() => {
     this.chart = new Chart(this.myChart.nativeElement, {

       type: 'pie',
       data: {
         datasets: [{
           data: [10, 10, 10],
           backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe'],
         }],

         // These labels appear in the legend and in the tooltips when hovering different arcs
         labels: [
           'In Total',
           'This Month',
           'This Week'
         ]
       }

     });

     this.chart2 = new Chart(this.myChart2.nativeElement, {

       type: 'pie',
       data: {
         datasets: [{
           data: [10, 10, 10, 10, 10, 10, 10],
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

   }, 500);
  }

  home(){
    this.first = true;
    this.ngOnInit();
  }

  drillDown(scenario:string){
    switch (scenario) {
      case 'today':
          this.timeFrame = "Today";
          this.first = false;
        break;
      case 'week':
          this.timeFrame = "Week";
          this.first = false;
        break;
      case 'month':
          this.timeFrame = moment().format('MMMM');;
          this.first = false;
        break;
      case 'year':
          this.timeFrame = moment().format('YYYY');;
          this.first = false;
        break;
    
      default:
        break;
    }
>>>>>>> 516e31254903eab2f3b4f8660943598d91683a2d
  }

}
