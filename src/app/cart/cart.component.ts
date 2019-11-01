import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products = [];
  public totalCart = 0;
  public checkedAll:boolean = false;
  public countTotalArr = [];
  public isCheck:boolean = true
  constructor(
    private cartService: CartService
  ) { }

  checkValueAll() {
    let cartPrice = 0;
    this.checkedAll = !this.checkedAll;
    if(this.checkedAll) {
      for (let i = 0; i < this.products.length; i++) {
        cartPrice = cartPrice + +this.products[i].price * this.products[i].quantity;
      }
    } else {
      cartPrice = 0
      this.countTotalArr = [];
    }
    this.cartService.updatedDataTotalCart(cartPrice);
    this.cartService.dataCart.subscribe(data => {
      this.totalCart = data;
    })
  }

  checkValue(event: any) {
    let cartPrice = 0;
    if (!this.checkedAll){
      if (this.countTotalArr.indexOf(event.source.id) === -1 && event.source._checked == true) {
        this.countTotalArr.push(event.source.id)
        if (this.countTotalArr.length == this.products.length) {
          this.checkedAll = !this.checkedAll
        }
      } else {
          let index = this.countTotalArr.indexOf(event.source.id);
          this.countTotalArr.splice(index, 1);
        } 
      for (let i = 0; i < this.products.length; i++) {
        for (let g = 0; g < this.countTotalArr.length; g++) {
          if (this.products[i].bookId == this.countTotalArr[g]) {
            cartPrice = cartPrice + +this.products[i].price * this.products[i].quantity
          }
        }
      }
    }
    this.cartService.updatedDataTotalCart(cartPrice);
    this.cartService.dataCart.subscribe(data => {
    this.totalCart = data;
    })
  }

  increaseTotalProduct(event:any) {
    let index = this.products.findIndex((i:any) => i.bookId == event.currentTarget.id);
    this.products[index].quantity++
    let cartData = {
      userId: this.products[index].userId,
      quantity: this.products[index].quantity,
      bookId: this.products[index].bookId
    }
    this.cartService.updateProduct('cart', cartData).subscribe();
    setTimeout(()=>{
      this.cartService.getAllProducts('cart').subscribe()
    }, 200)
    if (this.countTotalArr.length !== 0 && this.checkedAll == false) {
      let data = 0;
        for (let g = 0; g < this.products.length; g++) {
          for (let k = 0; k < this.countTotalArr.length; k++) {
            if (this.products[g].bookId == this.countTotalArr[k]) {
              data = data + +this.products[g].price * this.products[g].quantity
            }
          }
        }
        this.cartService.updatedDataTotalCart(data);
        this.cartService.dataCart.subscribe(data => {
          this.totalCart = data;
        })
    } else if (this.checkedAll == true) {
      let data = 0;
      for (let i = 0; i < this.products.length; i++) {
        data = data + +this.products[i].price * this.products[i].quantity;
      }
      this.cartService.updatedDataTotalCart(data);
      this.cartService.dataCart.subscribe(data => {
        this.totalCart = data;
      })
    }
  }
  
  decreaseTotalProduct(event:any) {
    let index = this.products.findIndex((i:any) => i.bookId == event.currentTarget.id);
    if(this.products[index].quantity == 1) {
      this.products[index].quantity = this.products[index].quantity - 0
    } else {
      this.products[index].quantity--
      let cartData = {
        userId: this.products[index].userId,
        quantity: this.products[index].quantity,
        bookId: this.products[index].bookId
      }
      this.cartService.updateProduct('cart', cartData).subscribe()
      setTimeout(()=>{
        this.cartService.getAllProducts('cart').subscribe()
      }, 200)
      if (this.countTotalArr.length !== 0 && this.checkedAll == false) {
        let data = 0;
          for (let g = 0; g < this.products.length; g++) {
            for (let k = 0; k < this.countTotalArr.length; k++) {
              if (this.products[g].bookId == this.countTotalArr[k]) {
                data = data + +this.products[g].price * this.products[g].quantity
              }
            }
          }
          this.cartService.updatedDataTotalCart(data);
          this.cartService.dataCart.subscribe(data => {
            this.totalCart = data;
          })
      } else if (this.checkedAll == true) {
        let data = 0;
        for (let i = 0; i < this.products.length; i++) {
          data = data + +this.products[i].price * this.products[i].quantity;
        }
        this.cartService.updatedDataTotalCart(data);
        this.cartService.dataCart.subscribe(data => {
          this.totalCart = data;
        })
      }
    }
  }

  onRemove(event:any) {
    this.cartService.deleteProduct(event.currentTarget.id).subscribe()
    setTimeout(()=>this.cartService.getAllProducts('cart').subscribe((data:any)=>{
        this.products = data.data;
        if(this.checkedAll == true){
          let data = 0;
          for (let g = 0; g < this.products.length; g++) {
                data = data + +this.products[g].price * this.products[g].quantity;
          }
          this.cartService.updatedDataTotalCart(data);
          this.cartService.dataCart.subscribe(data => {
            this.totalCart = data;
          })
        } else {
          let data = 0;
          this.countTotalArr = [];
          this.cartService.updatedDataTotalCart(data);
          this.cartService.dataCart.subscribe(data => {
            this.totalCart = data;
          })
        }
    }), 300)
  }

  ngOnInit() {
    this.cartService.getAllProducts('cart').subscribe((data:any)=>{
      this.products = data.data;
    })
  }
}
