import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.sevice';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
   books = [];

  constructor(
    private _mainService: MainService,
    private _loginService: LoginService,
    private _authHelper: AuthHelper,
  ) { }

  addProduct(event:any) {
    let index = this.books.findIndex((i:any) => i._id == event.currentTarget.id);
    let token = this._authHelper.getToken();
    let product = {
      userId: token.id,
      bookId: this.books[index]._id,
      quantity: 1
    }
    this._mainService.addProductToCart(product).subscribe(data=> {
      if(data.success){
        this._loginService.getCartLength('cart/length');
      }
    })
  }

  ngOnInit() {
    this._loginService.isLoginPage(false);
    this._loginService.getCartLength('cart/length');
    this._mainService.onLoadSpiner(true);
    this._mainService.getAllBooks('books').subscribe((data:any)=>{
      this._mainService.onLoadSpiner(false);
      this.books = data.data;
    }, error => {
      this._mainService.onLoadSpiner(false);
    })
  }

}
