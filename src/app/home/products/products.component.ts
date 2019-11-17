import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { MainService } from '../../shared/services/main.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.sevice';

@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public books = [];

  constructor(
    private mainService: MainService,
    private loginService: LoginService,
    private router: Router

  ) { }

  showDetails (e) {
    // console.log(e.target.id);
    // this.router.navigate(['books', 3]);
    
  }

  addProduct(event:any) {
    let index = this.books.findIndex((i:any) => i._id == event.currentTarget.id);
    let token = this.loginService.getToken();
    let product = {
      userId: token.id,
      bookId: this.books[index]._id,
      quantity: 1
    }

    this.mainService.addProductToCart(product).subscribe(data=> {
      if(data.success){
        this.loginService.getCartLength('cart/length')
      }
    })
  }

  ngOnInit() {
    this.loginService.isLoginPage(false);
    this.loginService.getCartLength('cart/length');
    this.mainService.onLoadSpiner(true);
    this.mainService.getAllBooks('books').subscribe((data:any)=>{
      this.mainService.onLoadSpiner(false);
      this.books = data.data;
    }, error => {
      this.mainService.onLoadSpiner(false);
    })
  }

}
