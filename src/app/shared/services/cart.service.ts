import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { LoginService } from './login.sevice';
import { AuthHelper } from '../helpers/auth.helper';
import { RequestUpdateProductModel } from '../models/request-update-product-model';
import { UpdateProductModel } from '../models/uodate-product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private _urlApi = environment.url;
    public totalCart = new BehaviorSubject<number>(0);
    dataCart = this.totalCart.asObservable();

    constructor(
        public http: HttpClient,
        private _authHelper: AuthHelper,
    ) { }

    updatedDataTotalCart(data: number){
        this.totalCart.next(data);
    }
    updateProduct(url:string, body:RequestUpdateProductModel): Observable<UpdateProductModel> {
        let token = this._authHelper.getToken();
        return this.http.put<UpdateProductModel>(`${this._urlApi}${url}/${token.id}`, body)
    }
    deleteProduct(bookId:string){
        let token = this._authHelper.getToken();
        return this.http.delete(`${this._urlApi}cart/${token.id}/${bookId}`);
    }
    getAllProducts (url: string): Observable<object> {
        let token = this._authHelper.getToken();
        return this.http.get<object>(`${this._urlApi}${url}/${token.id}`)
    }
    onPay() {

    }
}