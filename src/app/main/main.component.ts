import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login.sevice';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public number:number = 0;

  constructor(
    private loginService: LoginService,
  ) { }

  increaseNumber () {
    // console.log(this.number);
    
    this.number++
  }

  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token) as any;
     
      this.loginService.getToken(decoded)
    } else {
      this.loginService.getToken('')
    }
    
    
  }

}
