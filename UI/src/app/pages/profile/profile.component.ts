import {Component, inject, OnInit} from '@angular/core';
import {JardinierService} from "../../Services/jardinier.service";
import {JardinerResponse} from "../../Modeles/JardinerResponse";
import {FormGroup} from "@angular/forms";
import {RegistreRequest} from "../../Modeles/RegistreRequest";
import {UpdateJardinierComponent} from "../../popup/update-jardinier/update-jardinier.component";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../../popup/edit-profile/edit-profile.component";
import {ChangePasswordComponent} from "../../popup/change-password/change-password.component";
import {ChangePassword} from "../../Modeles/changePassword";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profile!:JardinerResponse
  jardinierRequest!:RegistreRequest;
  updateForm:FormGroup |any
  jardineir!:JardinerResponse
  idProfile!:any
  readonly dialog = inject(MatDialog) ;
constructor(private service:JardinierService) {
  this.jardinierRequest={
    adresse: "",
    adresseMail: "",
    motePasse: "",
    prenom: "",
    role: "",
    nom:''
  }
}
password!:string
  profileImageUrl = 'assets/img_3.png'; // Update with the path to the profile picture
  editProfile(): void {

  }
 getUserById(){
    this.service.getJardinierById(this.idProfile).subscribe(response=>{
      this.profile=response
    },error => console.log(error))
 }
  ngOnInit(): void {
    this.idProfile=localStorage.getItem("id");
    this.getUserById()
  }
  openUpdateDialog() {
    this.getJardinierById(this.idProfile).subscribe(jardinier => {
      this.jardineir=jardinier
      const dialogRef = this.dialog.open(UpdateJardinierComponent, {
        data: { jardinier:this.jardineir }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.updateForm = result;
          this.UpdateJardinier(this.idProfile);
        }
      });
    });
  }
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.changePassword(this.idProfile,result).subscribe(response=>{
        console.log(result);

        },error => console.log(error))
      } else {
        console.log("Dialog closed without a result");
      }
    });
  }
  public getJardinierById(id: number) {
    return this.service.getJardinierById(id);
  }

  public UpdateJardinier(id:number) {
    this.jardinierRequest.nom = this.updateForm.get("nom").value;
    this.jardinierRequest.prenom = this.updateForm.get("prenom").value;
    this.jardinierRequest.adresse = this.updateForm.get("adresse").value;
    this.jardinierRequest.adresseMail = this.updateForm.get("email").value;
    this.jardinierRequest.role = this.jardineir.role;
    console.log(this.jardinierRequest)
    this.service.updateJardinier(id,this.jardinierRequest).subscribe(response=>{
      this.getUserById()
    },error => {
      console.log(error)
    })
  }

}
