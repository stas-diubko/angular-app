import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductModel } from '../models/add-product-model';
import { RequestAddProductToCart } from '../models/request-add-product-yo-cart-modek';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private urlApi = environment.url;
  public onSpiner = new Subject<boolean>();
  onSpiner$ = this.onSpiner.asObservable();

  constructor(
    private _http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  onLoadSpiner(data:boolean) {
    this.onSpiner.next(data);
  }

  getAllBooks (url: string): Observable<object> {
    return this._http.get<object>(`${this.urlApi}${url}`);
  }

  addProductToCart (body: RequestAddProductToCart): Observable<AddProductModel> {
    return this._http.post<AddProductModel>(`${this.urlApi}cart`, body);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}