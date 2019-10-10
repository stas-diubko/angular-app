import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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

  private token = new Subject<any>() ;
  
  token$ = this.token.asObservable();

  public isLogin = new Subject<boolean>();

  isLogin$ = this.isLogin.asObservable();

  constructor(private http: HttpClient) { }

  getAvatar(url: string): Observable<string> {
    return this.http.get<any>(`${this.urlApi}${url}`)
  } 

  getToken () {
    let token = localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token);
      this.token.next(decoded);
      this.isLogin.next(true)
    } 
  }

 

  setloginState(loginData: LoginData){
    this.loginData.next(loginData)
  } 
  
  post(url: string, auth): Observable<any>{
    return this.http.post(`${this.urlApi}${url}`, auth)
  }
  
}