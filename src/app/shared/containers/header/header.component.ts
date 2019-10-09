import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { LoginService } from '../../services/login.sevice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private email:string = '';
  
  dataUser: Subscription;
  // private dataToken: any;
  constructor(private loginService: LoginService) { 
    this.dataUser = this.loginService.logIn$.subscribe(data => { 
      // console.log(data);
      
      // this.dataUser = data; 
      // let token = localStorage.getItem('token');
      // const decoded = jwt_decode(token) as any;
      // console.log(decoded);
      
      this.email = data.email
    });
  }

  public isLogIn = this.loginService.logIn$

  
  ngOnInit() {

    
  }

}
