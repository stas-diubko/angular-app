import { Component, OnInit, DoCheck } from '@angular/core';
import { LoginService } from './shared/services/login.sevice';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl:"./app.component.html"
})
export class AppComponent implements OnInit {
  private email:string = '';
  private isLogIn:boolean = false;
  constructor (
    private loginService: LoginService,
  ){}
    getDecoded () {
      console.log('test')
      let token = this.loginService.getToken();
      const decoded = jwt_decode(token) as any;
      
      if (token) {
        this.isLogIn = true;
        this.email = decoded.email;
      }
    }
   
  ngOnInit(){
    this.getDecoded()
    
  }
}
