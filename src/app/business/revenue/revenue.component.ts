import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Chart} from "chart.js";

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
  
  constructor() { }

  ngOnInit() {

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

  }

}
