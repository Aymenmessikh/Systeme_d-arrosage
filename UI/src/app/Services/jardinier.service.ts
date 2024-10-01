import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {Observable} from "rxjs";
import {JardinerResponse} from "../Modeles/JardinerResponse";
import {RegistreRequest} from "../Modeles/RegistreRequest";
import {ChangePassword} from "../Modeles/changePassword";

@Injectable({
  providedIn: 'root'
})
export class JardinierService {
  private  apiServerUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  public getAllJardiniers(): Observable<JardinerResponse[]>{
    return this.http.get<JardinerResponse[]>(`${this.apiServerUrl}/jardenier/list`)
  }
  public getJardinierById(idJardinier:number): Observable<JardinerResponse>{
    return this.http.get<JardinerResponse>(`${this.apiServerUrl}/jardenier/${idJardinier}`)
  }
  public updateJardinier(idJardinier:number,jardinier:RegistreRequest): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/jardenier/${idJardinier}`,jardinier)
  }
  public changePassword(idJardinier:number,password:ChangePassword): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/jardenier/password/${idJardinier}`,password)
  }
  public deleteJardinier(idJardinier:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/jardenier/${idJardinier}`)
  }
}
