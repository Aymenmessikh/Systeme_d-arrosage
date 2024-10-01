import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JardinierService} from "../../Services/jardinier.service";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  hide = true;
  updateForm:FormGroup | any;
  constructor(private service:JardinierService,private toastr: ToastrService,
              private dialogRef: MatDialogRef<EditProfileComponent>,private router:Router) {
    this.updateForm=new FormGroup({
      nom:new FormControl('',[Validators.required]),
      prenom:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      adresse:new FormControl('',[Validators.required]),
    })
  }
  onYesClick(): void {
    this.dialogRef.close(this.updateForm);
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
