import {Component, Inject} from '@angular/core';
import {RegistreRequest} from "../../Modeles/RegistreRequest";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {JardinierService} from "../../Services/jardinier.service";
import {JardinerResponse} from "../../Modeles/JardinerResponse";

@Component({
  selector: 'app-update-jardinier',
  templateUrl: './update-jardinier.component.html',
  styleUrls: ['./update-jardinier.component.css']
})
export class UpdateJardinierComponent {
  hide = true;
  updateForm:FormGroup | any;
  constructor(private service:JardinierService,private toastr: ToastrService,
              private dialogRef: MatDialogRef<UpdateJardinierComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { jardinier:JardinerResponse }) {
    this.updateForm=new FormGroup({
      nom:new FormControl(this.data.jardinier.nom,[Validators.required]),
      prenom:new FormControl(this.data.jardinier.prenom,[Validators.required]),
      email:new FormControl(this.data.jardinier.adresseMail,[Validators.required,Validators.email]),
      adresse:new FormControl(this.data.jardinier.adresse,[Validators.required]),
    })
  }
  onYesClick(): void {
    this.dialogRef.close(this.updateForm);
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
