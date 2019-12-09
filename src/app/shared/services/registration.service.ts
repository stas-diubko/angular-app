import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export default class RegistrationService {
  providedIn: 'root'
  private urlApi = environment.url;
  constructor(private _http : HttpClient) { }

  post(url: string, user):Observable<any>{
    return this._http.post(`${this.urlApi}${url}`, user)
  }
}
