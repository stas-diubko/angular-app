//Vendors
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.sevice';

@Injectable({
    providedIn: 'root'
})

export class AuthHelper {
    public isLogin = new Subject<boolean>();
    isLogin$ = this.isLogin.asObservable();
  
    private _token = new Subject<any>();
    token$ = this._token.asObservable();

    constructor(
      // private loginService: LoginService,
      public router: Router
    ){

    }

    getToken () {
        let token = localStorage.getItem('token')
        if (token) {
          const decoded = jwt_decode(token);
          this._token.next(decoded);
          this.isLogin.next(true);
          return decoded;
        } else {
          this.isLogin.next(false);
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token;
    }

    setLoginData(data:any): void {
      localStorage.setItem('token', `${data.token}`);
      localStorage.setItem('refreshToken', `${data.refreshToken}`);
    }
}