import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { LoginService } from './login.sevice';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private _urlApi = environment.url;
    public totalCart = new BehaviorSubject<any>('0');
    dataCart = this.totalCart.asObservable();

    constructor(
        public http: HttpClient,
        private _authHelper: AuthHelper,
    ) { }

    updatedDataTotalCart(data: any){
        this.totalCart.next(data);
      }
    updateProduct(url:string, body:any): Observable<string> {
        let token = this._authHelper.getToken();
        return this.http.put<any>(`${this._urlApi}${url}/${token.id}`, body)
    }
    deleteProduct(bookId:string): Observable<string> {
        let token = this._authHelper.getToken();
        return this.http.delete<any>(`${this._urlApi}cart/${token.id}/${bookId}`);
    }
    getAllProducts (url: string): Observable<string> {
        let token = this._authHelper.getToken();
        return this.http.get<any>(`${this._urlApi}${url}/${token.id}`)
    }
    onPay() {

    }
}