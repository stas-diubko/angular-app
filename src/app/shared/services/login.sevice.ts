import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoginData } from 'src/app/shared/models/login-model'
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlApi = environment.url;
  private loginData = new Subject<LoginData>();
  register$ = this.loginData;  

  private token = new Subject<any>();
  
  token$ = this.token.asObservable();

  public isLogin = new Subject<boolean>();

  isLogin$ = this.isLogin.asObservable();

  public isCartLength = new BehaviorSubject<any>(false);
  isCartLength$ = this.isCartLength.asObservable();

  public avatar = new Subject<any>();
  avatar$ = this.avatar.asObservable();

  public onLoginPage = new BehaviorSubject<any>(false);
  onLoginPage$ = this.avatar.asObservable();

  constructor(private http: HttpClient) { }

  isLoginPage(data) {
    this.onLoginPage.next(data)
  }

  getAvatar(url: string){
    return this.http.get<any>(`${this.urlApi}${url}`).subscribe((data)=>{
      this.avatar.next(data.data)
    })
  } 

  public isAuthenticated(): any{
    const token = localStorage.getItem('token');
    if (!token) {
        return false
    }
    return true
  }

  getToken () {
    let token = localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token);
      this.token.next(decoded);
      this.isLogin.next(true)
      return decoded;
    } else {
      this.isLogin.next(false)
    }
  }

  setloginState(loginData: LoginData){
    this.loginData.next(loginData)
  } 
  
  post(url: string, auth): Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, auth)
  }

  getCartLength(url: string){
    let token = this.getToken()
    return this.http.get<any>(`${this.urlApi}${url}/${token.id}`).subscribe((data)=>{
      this.isCartLength.next(data.data)
    })

  }

  resetPassword(email: string){
    let body = {
      email: email
    }
    return this.http.put<any>(`${this.urlApi}login/reset-password`, body);
  }

  onResetPassword(data:object, id:string) {
    return this.http.put<any>(`${this.urlApi}login/reset-user-password/${id}`, data)
  }
}