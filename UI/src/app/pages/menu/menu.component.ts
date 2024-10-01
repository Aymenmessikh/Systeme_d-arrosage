import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AuthService} from "../../Services/auth.service";
import {JardinierService} from "../../Services/jardinier.service";
import {JardinerResponse} from "../../Modeles/JardinerResponse";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  constructor(private service:AuthService,private jardinierService:JardinierService) {
  }
  role:any
  badgevisible = false;
  id!:any
  currentUser!:JardinerResponse
  badgevisibility() {
    this.badgevisible = true;
  };
  public Lougout(){
    this.service.lougout();
  }
 getCurrentUser(id:number){
    this.jardinierService.getJardinierById(id).subscribe(response=>{
      this.currentUser=response
    },error => console.log(error))
 }
  ngOnInit(): void {
    this.id=localStorage.getItem("id")
    this.getCurrentUser(this.id)
    this.role=localStorage.getItem("role")
  }
}
