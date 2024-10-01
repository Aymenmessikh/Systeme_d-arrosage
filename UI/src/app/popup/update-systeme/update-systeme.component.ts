import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-update-systeme',
  templateUrl: './update-systeme.component.html',
  styleUrls: ['./update-systeme.component.css']
})
export class UpdateSystemeComponent implements OnInit {
  systemeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UpdateSystemeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nom: string, adresse: string }
  ) {
    this.systemeForm = new FormGroup({
      nom: new FormControl(data.nom, Validators.required),
      adresse: new FormControl(data.adresse, Validators.required)
    });
  }

  onYesClick(): void {
    if (this.systemeForm.valid) {
      this.dialogRef.close(this.systemeForm);
    }
  }

  ngOnInit(): void {
    // Les valeurs sont déjà assignées dans le constructeur via MAT_DIALOG_DATA
  }
}
