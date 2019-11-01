import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { LoginService } from './shared/services/login.sevice';
import * as jwt_decode from "jwt-decode";
import { Subscription } from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl:"./app.component.html",
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  public email:string = '';
  public userName:string = '';
  public userImage:string = '';
  public changeModal:boolean = false;
  public isCartEmpty:boolean = false;
  isLogin: Subscription;
  dataUser: Subscription;
 
  constructor (
    private loginService: LoginService
  ){
    this.dataUser = this.loginService.token$.subscribe(data => {
      this.userName = data.name     
      this.email = data.email
    });
    
    this.isLogin = this.loginService.isLogin.subscribe(data => {
     
    })

  }
  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  onChangeUserData() {
    this.changeModal = !this.changeModal
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  
  ngOnInit(){
    let token = localStorage.getItem('token');
    const decoded = jwt_decode(token) as any;
    
    this.loginService.getToken();
    this.loginService.getAvatar(`users/avatar/${decoded.id}`).subscribe((data:any)=>{
      this.userImage = data.data
    })
    
  }
}
