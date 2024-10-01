import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistreRequest} from "../../Modeles/RegistreRequest";
import {AuthService} from "../../Services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-jardinier',
  templateUrl: './ajouter-jardinier.component.html',
  styleUrls: ['./ajouter-jardinier.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AjouterJardinierComponent {
  hide = true;
  jardinierRequest!:RegistreRequest;
  registreForm:FormGroup | any;
  constructor(private service:AuthService,private toastr: ToastrService,
              private dialogRef: MatDialogRef<AjouterJardinierComponent>,private router:Router) {
    this.registreForm=new FormGroup({
      nom:new FormControl('',[Validators.required]),
      prenom:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      adresse:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmePassword:new FormControl('',[Validators.required,Validators.minLength(8)])
    }),
      this.jardinierRequest={
        adresse: "",
        adresseMail: "",
        motePasse: "",
        prenom: "",
        role: "",
        nom:''
      }
  }
public createJardinier(){
    if (this.registreForm.valid){
      if (this.registreForm.get("password").value==this.registreForm.get('confirmePassword').value)
      {
        this.jardinierRequest.nom = this.registreForm.get("nom").value;
        this.jardinierRequest.prenom = this.registreForm.get("prenom").value;
        this.jardinierRequest.adresse = this.registreForm.get("adresse").value;
        this.jardinierRequest.adresseMail = this.registreForm.get("email").value;
        this.jardinierRequest.motePasse = this.registreForm.get("password").value;
        this.jardinierRequest.role = 'user';
        this.service.registre(this.jardinierRequest).subscribe(response=>{
          this.dialogRef.close(true);
        },error => {
          this.toastr.error("Faild")
        })
      }else
        this.toastr.error("Veuillez entrer le même mot de passe, s'il vous plaît.");
    }else this.toastr.error("Faild.");

}
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
