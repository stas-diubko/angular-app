import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoginData } from 'src/app/shared/models/login-model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlApi = environment.url;
  private loginData = new Subject<LoginData>();
  register$ = this.loginData;  

  private isLogIn = new Subject<any>() ;
  
  logIn$ = this.isLogIn.asObservable();

  constructor(private http: HttpClient) { }
 
  getToken (log) {
    this.isLogIn.next(log);
  }

  setloginState(loginData: LoginData){
    this.loginData.next(loginData)
  } 
  
  post(url: string, auth): Observable<any>{
    // console.log(auth);
    
    return this.http.post(`${this.urlApi}${url}`, auth)
  }
  
}