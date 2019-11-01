import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailsService } from '../shared/services/details.service';
import { LoginService } from '../shared/services/login.sevice';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AboutBookComponent implements OnInit {
  public book:any = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private detailsService: DetailsService,
    private loginService: LoginService,
    private mainService: MainService
  ) { }

  addToCart(event:any) {
    let token = this.loginService.getToken();
    let product = {
      userId: token.id,
      bookId: this.book._id,
      title: this.book.title,
      author: this.book.author,
      description: this.book.description,
      price: this.book.price,
      bookImage: this.book.bookImage,
      quantity: 1
    }
    this.mainService.addProductToCart(product).subscribe();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.detailsService.getBook(`books/${params.id}`).subscribe((data:any)=>{
        this.book = data.data
      })
    });
  }

}
