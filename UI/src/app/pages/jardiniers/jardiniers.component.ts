
import {Component, OnInit, ViewChild, AfterViewInit, inject, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {AjouterJardinierComponent} from "../../popup/ajouter-jardinier/ajouter-jardinier.component";
import {JardinerResponse} from "../../Modeles/JardinerResponse";
import {JardinierService} from "../../Services/jardinier.service";
import {SuprimmerComponent} from "../../popup/suprimmer/suprimmer.component";
import {UpdateJardinierComponent} from "../../popup/update-jardinier/update-jardinier.component";
import {RegistreRequest} from "../../Modeles/RegistreRequest";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jardiniers',
  templateUrl: './jardiniers.component.html',
  styleUrls: ['./jardiniers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JardiniersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'adresse','adresseMail','#'];
  jardiniers!:JardinerResponse[]
  jardinierRequest!:RegistreRequest;
  updateForm:FormGroup |any
  jardineir!:JardinerResponse
  dataSource = new MatTableDataSource<JardinerResponse>(this.jardiniers);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  readonly dialog = inject(MatDialog) ;
  constructor(private service:JardinierService,private route:Router) {
    this.jardinierRequest={
      adresse: "",
      adresseMail: "",
      motePasse: "",
      prenom: "",
      role: "",
      nom:''
    }
  }
  openDialog() {
    const ajouetJardinier=this.dialog.open(AjouterJardinierComponent);
    ajouetJardinier.afterClosed().subscribe(result => {
      if (result === true) {
        this.getAllJardinier();
      }
    });
  }
  getAllJardinier(){
    this.service.getAllJardiniers().subscribe(response=>{
      this.jardiniers=response
      this.dataSource.data = this.jardiniers;
    },error => {
      console.log(error)
    })
  }
  ngOnInit() {
    this.getAllJardinier()
  }
  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(SuprimmerComponent,{
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteJardinier(id);
      }
    });
  }
  deleteJardinier(id:number){
    this.service.deleteJardinier(id).subscribe(response=> {
      console.log(response)
      this.getAllJardinier()
    },error => {
      console.log(error)
    })
  }

  openUpdateDialog(id: number) {
    this.getJardinierById(id).subscribe(jardinier => {
      this.jardineir=jardinier
      const dialogRef = this.dialog.open(UpdateJardinierComponent, {
        data: { jardinier:this.jardineir }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != null) {
          this.updateForm = result;
          this.UpdateJardinier(id);
        }
      });
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
      this.getAllJardinier()
    },error => {
      console.log(error)
    })
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  public sendId(id: number) {
    this.route.navigate(['/menu/systemebyJardinier', id]);
  }
}
