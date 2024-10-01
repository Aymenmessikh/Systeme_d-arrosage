import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SystemeDataDto } from '../Modeles/SystemeDataDto';
import { ZoneDataDto } from '../Modeles/ZoneDataDto';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  private apiUrl = 'http://localhost:8084/api/espdata/all';
  private apiZoneUrl = 'http://localhost:8084/api/espdata/allZone';

  constructor(private http: HttpClient) { }

  getEspData(): Observable<SystemeDataDto[]> {
    return this.http.get<SystemeDataDto[]>(this.apiUrl);
  }
  getZoneEspData(zone:string): Observable<ZoneDataDto[]> {
    return this.http.get<ZoneDataDto[]>(`${this.apiZoneUrl}/${zone}`);
  }
}
