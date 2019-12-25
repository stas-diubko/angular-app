import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { AuthHelper } from '../helpers/auth.helper';
import { ChangeUserDataModel } from '../models/change-user-data-model';
import { ChangedPasswordModel } from '../models/change-password-model';
import { RequestChangePasswordModel } from '../models/request-change-password-model';
import { RequestChangeUserDataModel } from '../models/request-change-user-data-model';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
private _urlApi = environment.url;

    constructor(
        private _http: HttpClient,
        public mainService: MainService,
        private _authHelper: AuthHelper,
    ) { }

  changeUserData(data: RequestChangeUserDataModel): Observable<ChangeUserDataModel> {
    let token = this._authHelper.getToken();
    return this._http.put<ChangeUserDataModel>(`${this._urlApi}users/avatar/${token.id}`, data);
  }
  
  changePassword(data: RequestChangePasswordModel): Observable<ChangedPasswordModel> {
      let token = this._authHelper.getToken();
      return this._http.put<ChangedPasswordModel>(`${this._urlApi}users/password/${token.id}`, data);
  }
}