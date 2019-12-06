import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoginData } from 'src/app/shared/models/login-model'
import * as jwt_decode from "jwt-decode";
import { AuthHelper } from '../helpers/auth.helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlApi = environment.url;
  private loginData = new Subject<LoginData>();
  register$ = this.loginData;

  isCartLength = new BehaviorSubject<boolean>(false);
  isCartLength$ = this.isCartLength.asObservable();

  avatar = new Subject<any>();
  avatar$ = this.avatar.asObservable();

  onLoginPage = new BehaviorSubject<boolean>(false);
  onLoginPage$ = this.onLoginPage.asObservable();

  constructor(
    private http: HttpClient,
    private _authHelper: AuthHelper
  ) { }

  isLoginPage(data) {
    this.onLoginPage.next(data)
  }

  getAvatar(url: string) {
    return this.http.get<any>(`${this.urlApi}${url}`).subscribe((data) => {
      this.avatar.next(data.data)
    })
  }

  setloginState(loginData: LoginData) {
    this.loginData.next(loginData)
  }

  post(url: string, auth): Observable<any> {
    return this.http.post(`${this.urlApi}${url}`, auth)
  }

  getCartLength(url: string) {
    let token = this._authHelper.getToken();
    if (token) {
      return this.http.get<any>(`${this.urlApi}${url}/${token.id}`).subscribe((data) => {
        this.isCartLength.next(data.data)
      })
    }
  }

  resetPassword(email: string) {
    let body = {
      email: email
    }
    return this.http.put<any>(`${this.urlApi}login/reset-password`, body);
  }

  onResetPassword(data: object, id: string) {
    return this.http.put<any>(`${this.urlApi}login/reset-user-password/${id}`, data)
  }
}