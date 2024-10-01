import {Component, OnInit, ViewChild} from '@angular/core';
import {SystemeResponse} from "../../Modeles/SystemeResponse";
import {UpdateSystemeComponent} from "../../popup/update-systeme/update-systeme.component";
import {FormGroup} from "@angular/forms";
import {SystemeRequest} from "../../Modeles/SystemeRequest";
import {SystemeService} from "../../Services/systeme.service";
import {MatDialog} from "@angular/material/dialog";
import {Zone} from "../../Modeles/Zone";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteSystemeComponent} from "../../popup/delete-systeme/delete-systeme.component";
import {Location} from "@angular/common";
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { ZoneDataDto } from 'src/app/Modeles/ZoneDataDto';
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
  selector: 'app-systeme',
  templateUrl: './systeme.component.html',
  styleUrls: ['./systeme.component.css']
})
export class SystemeComponent implements OnInit{
  systeme!:SystemeResponse;
  updateForm:FormGroup | any;
  modifierSystem!:SystemeRequest;
  id!:number
  zones!:Zone[]
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private service: SystemeService, private dialog: MatDialog,private routes:ActivatedRoute,
              private location:Location,private fireStoreService:FireStoreService) {
    this.modifierSystem={
      currentTime: new Date(), humidity: "", temperature: "",
      adresse: "",
      jardinierId: 0,
      nom:""
    }
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
        text: "la température et de l'humidité de Systeme par date",
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
  getSystemeById(){
    this.service.getSystemeById(this.id).subscribe(response=>{
      this.systeme=response
      console.log(response)
    },error => console.log(error))
  }
  getZonesBySysteme(){
    this.service.getZonesForSysteme(this.id).subscribe(response=>{
      this.zones=response
      console.log(this.zones)
    },error => console.log(error))
  }

  ngOnInit(): void {
    this.routes.params.subscribe(params =>{
      this.id=params['id'];
    })
    this.getSystemeById()
    this.getZonesBySysteme()
  }
  onZoneEtatChange(event:any,zone: string) {
    this.service.toggleZoneEnable(this.id, zone).subscribe(
      response => {
        console.log(zone);
      },
      error => {
        console.log('Error updating zone state:', error);
      }
    );
  }
  openUpdateDialog(id: number,idJardinier:number) {
    console.log('idjardoifenr',idJardinier)
    this.getSysteme(id).subscribe(response => {
      this.systeme = response;
      const dialogRef = this.dialog.open(UpdateSystemeComponent, {
        data: { nom: this.systeme.nom, adresse: this.systeme.adresse }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.updateForm = result;
          this.editSysteme(id,idJardinier);
        }
      });
    }, error => console.log(error));
  }

  getSysteme(id: number) {
    return this.service.getSystemeById(id);
  }

  editSysteme(id: number,idjardinier:number): void {
    this.modifierSystem.nom = this.updateForm.get('nom').value;
    this.modifierSystem.adresse = this.updateForm.get('adresse').value;
    this.modifierSystem.currentTime=this.systeme.currentTime;
    this.modifierSystem.humidity=this.systeme.humidity
    this.modifierSystem.temperature=this.systeme.temperature
    this.modifierSystem.jardinierId=idjardinier;
    this.service.updateSysteme(id, this.modifierSystem).subscribe(response => {
      this.getSystemeById()
    }, error => {
      console.log(error)
    })
  }
  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteSystemeComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSysteme(id);
      }
    });
  }

  deleteSysteme(id: number): void {
    this.service.deleteSysteme(id).subscribe(
      () => {
        this.location.back();
      },
      error => console.log(error)
    );
  }
  onToggleChange(event: any, zoneName: string): void {
    this.service.toggleZoneAction(this.id, zoneName).subscribe(() => {
      console.log('Zone action toggled successfully.');
    }, error => {
      console.error('Error toggling zone action:', error);
    });
  }
  zoneName!:string
  data!:ZoneDataDto[]
  onChartClick(zone: string) {
    this.zoneName=""
    if (zone === "Zone1") {
      this.zoneName = "POT1";
    }
    else if (zone === "Zone 2") {
      this.zoneName = "POT2";
    }
    else if (zone === "Zone 3") {
      this.zoneName = "POT3";
    }
    else if (zone === "Zone 4") {
      this.zoneName = "soilMoisture";
    }

        console.log("eeeeeeeeeeeee",this.zoneName)
    this.fireStoreService.getZoneEspData(this.zoneName).subscribe(
      response => {
        console.log('Response:', response); // Check the structure of the response
        this.data = response;

        const post1_value = this.data.map(item => item.pot1_Value);
        const sensorValue = this.data.map(item => item.sensorValue);

        // Assuming the date field is 'date' (lowercase) in the response
        const dates = this.data.map(item => new Date(item.date).toLocaleDateString());

        console.log("Dates:", dates);

        // Update chart options
        this.chartOptions.series = [
          {
            name: "Temperature",
            data: sensorValue
          },
          {
            name: "Humidity",
            data: post1_value
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


}
