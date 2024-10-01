import {Component, inject, OnInit} from '@angular/core';
import {SystemeResponse} from "../../Modeles/SystemeResponse";
import {MatDialog} from "@angular/material/dialog";
import {SystemeService} from "../../Services/systeme.service";
import {AjouterSystemeComponent} from "../../popup/ajouter-systeme/ajouter-systeme.component";
import {FormGroup} from "@angular/forms";
import {SystemeRequest} from "../../Modeles/SystemeRequest";
import {DeleteSystemeComponent} from "../../popup/delete-systeme/delete-systeme.component";
import {UpdateSystemeComponent} from "../../popup/update-systeme/update-systeme.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mes-systemes',
  templateUrl: './mes-systemes.component.html',
  styleUrls: ['./mes-systemes.component.css']
})
export class MesSystemesComponent implements OnInit{
  systemes!: SystemeResponse[];
  id:any
  updateForm: FormGroup | any;
  modifierSystem!: SystemeRequest;
  systeme!: SystemeResponse;


  constructor(private service: SystemeService, private dialog: MatDialog,private route:Router) {
    this.modifierSystem = {
      currentTime: new Date(), humidity: "", temperature: "",
      adresse: "",
      jardinierId: 0,
      nom: ""
    }
  }
  getSystemesByUser(): void {
    this.service.getSystemeByJardinier(this.id).subscribe(
      response => {
        console.log(this.id)
        console.log(response)
        this.systemes = response;
      },
      error => console.log(error)
    );
  }




  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterSystemeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getSystemesByUser();
      }
    });
  }


  ngOnInit(): void {
    this.id=localStorage.getItem("id")
    this.getSystemesByUser();
  }
  public sendId(id: number) {
    this.route.navigate(['/menu/systeme', id]);
  }
}
