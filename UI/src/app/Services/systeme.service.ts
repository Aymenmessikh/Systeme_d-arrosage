import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {SystemeRequest} from "../Modeles/SystemeRequest";
import {Observable} from "rxjs";
import {JardinerResponse} from "../Modeles/JardinerResponse";
import {SystemeResponse} from "../Modeles/SystemeResponse";
import {Zone} from "../Modeles/Zone";
import {RegistreRequest} from "../Modeles/RegistreRequest";

@Injectable({
  providedIn: 'root'
})
export class SystemeService {
  private  apiServerUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  public ajouteSysteme(systemeRequest:SystemeRequest,id:number): Observable<string> {
    return this.http.post<string>(`${this.apiServerUrl}/systeme/${id}`,systemeRequest)
  }
  public getAllSysteme(): Observable<SystemeResponse[]>{
    return this.http.get<SystemeResponse[]>(`${this.apiServerUrl}/systeme/all`)
  }
  public getSystemeById(id:number): Observable<SystemeResponse>{
    return this.http.get<SystemeResponse>(`${this.apiServerUrl}/systeme/${id}`)
  }
  public getSystemeByJardinier(id:number): Observable<SystemeResponse[]>{
    return this.http.get<SystemeResponse[]>(`${this.apiServerUrl}/systeme/jardinier/${id}`)
  }
  public getZonesForSysteme(id:number): Observable<Zone[]>{
    return this.http.get<Zone[]>(`${this.apiServerUrl}/systeme/zones/${id}`)
  }
  public updateSysteme(id:number,systemeRequest:SystemeRequest): Observable<SystemeResponse>{
    return this.http.put<SystemeResponse>(`${this.apiServerUrl}/systeme/${id}`,systemeRequest)
  }
  public deleteSysteme(idSysteme:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/systeme/${idSysteme}`)
  }
  public toggleZoneEnable(idSysteme:number,zoneName:string): Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/systeme/zones/etat/${idSysteme}/${zoneName}`,zoneName);
  }
  public toggleZoneAction(idSysteme:number,zoneName:string): Observable<void>{
    return this.http.post<void>(`${this.apiServerUrl}/systeme/zones/action/${idSysteme}/${zoneName}`,zoneName)
  }
}
