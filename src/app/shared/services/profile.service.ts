import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { LoginService } from './login.sevice';
import { MainService } from './main.service';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
private urlApi = environment.url;

    constructor(
        private http: HttpClient,
        public mainService: MainService,
        private _authHelper: AuthHelper,

    ) { }

  changeUserData(data:Object) {
    let token = localStorage.getItem('token');
    const decoded = jwt_decode(token) as any;
    
    return this.http.put<any>(`${this.urlApi}users/avatar/${decoded.id}`, data).subscribe((data)=>{
        if(data.success){
          this.mainService.openSnackBar('Data changed', null);
            localStorage.removeItem('token');
            localStorage.setItem('token', data.data);
            this._authHelper.getToken();
        }
      })
  }
  
  changePassword(data:Object) {
      let token = localStorage.getItem('token');
      const decoded = jwt_decode(token) as any;
      return this.http.put<any>(`${this.urlApi}users/password/${decoded.id}`, data).subscribe((data)=>{
          if(data.success){
            this.mainService.openSnackBar('Password changed', null);
          } else {
            this.mainService.openSnackBar(data.data, null);
          }
      })
  }
}