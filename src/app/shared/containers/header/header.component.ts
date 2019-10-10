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
  public userImage:string = ''
  // public isLogin:boolean = false;
  isLogin: Subscription;
  dataUser: Subscription;
  // private dataToken: any;
  constructor(private loginService: LoginService) { 
    this.dataUser = this.loginService.token$.subscribe(data => { 
            
      this.email = data.email
    });

    this.isLogin = this.loginService.isLogin.subscribe(data => {
     
    })

   
  }

  // public isLogIn = this.loginService.is$

  
  ngOnInit() {
    let token = localStorage.getItem('token');
      const decoded = jwt_decode(token) as any;
      
    this.loginService.getToken();

    this.loginService.getAvatar(`users/avatar/${decoded.id}`).subscribe((data:any)=>{
      this.userImage = data.data
    })
    
  }

}
