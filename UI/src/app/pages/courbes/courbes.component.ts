import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemeDataDto } from 'src/app/Modeles/SystemeDataDto';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-courbes',
  templateUrl: './courbes.component.html',
  styleUrls: ['./courbes.component.css']
})
export class CourbesComponent implements OnInit {
  data!: SystemeDataDto[];

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private dataService: FireStoreService) {
    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: []
        },
        {
          name: "Humidity", // Ajouter la courbe d'humidité
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "la température et  l'humidité de Systeme par date",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit(): void {
    this.dataService.getEspData().subscribe(
      response => {
        this.data = response;

        // Extract temperature and humidity data and dates
        const temperatures = this.data.map(item => item.averageTemperature);
        const humidities = this.data.map(item => item.averageHumidity); // Ajout des valeurs d'humidité
        const dates = this.data.map(item => this.formatDate(item.date)); // Format date if needed

        // Update chart options
        this.chartOptions.series = [
          {
            name: "Temperature",
            data: temperatures
          },
          {
            name: "Humidity", // Ajout de la série pour l'humidité
            data: humidities
          }
        ];
        this.chartOptions.xaxis = {
          categories: dates
        };
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  // Optionally format date if needed
  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString(); // This formats the date to a local date string
  }
}
