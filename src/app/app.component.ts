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
  public isLogin:boolean = false;
  public isLoginPage:any = '';
  getIsLogin: Subscription;
  dataUser: Subscription;
  cart: Subscription;
  avatar: Subscription;
  loginPage: Subscription;

  constructor (
    private loginService: LoginService
  ){
    this.loginPage = this.loginService.onLoginPage$.subscribe(data => {
      this.isLoginPage = data;
    })

    this.dataUser = this.loginService.token$.subscribe(data => {
      this.userName = data.name     
      this.email = data.email
    });
    
    this.getIsLogin = this.loginService.isLogin.subscribe(data => {
     this.isLogin = data;
    })

    this.cart = this.loginService.isCartLength$.subscribe(data=>{
      this.isCartEmpty = data
    })

    this.avatar = this.loginService.avatar$.subscribe(data=>{
      this.userImage = data;
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

  onLogOut() {
    localStorage.removeItem('token');
    this.loginService.getToken();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  
  OnChanges() {

  }

  ngOnInit(){
    let token = localStorage.getItem('token');
    const decoded = jwt_decode(token) as any;
    
    this.loginService.getToken();
    // console.log(decoded);
    
    this.loginService.getAvatar(`users/avatar/${decoded.id}`)

  }
}
