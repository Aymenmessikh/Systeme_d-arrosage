import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../Services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(private Service: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.Service.isAdmin()) {
      return true;
    } else {
      return false;
    }
  }
}
