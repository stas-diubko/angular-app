import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private urlApi = environment.url;
 
  constructor(
    private http: HttpClient
  ) { }

  getAllBooks (url: string): Observable<string> {
    return this.http.get<any>(`${this.urlApi}${url}`)
  }

  addProductToCart (body: any): Observable<any> {
  //  return console.log(body)
    return this.http.post<any>(`${this.urlApi}cart`, body);
  }

  
  
}