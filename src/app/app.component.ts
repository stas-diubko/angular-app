import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { LoginService } from './shared/services/login.sevice';
import * as jwt_decode from "jwt-decode";
import { Subscription } from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from './shared/services/main.service';
import { Router } from '@angular/router';

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
  public isLoginPage:any = false;
  public onSpiner:boolean = false;
  public year:number = null;
  getIsLogin: Subscription;
  dataUser: Subscription;
  cart: Subscription;
  avatar: Subscription;
  loginPage: Subscription;
  spinner: Subscription;

  constructor (
    private loginService: LoginService,
    private mainService: MainService,
    private _snackBar: MatSnackBar,
    public router: Router
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

    this.spinner = this.mainService.onSpiner$.subscribe(data=>{
      this.onSpiner = data;
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

    this.loginService.isLoginPage(false)
    localStorage.removeItem('token');
    this.loginService.getToken();
    this.router.navigate(['home', 'products']);
    

  }

  toLoginPage() {
    this.loginService.isLoginPage(true)

    this.router.navigate(['auth', 'login']);
  }

  toProductsPage() {
    this.loginService.isLoginPage(false)

    this.router.navigate(['home', 'products']);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  
  ngOnInit(){
    let now = new Date();
    this.year = now.getFullYear();
    let token = localStorage.getItem('token');
    const decoded = jwt_decode(token) as any;
    this.loginService.getToken();
    this.loginService.getAvatar(`users/avatar/${decoded.id}`);
  }
}
