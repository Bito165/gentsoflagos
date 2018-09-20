import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";

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
  @ViewChild('myChart3') myChart3: ElementRef;
  chart3: any;
  @ViewChild('myChart4') myChart4: ElementRef;
  chart4: any;

  constructor() { }

  ngOnInit() {
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
          data: [10, 2, 20, 10, 2, 20, 10, 2, 20, 10, 2, 20],
          borderColor: ['#00a65a'],
        }, {
            data: [5, 10, 3, 5, 10, 3, 5, 10, 3, 5, 10, 3],
          borderColor: ['#dd4b39'],
        }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    });


    this.chart4 = new Chart(this.myChart4.nativeElement, {

      type: 'line',
      data: {
        datasets: [{
          data: [10, 2, 20],
          borderColor: ['#00a65a'],
        }, {
          data: [5, 10, 3],
          borderColor: ['#dd4b39'],
        }
        ],
        labels: ['In Total', 'This Month', 'This Week']
      }
      
    });
  }

}
