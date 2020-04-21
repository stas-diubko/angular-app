import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginData } from 'src/app/shared/models/login-model'
import { AuthHelper } from '../helpers/auth.helper';
import { ChangedPasswordModel } from '../models/change-password-model';
import { GetCartLengthModel } from '../models/get-cart-length-model';
import { RequestLoginModel } from '../models/request-login-model';
import { ResponseLoginModel } from '../models/login-response-model';
import { GetAvatarModel } from '../models/get-avarar-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlApi = environment.url;
  private loginData = new Subject<LoginData>();
  register$ = this.loginData;

  isCartLength = new BehaviorSubject<boolean>(false);
  isCartLength$ = this.isCartLength.asObservable();

  avatar = new Subject<string>();
  avatar$ = this.avatar.asObservable();

  onLoginPage = new BehaviorSubject<boolean>(false);
  onLoginPage$ = this.onLoginPage.asObservable();

  constructor(
    private http: HttpClient,
    private _authHelper: AuthHelper,
    public router: Router
  ) { }

  isLoginPage(data) {
    this.onLoginPage.next(data)
  }

  getAvatar(url: string) {
    return this.http.get<GetAvatarModel>(`${this.urlApi}${url}`).subscribe((data) => {
      this.avatar.next(data.data)
    })
  }

  setloginState(loginData: LoginData) {
    this.loginData.next(loginData)
  }

  onLogin(url: string, auth: RequestLoginModel): Observable<ResponseLoginModel> {
    return this.http.post<ResponseLoginModel>(`${this.urlApi}${url}`, auth);
  }

  onlogOut(): void {
    this.isLoginPage(false)
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this._authHelper.getToken();
    this.router.navigate(['home', 'products']);
  }

  refreshToken(refreshToken: string): Observable<ResponseLoginModel> {
    let body = {
      refreshToken
    }
    return this.http.post<ResponseLoginModel>(`${this.urlApi}login/refreshToken`, body)
        
  }

  getCartLength(url: string) {
    let token = this._authHelper.getToken();
    if (token) {
      return this.http.get<GetCartLengthModel>(`${this.urlApi}${url}/${token.id}`).subscribe((data) => {
        this.isCartLength.next(data.data)
      })
    }
  }

  resetPassword(email: string): Observable<ChangedPasswordModel> {
    let body = {
      email: email
    }
    return this.http.put<ChangedPasswordModel>(`${this.urlApi}login/reset-password`, body);
  }

  onResetPassword(data: object, id: string): Observable<ChangedPasswordModel> {
    return this.http.put<ChangedPasswordModel>(`${this.urlApi}login/reset-user-password/${id}`, data)
  }
}