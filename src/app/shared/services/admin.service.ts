import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { MainService } from './main.service';
import { GetUsersAdmin } from '../models/get-users-admin-model';
import { DeleteUserModel } from '../models/delete-user-model';
import { DeleteProductModel } from '../models/delete-book-model';
import { GetProductsAdmin } from '../models/get-product-admin-model';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    private _urlApi = environment.url;

    public users = new Subject<any>();
    users$ = this.users.asObservable();

    constructor(
        private http: HttpClient,
        public mainService: MainService
    ) { }

    getAllUsers(data): Observable<GetUsersAdmin> {
        return this.http.put<GetUsersAdmin>(`${this._urlApi}users`, data);
    }

    deleteUser(userId): Observable<DeleteUserModel> {
        return this.http.delete<DeleteUserModel>(`${this._urlApi}users/${userId}`);
    }

    getProducts(data): Observable<GetProductsAdmin> {
        return this.http.put<GetProductsAdmin>(`${this._urlApi}books`, data);
    }

    deleteProduct(productId): Observable<DeleteProductModel> {
        return this.http.delete<DeleteProductModel>(`${this._urlApi}books/${productId}`);
    }
  
}