import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-suprimmer',
  templateUrl: './suprimmer.component.html',
  styleUrls: ['./suprimmer.component.css']
})
export class SuprimmerComponent {
  constructor(public dialogRef: MatDialogRef<SuprimmerComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
