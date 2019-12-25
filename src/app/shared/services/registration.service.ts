import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RequestRegisterModel } from '../models/request-register-model';
import { RegisterModel } from '../models/registration-model';

@Injectable()
export default class RegistrationService {
  providedIn: 'root'
  private _urlApi = environment.url;
  constructor(private _http : HttpClient) { }

  onRegister(url: string, user: RequestRegisterModel):Observable<RegisterModel>{
    return this._http.post<RegisterModel>(`${this._urlApi}${url}`, user)
  }
}
