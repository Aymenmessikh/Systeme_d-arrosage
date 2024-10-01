import { Component } from '@angular/core';
import {AuthService} from "../../Services/auth.service";
import {AuthenticationRequest} from "../../Modeles/AuthenticationRequest";
import {AuthenticationResponse} from "../../Modeles/AuthenticationResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest!:AuthenticationRequest
  loginResponse!:AuthenticationResponse
  hide = true;
  loginForm:FormGroup|any
  failde:boolean=false
  constructor(private service:AuthService,public routs:Router,private toastr:ToastrService) {
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    });
    this.loginRequest={
      adresseMail:'',
      motePasse:''
    }
    localStorage.clear()
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
 public Login(){
   this.loginRequest.adresseMail=this.loginForm.get('email').value;
   this.loginRequest.motePasse=this.loginForm.get('password').value;
    this.service.login(this.loginRequest).subscribe(response=>{
      this.loginResponse=response
      localStorage.setItem("token",this.loginResponse.token)
      localStorage.setItem("id",this.loginResponse.jardinierId)
      localStorage.setItem("role",this.loginResponse.role)
    //  this.toastr.success("Login")
      this.routs.navigate(["menu"])
    },(erros)=>{
      this.failde=true
  //  this.toastr.error("Faild")
   }
    )
 }
}
