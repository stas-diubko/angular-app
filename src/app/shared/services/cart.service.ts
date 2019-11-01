import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { LoginService } from './login.sevice';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private urlApi = environment.url;
    public totalCart = new BehaviorSubject<any>('0');
    dataCart = this.totalCart.asObservable();
    constructor(
        private http: HttpClient,
        private loginService: LoginService,

    ) { }

    updatedDataTotalCart(data: any){
        this.totalCart.next(data);
      }
    updateProduct(url:string, body:any): Observable<string> {
        let token = this.loginService.getToken();
        return this.http.put<any>(`${this.urlApi}${url}/${token.id}`, body)
    }
    deleteProduct(bookId:string): Observable<string> {
        let token = this.loginService.getToken();
        return this.http.delete<any>(`${this.urlApi}cart/${token.id}/${bookId}`);
    }
    getAllProducts (url: string): Observable<string> {
        let token = this.loginService.getToken();
        return this.http.get<any>(`${this.urlApi}${url}/${token.id}`)
    }
}