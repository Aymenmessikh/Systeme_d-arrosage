import {Component, OnInit} from '@angular/core';
import {SystemeResponse} from "../../Modeles/SystemeResponse";
import {FormGroup} from "@angular/forms";
import {SystemeRequest} from "../../Modeles/SystemeRequest";
import {SystemeService} from "../../Services/systeme.service";
import {MatDialog} from "@angular/material/dialog";
import {AjouterSystemeComponent} from "../../popup/ajouter-systeme/ajouter-systeme.component";
import {DeleteSystemeComponent} from "../../popup/delete-systeme/delete-systeme.component";
import {UpdateSystemeComponent} from "../../popup/update-systeme/update-systeme.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-systemes-by-jardinier',
  templateUrl: './systemes-by-jardinier.component.html',
  styleUrls: ['./systemes-by-jardinier.component.css']
})
export class SystemesByJardinierComponent implements OnInit{
  systemes!: SystemeResponse[];
  id:any
  systeme!: SystemeResponse;


  constructor(private service: SystemeService,private routes:ActivatedRoute,private route:Router) {
  }
  getSystemesByUser(): void {
    this.service.getSystemeByJardinier(this.id).subscribe(
      response => {
        console.log(this.id)
        console.log(response)
        this.systemes = response;
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.routes.params.subscribe(params =>{
      this.id=params['id'];
    })
    this.getSystemesByUser();
  }
  public sendId(id: number) {
    this.route.navigate(['/menu/systeme', id]);
  }
}
