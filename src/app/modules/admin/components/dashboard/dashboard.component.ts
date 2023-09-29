import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public chartOptions: any;
  public chartDountOptions: any;

  constructor() {
    this.chartOptions = {
      series: [{
        name: "Income",
        data: [20, 25, 20, 50, 30, 30, 20, 40, 40],
      },
      {
        name: "Expense",
        data: [25, 30, 40, 20, 35, 30, 30, 25, 30],
      }
      ],
      chart: {
        height: 300,
        type: 'area',
        group: 'social',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false,
        show: false
      },
      stroke: {
        width: [0, 0],
        colors: ['#6a49f2', '#FF6A59'],
        curve: 'straight'
      },
      legend: {
        show: true,
        tooltipHoverFormatter: function (val: any, opts: any) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        },
        position: 'top',
        fill: ['#6a49f2', '#FF6A59']
      },

      xaxis: {
        categories: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
        labels: {
          style: {
            colors: '#3E4954',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 100,

          },
        },
        axisBorder: {
          show: false
        },
        axisTicks: {

          show: false,
        },
      },
      yaxis: {
        labels: {
          offsetX: -16,
          minWidth: 40,
          style: {
            colors: '#3E4954',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 100,

          },
        },
        axisTicks: {
          show: false,
          borderType: 'solid',
          color: '#78909C',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
      },

      colors: ['#6a49f2', '#FF3D3D'],
      fill: {
        type: 'solid',
        colors: ['#6a49f2', '#FF3D3D'],
      },
      grid: {
        borderColor: '#f1f1f1',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      },
      responsive: [{
        breakpoint: 575,
        options: {

        }
      }]
    };


    this.chartDountOptions = {
      chart: {
        height: 210,
        type: 'donut'
      },
      series: [45, 10, 80],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 0,
        colors: ['#6a49f2', '#b760ea', '#46D767'],
      },
      legend: {
        show: false,
        position: 'bottom'
      },
      fill: {
        colors: ['#6a49f2', '#b760ea', '#46D767'],
      },
      responsive: [{
        breakpoint: 992,
        options: {
          chart: {
            width: 280
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      labels: ["Bookings", "Confirmed", "Candeled"],
    };
  }
}
