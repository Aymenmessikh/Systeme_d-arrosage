import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-systeme',
  templateUrl: './delete-systeme.component.html',
  styleUrls: ['./delete-systeme.component.css']
})
export class DeleteSystemeComponent {
  constructor(public dialogRef: MatDialogRef<DeleteSystemeComponent>) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
