import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { LoginService } from './shared/services/login.sevice';
import * as jwt_decode from "jwt-decode";
import { Subscription } from 'rxjs';
import {MatSidenav} from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from './shared/services/main.service';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';

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
  isAdmin = false;
  getIsLogin: Subscription;
  dataUser: Subscription;
  cart: Subscription;
  avatar: Subscription;
  loginPage: Subscription;
  spinner: Subscription;

  constructor (
    private _authHelper: AuthHelper,
    private loginService: LoginService,
    private mainService: MainService,
    private _snackBar: MatSnackBar,
    public router: Router
  ){

    this.loginPage = this.loginService.onLoginPage$.subscribe(data => {
      this.isLoginPage = data;
    })

    this.dataUser = this._authHelper.token$.subscribe(data => {
      this.userName = data.name     
      this.email = data.email
    });
    
    this.getIsLogin = this._authHelper.isLogin.subscribe(data => {
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

  openNav() {
    let token = this._authHelper.getToken();
    if (token.role === "admin") {
      this.isAdmin = true;
    }
    if (token.role !== "admin") {
      this.isAdmin = false;
    }
  }

  onChangeUserData() {
    this.changeModal = !this.changeModal
  }

  onLogOut() {
    this.loginService.onlogOut();
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
    const decoded = jwt_decode(token);
    this._authHelper.getToken();
    this.loginService.getAvatar(`users/avatar/${decoded.id}`);
  }
}
