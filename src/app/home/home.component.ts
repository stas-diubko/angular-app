import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { MainService } from '../shared/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public books:object = []


  constructor(
    private mainService: MainService,
    private router: Router

  ) { }

  showDetails (e) {
    // console.log(e.target.id);
    // this.router.navigate(['books', 3]);
    
  }
  ngOnInit() {
    this.mainService.getAllBooks('books').subscribe((data:any)=>{
      this.books = data.data
    })
    
  }

}
