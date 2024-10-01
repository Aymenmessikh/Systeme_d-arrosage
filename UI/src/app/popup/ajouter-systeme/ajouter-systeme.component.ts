import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SystemeRequest } from "../../Modeles/SystemeRequest";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SystemeService } from "../../Services/systeme.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-ajouter-systeme',
  templateUrl: './ajouter-systeme.component.html',
  styleUrls: ['./ajouter-systeme.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AjouterSystemeComponent implements OnInit {
  systeme!: SystemeRequest;
  systemeForm: FormGroup | any;
  id: any;

  constructor(private service: SystemeService, private dialogRef: MatDialogRef<AjouterSystemeComponent>) {
    this.systemeForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required)
    });
    this.systeme = {
      currentTime: new Date()
      , humidity: ""
      , temperature: "",
      adresse: "",
      jardinierId: 0,
      nom: ''
    };
  }

  createSysteme() {
    this.systeme.nom = this.systemeForm.get('nom').value;
    this.systeme.adresse = this.systemeForm.get('adresse').value;
    this.service.ajouteSysteme(this.systeme, this.id).subscribe(response => {
      this.dialogRef.close(true);
    }, error => {
      console.log(error);
      this.dialogRef.close(true);
    });
  }

  ngOnInit(): void {
    this.id = localStorage.getItem("id");
  }
}
