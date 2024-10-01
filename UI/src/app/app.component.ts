import { Component } from '@angular/core';
import {AuthService} from "./Services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  constructor(private service:AuthService) {
  }
  isLogin=this.service.isLogin();
}
