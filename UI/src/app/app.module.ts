import {CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { InterceptorService } from "./Services/iterceptor";
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MenuComponent } from './pages/menu/menu.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSliderModule } from "@angular/material/slider";
import { MatBadgeModule } from "@angular/material/badge";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from './pages/profile/profile.component';
import { JardiniersComponent } from './pages/jardiniers/jardiniers.component';
import { SystemesComponent } from './pages/systemes/systemes.component';
import { MesSystemesComponent } from './pages/mes-systemes/mes-systemes.component';
import { SystemeComponent } from './pages/systeme/systeme.component';
import { AjouterJardinierComponent } from './popup/ajouter-jardinier/ajouter-jardinier.component';
import { provideToastr, ToastrModule } from "ngx-toastr";
import { SuprimmerComponent } from './popup/suprimmer/suprimmer.component';
import { UpdateJardinierComponent } from './popup/update-jardinier/update-jardinier.component';
import { EditProfileComponent } from './popup/edit-profile/edit-profile.component';
import { AjouterSystemeComponent } from './popup/ajouter-systeme/ajouter-systeme.component';
import { UpdateSystemeComponent } from './popup/update-systeme/update-systeme.component';
import { DeleteSystemeComponent } from './popup/delete-systeme/delete-systeme.component';
import {CommonModule} from "@angular/common";
import { SystemesByJardinierComponent } from './pages/systemes-by-jardinier/systemes-by-jardinier.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {authGuard} from "./guard/auth.guard";
import {roleGuard} from "./guard/role.guard";
import { ChangePasswordComponent } from './popup/change-password/change-password.component';
import { CourbesComponent } from './pages/courbes/courbes.component';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: 'menu', component: MenuComponent,canActivate:[authGuard], children: [
      { path: 'home', component: HomeComponent ,canActivate:[authGuard]},
      { path: '', component: HomeComponent,canActivate:[authGuard] },
      { path: 'profile', component: ProfileComponent ,canActivate:[authGuard]},
      { path: 'jardiniers', component: JardiniersComponent ,canActivate:[authGuard,roleGuard]},
      { path: 'systemes', component: SystemesComponent ,canActivate:[authGuard,roleGuard]},
      { path: 'mes-systemes', component: MesSystemesComponent ,canActivate:[authGuard]},
      { path: 'systeme/:id', component: SystemeComponent ,canActivate:[authGuard]},
      { path: 'courbe', component:CourbesComponent},
      { path: 'systemebyJardinier/:id', component: SystemesByJardinierComponent ,canActivate:[authGuard,roleGuard]},
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    JardiniersComponent,
    SystemesComponent,
    MesSystemesComponent,
    SystemeComponent,
    AjouterJardinierComponent,
    SuprimmerComponent,
    UpdateJardinierComponent,
    EditProfileComponent,
    AjouterSystemeComponent,
    UpdateSystemeComponent,
    DeleteSystemeComponent,
    SystemesByJardinierComponent,
    ChangePasswordComponent,
    CourbesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideToastr(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
