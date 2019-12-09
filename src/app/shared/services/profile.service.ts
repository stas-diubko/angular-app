import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { LoginService } from './login.sevice';
import { MainService } from './main.service';
import { AuthHelper } from '../helpers/auth.helper';
import { ChangeUserDataModel } from '../models/change-user-data-model';
import { ChangedPasswordModel } from '../models/change-password-model';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
private urlApi = environment.url;

    constructor(
        private _http: HttpClient,
        public mainService: MainService,
        private _authHelper: AuthHelper,
    ) { }

  changeUserData(data:Object): Observable<ChangeUserDataModel> {
    let token = this._authHelper.getToken();
    return this._http.put<ChangeUserDataModel>(`${this.urlApi}users/avatar/${token.id}`, data);
  }
  
  changePassword(data:Object): Observable<ChangedPasswordModel> {
      let token = this._authHelper.getToken();
      return this._http.put<any>(`${this.urlApi}users/password/${token.id}`, data);
  }
}