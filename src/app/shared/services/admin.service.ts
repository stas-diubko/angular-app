import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { GetUsersAdmin } from '../models/get-users-admin-model';
import { DeleteUserModel } from '../models/delete-user-model';
import { DeleteProductModel } from '../models/delete-book-model';
import { GetProductsAdmin } from '../models/get-product-admin-model';
import { AddingResponseBookModel } from '../models/adding-response-book-model';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    private _urlApi = environment.url;

    public users = new Subject<any>();
    users$ = this.users.asObservable();

    editingProduct = new BehaviorSubject<any>({});
    editingProduct$ =  this.editingProduct.asObservable();

    constructor(
        private http: HttpClient,
        public mainService: MainService
    ) { }

    setSelectedProduct(data) : void {
        this.editingProduct.next(data);
    }

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

    addProduct(data): Observable<AddingResponseBookModel> {
        return this.http.post<AddingResponseBookModel>(`${this._urlApi}books`, data);
     }

    updateProduct(data): Observable<DeleteProductModel> {
        return this.http.put<DeleteProductModel>(`${this._urlApi}books/${data._id}`, data);
    }
  
}