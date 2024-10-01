import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SystemeResponse } from '../../Modeles/SystemeResponse';
import { SystemeService } from '../../Services/systeme.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterSystemeComponent } from '../../popup/ajouter-systeme/ajouter-systeme.component';
import { SuprimmerComponent } from "../../popup/suprimmer/suprimmer.component";
import { DeleteSystemeComponent } from "../../popup/delete-systeme/delete-systeme.component";
import { UpdateJardinierComponent } from "../../popup/update-jardinier/update-jardinier.component";
import { FormGroup } from "@angular/forms";
import { UpdateSystemeComponent } from "../../popup/update-systeme/update-systeme.component";
import { SystemeRequest } from "../../Modeles/SystemeRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-systemes',
  templateUrl: './systemes.component.html',
  styleUrls: ['./systemes.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SystemesComponent implements OnInit {
  systemes: SystemeResponse[] = [];
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

  getAllSystemes(): void {
    this.service.getAllSysteme().subscribe(
      response => {
        this.systemes = response;
      },
      error => console.log(error)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterSystemeComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.getAllSystemes();
      }
    });
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
        this.getAllSystemes();
      },
      error => console.log(error)
    );
  }

  openUpdateDialog(id: number,idJardinier:number) {
    console.log('idjardoifenr',idJardinier)
    this.getSystemeById(id).subscribe(response => {
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

  getSystemeById(id: number) {
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
      this.getAllSystemes()
    }, error => {
      console.log(error)
    })
  }

  ngOnInit(): void {
    this.getAllSystemes();
  }
  public sendId(id: number) {
    this.route.navigate(['/menu/systeme', id]);
  }
}
