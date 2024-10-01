import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {RegistreRequest} from "../Modeles/RegistreRequest";
import {Observable} from "rxjs";
import {AuthenticationRequest} from "../Modeles/AuthenticationRequest";
import {AuthenticationResponse} from "../Modeles/AuthenticationResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  apiServerUrl="http://localhost:8084";
  constructor(private http:HttpClient) { }

  public registre(registre:RegistreRequest): Observable<RegistreRequest>{
      return this.http.post<RegistreRequest>(`${this.apiServerUrl}/auth/register`,registre);
  }
  public login(loginRequest:AuthenticationRequest){
     return this.http.post<AuthenticationResponse>(`${this.apiServerUrl}/auth/authenticate`,loginRequest)
  }
  public lougout(){
    localStorage.clear();
  }
  GetToken(){
    return localStorage.getItem('token');
  }
  public isLogin(){
    return localStorage.getItem("token")!=null;
  }
  public isAdmin(){
    return localStorage.getItem("role")==="admin";
  }

}
