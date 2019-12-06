import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailsService } from '../../shared/services/details.service';
import { LoginService } from '../../shared/services/login.sevice';
import { MainService } from '../../shared/services/main.service';
import { AuthHelper } from 'src/app/shared/helpers/auth.helper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AboutBookComponent implements OnInit {
  public book:any = {}
  constructor(
    private _authHelper: AuthHelper,
    private activatedRoute: ActivatedRoute,
    private detailsService: DetailsService,
  ) { }

  addToCart(event:any) {
    let token = this._authHelper.getToken();
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
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.detailsService.getBook(`books/${params.id}`).subscribe((data:any)=>{
        this.book = data.data
      })
    });
  }

}
