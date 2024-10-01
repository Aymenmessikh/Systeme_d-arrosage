import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ChangePassword} from "../../Modeles/changePassword";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  motePasseForm: FormGroup;
  password!:ChangePassword

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) {
    this.motePasseForm = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      newPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
    this.password={
      password:"",
      newPassword:""
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    if (this.motePasseForm.valid && this.motePasseForm.get("newPassword")?.value === this.motePasseForm.get("confirmPassword")?.value) {
      this.password.newPassword = this.motePasseForm.get("newPassword")?.value;
      this.password.password = this.motePasseForm.get("password")?.value;
      this.dialogRef.close(this.password);
    } else {
      console.log("Passwords do not match or form is invalid");
    }
  }

}
